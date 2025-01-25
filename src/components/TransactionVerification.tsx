import { useState } from "react";

interface Transaction {
  id: string;
  milestoneIndex: number;
  amount: number;
  timestamp: string;
  status: "pending" | "verified" | "disputed";
  inflationAdjustment?: number;
}

interface ContractDetails {
  bidId: string;
  totalAmount: number;
  inflationProtection: {
    usePrePayment: boolean;
    inflationClauseEnabled: boolean;
    inflationPercentage: number;
  };
  paymentSchedule: {
    description: string;
    percentage: number;
    amount: number;
    completed: boolean;
  }[];
}

export function TransactionVerification({ contractDetails }: { contractDetails: ContractDetails }) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [newAmount, setNewAmount] = useState("");
  const [selectedMilestone, setSelectedMilestone] = useState(0);

  const handleAddTransaction = () => {
    const amount = parseFloat(newAmount);
    if (isNaN(amount)) return;

    const milestone = contractDetails.paymentSchedule[selectedMilestone];
    let adjustedAmount = amount;

    // Calculate inflation adjustment if enabled
    if (contractDetails.inflationProtection.inflationClauseEnabled) {
      const maxAdjustment = milestone.amount * (contractDetails.inflationProtection.inflationPercentage / 100);
      if (Math.abs(amount - milestone.amount) > maxAdjustment) {
        alert("Amount exceeds allowed inflation adjustment range");
        return;
      }
      adjustedAmount = amount;
    }

    const newTransaction: Transaction = {
      id: `TXN-${Date.now()}`,
      milestoneIndex: selectedMilestone,
      amount: adjustedAmount,
      timestamp: new Date().toISOString(),
      status: "pending",
      inflationAdjustment: adjustedAmount - milestone.amount
    };

    setTransactions([...transactions, newTransaction]);
    setNewAmount("");
  };

  const verifyTransaction = (transactionId: string) => {
    const updatedTransactions = transactions.map(txn => {
      if (txn.id === transactionId) {
        const milestone = contractDetails.paymentSchedule[txn.milestoneIndex];
        milestone.completed = true;
        return { ...txn, status: "verified" as const };
      }
      return txn;
    });
    setTransactions(updatedTransactions);
  };

  const disputeTransaction = (transactionId: string) => {
    setTransactions(
      transactions.map(txn =>
        txn.id === transactionId ? { ...txn, status: "disputed" as const } : txn
      )
    );
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return <span className="px-2 py-1 text-sm rounded bg-green-500 text-white">Verified</span>;
      case "disputed":
        return <span className="px-2 py-1 text-sm rounded bg-red-500 text-white">Disputed</span>;
      default:
        return <span className="px-2 py-1 text-sm rounded bg-yellow-500 text-white">Pending</span>;
    }
  };

  const calculateTotalPaid = () => {
    return transactions
      .filter(txn => txn.status === "verified")
      .reduce((sum, txn) => sum + txn.amount, 0);
  };

  return (
    <div className="bg-zinc-900 p-8 rounded-lg border border-zinc-800 w-[800px]">
      <h2 className="text-2xl font-bold mb-6">Transaction Verification</h2>
      
      <div className="space-y-6">
        {/* Contract Summary */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Contract Summary</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="font-medium">Contract ID:</span> {contractDetails.bidId}
            </div>
            <div>
              <span className="font-medium">Total Amount:</span> ₹{contractDetails.totalAmount}
            </div>
            <div>
              <span className="font-medium">Total Paid:</span> ₹{calculateTotalPaid()}
            </div>
            <div>
              <span className="font-medium">Remaining:</span> ₹
              {contractDetails.totalAmount - calculateTotalPaid()}
            </div>
          </div>
        </div>

        <hr className="border-zinc-800" />

        {/* New Transaction */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Record New Transaction</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium">Payment Milestone</label>
              <select
                className="w-full p-2 bg-zinc-800 rounded border border-zinc-700"
                value={selectedMilestone}
                onChange={(e) => setSelectedMilestone(Number(e.target.value))}
              >
                {contractDetails.paymentSchedule.map((milestone, index) => (
                  <option key={index} value={index} disabled={milestone.completed}>
                    {milestone.description} (₹{milestone.amount})
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium">Amount (₹)</label>
              <input
                type="number"
                value={newAmount}
                onChange={(e) => setNewAmount(e.target.value)}
                placeholder="Enter amount"
                className="w-full p-2 bg-zinc-800 rounded border border-zinc-700"
              />
            </div>
          </div>
          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
            onClick={handleAddTransaction}
          >
            Record Transaction
          </button>
        </div>

        <hr className="border-zinc-800" />

        {/* Transaction History */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Transaction History</h3>
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="p-4 rounded-lg border border-zinc-800"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">
                      {contractDetails.paymentSchedule[transaction.milestoneIndex].description}
                    </h4>
                    <p className="text-sm text-zinc-400">
                      Amount: ₹{transaction.amount}
                      {transaction.inflationAdjustment !== 0 && (
                        <span className="ml-2">
                          (Adjustment: ₹{transaction.inflationAdjustment})
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-zinc-500">
                      {new Date(transaction.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    {getStatusBadge(transaction.status)}
                    {transaction.status === "pending" && (
                      <div className="space-x-2">
                        <button
                          className="px-3 py-1 text-sm border border-red-500 text-red-500 hover:bg-red-500/10 rounded"
                          onClick={() => disputeTransaction(transaction.id)}
                        >
                          Dispute
                        </button>
                        <button
                          className="px-3 py-1 text-sm bg-green-500 hover:bg-green-600 text-white rounded"
                          onClick={() => verifyTransaction(transaction.id)}
                        >
                          Verify
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}