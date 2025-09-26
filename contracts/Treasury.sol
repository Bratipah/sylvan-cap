// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/// @title SylvanCap Treasury
/// @notice Receives USDC (or native) proceeds and distributes by configured shares.
contract Treasury is Ownable {
    struct Shares {
        uint16 toTSTHoldersBps; // e.g., 7000 = 70%
        uint16 toForestMgmtBps; // e.g., 2000 = 20%
        uint16 toOpsBps;        // e.g., 700 = 7%
        uint16 toInsuranceBps;  // e.g., 300 = 3%
    }

    IERC20 public immutable payoutToken; // e.g., USDC on ONINO
    address public tstDistributor;       // contract or EOA handling TST holder distribution
    address public forestMgmt;
    address public ops;
    address public insurance;
    Shares public shares;

    error InvalidShares();
    error ZeroAddress();

    event Distributed(uint256 amount);

    constructor(
        address _payoutToken,
        address _tstDistributor,
        address _forestMgmt,
        address _ops,
        address _insurance,
        Shares memory _shares
    ) Ownable(msg.sender) {
        if (
            _payoutToken == address(0) ||
            _tstDistributor == address(0) ||
            _forestMgmt == address(0) ||
            _ops == address(0) ||
            _insurance == address(0)
        ) revert ZeroAddress();
        if (
            uint256(_shares.toTSTHoldersBps) +
                _shares.toForestMgmtBps +
                _shares.toOpsBps +
                _shares.toInsuranceBps != 10000
        ) revert InvalidShares();
        payoutToken = IERC20(_payoutToken);
        tstDistributor = _tstDistributor;
        forestMgmt = _forestMgmt;
        ops = _ops;
        insurance = _insurance;
        shares = _shares;
    }

    function setTstDistributor(address _d) external onlyOwner {
        if (_d == address(0)) revert ZeroAddress();
        tstDistributor = _d;
    }

    function setShares(Shares calldata s) external onlyOwner {
        if (uint256(s.toTSTHoldersBps) + s.toForestMgmtBps + s.toOpsBps + s.toInsuranceBps != 10000)
            revert InvalidShares();
        shares = s;
    }

    function distribute() external {
        uint256 bal = payoutToken.balanceOf(address(this));
        require(bal > 0, "No funds");

        uint256 toTST = (bal * shares.toTSTHoldersBps) / 10000;
        uint256 toMgmt = (bal * shares.toForestMgmtBps) / 10000;
        uint256 toOps = (bal * shares.toOpsBps) / 10000;
        uint256 toIns = bal - toTST - toMgmt - toOps; // remainder

        require(payoutToken.transfer(tstDistributor, toTST));
        require(payoutToken.transfer(forestMgmt, toMgmt));
        require(payoutToken.transfer(ops, toOps));
        require(payoutToken.transfer(insurance, toIns));

        emit Distributed(bal);
    }
}



