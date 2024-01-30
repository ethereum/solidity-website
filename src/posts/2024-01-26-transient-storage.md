---
layout: post
published: true
title: 'Transient Storage Opcodes in Solidity 0.8.24'
date: '2024-01-26'
author: Solidity Team
category: Explainers
---

[Solidity 0.8.24](https://soliditylang.org/blog/2024/01/26-solidity-0.8.24-release-announcement) supports the opcodes included in the upcoming Cancun hardfork and, in particular, the transient storage opcodes `TSTORE` and `TLOAD` as per [EIP-1153](https://eips.ethereum.org/EIPS/eip-1153).

Transient storage is a long-awaited feature on the EVM level that introduces another data location besides `memory`, `storage`, `calldata` (and return-data and code).
The new data location behaves as a key-value store similar to storage with the main difference being that data in transient storage is not permanent, but is scoped to the current transaction only, after which it will be reset to zero.
Consequently, transient storage is as cheap as warm storage access, with `TSTORE` and `TLOAD` priced at 100 gas.

Users should note that the compiler does not yet allow using `transient` as a data location in high-level Solidity code.
For the time being, data stored in this location can only be accessed using the `TSTORE` and `TLOAD` opcodes in inline assembly.

An expected canonical use case for transient storage is cheaper reentrancy locks, which can be readily implemented with the opcodes as showcased below.
However, given the caveats mentioned in the specification of EIP-1153, utmost care has to be taken for more advanced use cases of transient storage to preserve the composability of your smart contract.
To raise awareness of this issue, for the time being, the compiler will emit a warning on use of `tstore` in assembly.

## Use of Transient Storage for Reentrancy Locks

A reentrancy attack exploits a smart contract vulnerability in which the victim contract has its resources drained by being repeatedly entered before the balance is updated accordingly.
In practice, what happens is that the attacker contract deposits funds into the victim contract and then issues a call to withdraw.
However, the attacker contract does not implement a `receive` function and this causes his ``fallback`` function to be called instead.
Inside ``fallback``, the attacker will again make a withdrawal call to the victim contract, which will cause the process to repeat itself until there are no more funds to withdraw.
This is a known security problem and the source of a variety of bugs in smart contracts.
In order to prevent it from being exploited, it is recommended that all state changes, such as updating an account's balance, be made before calling external contracts.
Another alternative is the use of reentrancy locks/guards.

The following example illustrates a simple reentrancy lock implemented with the help of transient storage:

```solidity
contract Generosity {
    mapping(address => bool) sentGifts;

    modifier nonreentrant {
        assembly {
            if tload(0) { revert(0, 0) }
            tstore(0, 1)
        }
        _;
        // Unlocks the guard, making the pattern composable.
        // After the function exits, it can be called again, even in the same transaction.
        assembly {
            tstore(0, 0)
        }
    }
    function claimGift() nonreentrant public {
        require(address(this).balance >= 1 ether);
        require(!sentGifts[msg.sender]);
        (bool success, ) = msg.sender.call{value: 1 ether}("");
        require(success);

        // In a reentrant function, doing this last would open up the vulnerability
        sentGifts[msg.sender] = true;
    }
}
```

Thanks to the `nonreentrant` guard, no reentrant calls to `claimGift` are possible.
Such guards could already be implemented before the introduction of transient storage, using normal storage, but the high cost was discouraging.

Simple locks like the one above may be insufficient for complex contracts, requiring more sophisticated design patterns.
Let's consider an example, where a group of functions operates on a two shared data structures, while performing calls that may lead to reentrancy attempts.
Accesses to each buffer do not interfere with the other and can be covered with separate locks, while functions accessing the same buffer need to share one lock to ensure atomic access.

```solidity
contract DoubleBufferContract {
    uint[] bufferA;
    uint[] bufferB;

    modifier nonreentrant(bytes32 key) {
        assembly {
            if tload(key) { revert(0, 0) }
            tstore(key, 1)
        }
        _;
        assembly {
            tstore(key, 0)
        }
    }

    bytes32 constant A_LOCK = keccak256("a");
    bytes32 constant B_LOCK = keccak256("b");

    function pushA() nonreentrant(A_LOCK) public payable {
        bufferA.push(msg.value);
    }
    function popA() nonreentrant(A_LOCK) public {
        require(bufferA.length > 0);

        (bool success, ) = msg.sender.call{value: bufferA[bufferA.length - 1]}("");
        require(success);
        bufferA.pop();
    }

    function pushB() nonreentrant(B_LOCK) public payable {
        bufferB.push(msg.value);
    }
    function popB() nonreentrant(B_LOCK) public {
        require(bufferB.length > 0);

        (bool success, ) = msg.sender.call{value: bufferB[bufferB.length - 1]}("");
        require(success);
        bufferB.pop();
    }
}
```

In the above we rely on transient storage being implemented as key-value storage (thus, allowing random access to any slot at the same cost) to create two separate locks, which do not interfere with each other.

No reentrant calls within the two sections are possible. I.e. an external call triggered in `popA()` may end up entering `pushB()` or `popB()` (which is perfectly safe), but not `pushA()`.


## Composability of Smart Contracts and the Danger of Transient Storage

[Composability](https://en.wikipedia.org/wiki/Composability) is a basic design principle in software development in general and [applies to smart contracts in particular](https://ethereum.org/developers/docs/smart-contracts/composability).
A design is composable, if it consists of modular components that can be chained together ("composed") to more complex applications, while each component is an independent transaction that does not share state with previous components (other than global state that, to preserve composability, ought to be modified by each component atomically).

For smart contracts in particular, it is important that their behaviour is self-contained in this manner, such that multiple calls into individual smart contracts can be composed to more complex applications.
So far the EVM largely guaranteed composable behaviour, since multiple calls into a smart contract within a complex transaction are virtually indistinguishable from multiple calls to the contract stretched over several transactions.
However, transient storage allows a violation to this principle and incorrect use may lead to complex bugs that only surface when used across several calls.

Let's illustrate the problem with a simple example:

```solidity
contract MulService {
    function setMultiplier(uint multiplier) external {
        assembly {
            tstore(0, multiplier)
        }
    }

    function getMultiplier() private view returns (uint multiplier) {
        assembly {
            multiplier := tload(0)
        }
    }

    function multiply(uint value) external view returns (uint) {
        return value * getMultiplier();
    }
}
```

and a sequence of external calls:
```solidity
setMultiplier(42);
multiply(1);
multiply(2);
```

If the example used memory or storage to store the multiplier, it would be fully composable.
It would not matter whether you split the sequence into separate transactions or grouped them in some way.
You would always get the same result.
This enables use cases such as batching calls from multiple transactions together to reduce gas costs.
Transient storage potentially breaks such use cases since composability can no longer be taken for granted.

Note however, that the lack of composability is not an inherent property of transient storage.
It could have been preserved if the rules for resetting its content were slightly adjusted.
Currently the clearing happens for all contracts at the same time, when the transaction ends.
If instead it was cleared for a contract as soon as no function belonging to it remained active on the call stack (which could mean multiple resets per transaction), the issue would disappear.
In the example above it would mean clearing transient storage after each of the calls.

As another example, since transient storage is constructed as a relatively cheap key-value store, a smart contract author may be tempted to use transient storage as a replacement for in-memory mappings without keeping track of the modified keys in the mapping and thereby without clearing the mapping at the end of the call.
This, however, can easily lead to unexpected behaviour in complex transactions, in which values set by a previous call into the contract within the same transaction remain.

We recommend to generally always clear transient storage completely at the end of a call into your smart contract to avoid these kinds of issues and to simplify the analysis of the behaviour of your contract within complex transactions.
As a matter of fact, the Solidity team has been advocating for a change in the specification of transient storage to change its scope to the outermost call frame into a smart contract within a transaction to avoid this kind of pitfall on the EVM level - however, the concern was ultimately ignored and, consequently, responsible and safe use of transient storage now lies within the responsibility of the user.
We're still investigating our options to mitigate these pitfalls in future high-level language constructs built on top of the base functionality of the transient storage opcodes.

The use of transient storage for reentrancy locks that are cleared at the end of the call frame into the contract, is safe.
However, be sure to resist the temptation to save the 100 gas used for resetting the reentrancy lock, since failing to do so, will restrict your contract to only one call within a transaction, preventing its use in complex composed transactions, which have been a cornerstone for complex applications on chain.
