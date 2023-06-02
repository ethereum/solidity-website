let examples = new Map()

examples['helloWorld'] = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
contract MyContract {
    function helloWorld() public pure returns (string memory) {
        return "Hello, World!";
    }
}`

examples['erc20'] = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
contract ERC20 {
    string public constant name = "ERC20";
    string public constant symbol = "ERC";
    uint8 public constant decimals = 18;

    mapping(address => uint256) balances;

    event Transfer(address indexed from, address indexed to, uint256 tokens);
    
    uint256 public immutable totalSupply;
    
    constructor(uint256 total) {
        totalSupply = total;
        balances[msg.sender] = total;
    }

    function balanceOf(address tokenOwner) public view returns (uint256) {
        return balances[tokenOwner];
    }
    
    function transfer(address receiver, uint256 numTokens) public returns (bool) {
        require(balances[msg.sender] >= numTokens);
        balances[msg.sender] = balances[msg.sender] - numTokens;
        balances[receiver] = balances[receiver] + numTokens;
        emit Transfer(msg.sender, receiver, numTokens);
        return true;
    }
    
    function transferFrom(address owner, address buyer, uint256 numTokens) public returns (bool) {
        require(balances[owner] >= numTokens);
        balances[owner] = balances[owner] - numTokens;
        balances[buyer] = balances[buyer] + numTokens;
        emit Transfer(owner, buyer, numTokens);
        return true;
    }
}`

examples['simpleAuction'] = `// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;
contract SimpleAuction {
    // Parameters of the auction. Times are either
    // absolute unix timestamps (seconds since 1970-01-01)
    // or time periods in seconds.
    address payable public beneficiary;
    uint public auctionEndTime;

    // Current state of the auction.
    address public highestBidder;
    uint public highestBid;

    // Allowed withdrawals of previous bids
    mapping(address => uint) pendingReturns;

    // Set to true at the end, disallows any change.
    // By default initialized to \`false\`.
    bool ended;

    // Events that will be emitted on changes.
    event HighestBidIncreased(address bidder, uint amount);
    event AuctionEnded(address winner, uint amount);

    // The following is a so-called natspec comment,
    // recognizable by the three slashes.
    // It will be shown when the user is asked to
    // confirm a transaction.

    /// Create a simple auction with \`_biddingTime\`
    /// seconds bidding time on behalf of the
    /// beneficiary address \`_beneficiary\`.
    constructor(
        uint _biddingTime,
        address payable _beneficiary
    ) {
        beneficiary = _beneficiary;
        auctionEndTime = block.timestamp + _biddingTime;
    }

    /// Bid on the auction with the value sent
    /// together with this transaction.
    /// The value will only be refunded if the
    /// auction is not won.
    function bid() public payable {
        // No arguments are necessary, all
        // information is already part of
        // the transaction. The keyword payable
        // is required for the function to
        // be able to receive Ether.

        // Revert the call if the bidding
        // period is over.
        require(
            block.timestamp <= auctionEndTime,
            "Auction already ended."
        );

        // If the bid is not higher, send the
        // money back (the failing require
        // will revert all changes in this
        // function execution including
        // it having received the money).
        require(
            msg.value > highestBid,
            "There already is a higher bid."
        );

        if (highestBid != 0) {
            // Sending back the money by simply using
            // highestBidder.send(highestBid) is a security risk
            // because it could execute an untrusted contract.
            // It is always safer to let the recipients
            // withdraw their money themselves.
            pendingReturns[highestBidder] += highestBid;
        }
        highestBidder = msg.sender;
        highestBid = msg.value;
        emit HighestBidIncreased(msg.sender, msg.value);
    }

    /// Withdraw a bid that was overbid.
    function withdraw() public returns (bool) {
        uint amount = pendingReturns[msg.sender];
        if (amount > 0) {
            // It is important to set this to zero because the recipient
            // can call this function again as part of the receiving call
            // before \`send\` returns.
            pendingReturns[msg.sender] = 0;

            if (!payable(msg.sender).send(amount)) {
                // No need to call throw here, just reset the amount owing
                pendingReturns[msg.sender] = amount;
                return false;
            }
        }
        return true;
    }

    /// End the auction and send the highest bid
    /// to the beneficiary.
    function auctionEnd() public {
        // It is a good guideline to structure functions that interact
        // with other contracts (i.e. they call functions or send Ether)
        // into three phases:
        // 1. checking conditions
        // 2. performing actions (potentially changing conditions)
        // 3. interacting with other contracts
        // If these phases are mixed up, the other contract could call
        // back into the current contract and modify the state or cause
        // effects (ether payout) to be performed multiple times.
        // If functions called internally include interaction with external
        // contracts, they also have to be considered interaction with
        // external contracts.

        // 1. Conditions
        require(block.timestamp >= auctionEndTime, "Auction not yet ended.");
        require(!ended, "auctionEnd has already been called.");

        // 2. Effects
        ended = true;
        emit AuctionEnded(highestBidder, highestBid);

        // 3. Interaction
        beneficiary.transfer(highestBid);
    }
}`

let worker = new Worker('compiler_worker.js')
let editor = ace.edit('compilerInput')

let compile = () => {
  worker.postMessage(
    JSON.stringify({
      language: 'Solidity',
      sources: { '': { content: editor.getValue() } },
      settings: {
        optimizer: { enabled: true },
        outputSelection: {
          '*': {
            '*': ['evm.bytecode.object', 'evm.gasEstimates', 'evm.assembly'],
          },
        },
      },
    })
  )
}

editor.session.setMode('ace/mode/solidity')
editor.getSession().setUseWorker(false)
editor.renderer.on('afterRender', compile)
console.log({ worker, editor })
worker.addEventListener('message', (message) => {
  if (message.data.version !== undefined) {
    document.getElementById('compiler_version').innerText = message.data.version
    compile()
  } else if (message.data.result !== undefined) {
    let result = JSON.parse(message.data.result)
    console.log(result)
    let errors = document.getElementById('compiler_errors')
    errors.innerHTML = ''
    if (result.errors === undefined) {
      errors.innerHTML = ''
      for (contractName in result.contracts['']) {
        let contract = result.contracts[''][contractName]
        errors.innerHTML +=
          '<strong>' +
          contractName +
          ' (' +
          contract.evm.bytecode.object.length / 2 +
          ' bytes)</strong><br/>'
        errors.innerHTML +=
          'Deployment costs: ' +
          contract.evm.gasEstimates.creation.totalCost +
          ' gas.<br/>'
        errors.innerHTML +=
          'Bytecode:<textarea>' + contract.evm.bytecode.object + '</textarea>'
        errors.innerHTML +=
          'Assembly:<textarea>' + contract.evm.assembly + '</textarea>'
      }
    } else {
      for (error of result.errors) {
        errors.innerHTML +=
          '<h4>Errors:</h4><pre>' + error.formattedMessage + '</pre>'
      }
    }
  }
})

let dropDownList = document.getElementById('selectedContract')
function selectionChanged() {
  editor.setValue(
    examples[dropDownList.options[dropDownList.selectedIndex].id],
    1
  )
}
selectionChanged()
dropDownList.addEventListener('change', selectionChanged)
