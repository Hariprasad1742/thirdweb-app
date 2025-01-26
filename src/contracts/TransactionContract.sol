// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TransactionContract {
    struct Transaction {
        address submitter;
        string data;
        bool isApproved;
        mapping(address => bool) approvals;
    }

    mapping(uint256 => Transaction) public transactions;
    uint256 public transactionCount;

    event TransactionSubmitted(
        uint256 indexed transactionId,
        address indexed submitter,
        string data
    );

    event TransactionApproved(
        uint256 indexed transactionId,
        address indexed approver
    );

    function submitTransaction(string memory _data) public {
        uint256 transactionId = transactionCount;
        Transaction storage newTx = transactions[transactionId];
        
        newTx.submitter = msg.sender;
        newTx.data = _data;
        newTx.isApproved = false;

        emit TransactionSubmitted(transactionId, msg.sender, _data);
        transactionCount++;
    }

    function approveTransaction(uint256 _transactionId) public {
        require(_transactionId < transactionCount, "Transaction does not exist");
        Transaction storage transaction = transactions[_transactionId];
        require(!transaction.approvals[msg.sender], "Already approved");

        transaction.approvals[msg.sender] = true;
        emit TransactionApproved(_transactionId, msg.sender);
    }

    function getTransaction(uint256 _transactionId) public view returns (
        address submitter,
        string memory data,
        bool isApproved
    ) {
        require(_transactionId < transactionCount, "Transaction does not exist");
        Transaction storage transaction = transactions[_transactionId];
        
        return (
            transaction.submitter,
            transaction.data,
            transaction.isApproved
        );
    }
}