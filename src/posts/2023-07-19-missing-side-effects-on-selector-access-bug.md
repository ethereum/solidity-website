---
layout: post
published: true
title: 'Bug in Legacy Code Generation When Accessing the .selector Member on Expressions with Side Effects'
date: '2023-07-19'
author: Solidity Team
category: Security Alerts
---

On June 26, 2023, a bug in the legacy code generation pipeline of the Solidity compiler was found during
investigation of a security report related to the use of `abi.decode` with a ternary
expression that has side effects, as the type argument.

The legacy code generator was not evaluating complex expressions, like assignments, function calls, or conditionals,
whose  `.selector` was being accessed.
This led to the side-effects of such expressions not being executed, and therefore potentially incorrect behavior of
contracts compiled using the legacy pipeline.
The via-IR code generator behaves as expected and evaluates such expressions.

The bug has been present since version 0.6.2 of the compiler.
However, to the best of our knowledge, it has never been exploited or reported externally.
Any actually affected coding pattern would likely be considered an anti-pattern by users and disregarded
in favor of more sensible alternatives.

For example, in an expression like `f().g.selector`, the result will always be the same regardless
of what `f()` returns, and it is more natural to perform the operation directly on the contract type,
i.e., `C.g.selector`.
Furthermore, expressions like `f().selector` remain unaffected.
As a result, we have assigned it a severity level of "low".

## Which Contracts Are Affected?

If you are still utilizing the legacy code generation pipeline and your contract accesses the `.selector`
on expressions that have side effects your code may be vulnerable to this bug.
For example, the code below, if compiled via IR will result in `x` being
assigned `42` and contract `D` being created as a side effect of evaluating the function call `h()`.
On the other hand, if compiled using the legacy code generation pipeline, it will result in `x`
being `0` and `D` not being deployed.

```solidity
contract D {
    function f() external {}
}

contract C {
    uint256 x;

    function f() public {
        h().f.selector;
    }

    function h() public returns (D) {
        x = 42;
        return new D();
    }
}
```

Below, you can find another example that demonstrates the use of an assignment expression instead of a
function call expression.
In the example, if the legacy code generation pipeline was used, the expression `x = true`
would not be evaluated properly, causing the value of `x` to remain unchanged.

```solidity
contract D {
    function g() external {}
}

contract C {
    bool x;
    function f() external {
        ((x = true) ? C.f : D.g).selector;
    }
}
```

## Technical Details

The bug manifested itself in cases where it was possible to determine which function is the result
of an expression at compilation time, which allowed the compiler to calculate the selector without
actually evaluating the expression.
The legacy code generator would take that shortcut to generate more efficient code on the wrong
assumption that the expression must be side effect free.

In contrast, the new IR-based code generator is primarily concerned with producing correct code and
can defer the task of making it efficient to the Yul optimizer.
This means that it does not have to rely on such assumptions.
The whole expression is always visited and evaluated in the unoptimized code.
It will only be removed by the optimizer if it is determined actually to be free of side effects.

Due to a related bug in the type checker, the bug would also impact
certain expressions whose value could not be determined at compilation time.
The compiler internally associates function types with function definitions, and the associated
definition would be carried over to the result type of an expression.
If the expression involved multiple functions, the resulting type would not necessarily point at
the right one.

For example, even in `(condition ? C.f : D.g).selector`, where the value of `condition` is only
known at runtime, the compiler was able to determine the common type for `C.f` and `D.g`,
and would use the definition associated with such type to determine the function to take the selector from.
This bug was also fixed in the [Solidity v0.8.21](https://github.com/ethereum/solidity/releases/tag/v0.8.21) release.

In conclusion, the fact that this bug remained undiscovered until now indicates that real projects do not seem to be using such
a pattern since the expected usage of the `.selector` is in a constant expression.
