import { useState } from "react";
import { prepareContractCall } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";
import { contract } from "../main";

interface ApprovalWorkflowProps {
  contractId: bigint;
  onComplete: () => void;
}

export function ApprovalWorkflow({ contractId, onComplete }: ApprovalWorkflowProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [approvalData, setApprovalData] = useState({
    approverNotes: "",
    approvalAmount: ""
  });
  const { mutate: sendTransaction } = useSendTransaction();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setApprovalData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleApproval = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      if (!approvalData.approvalAmount) {
        throw new Error("Please enter approval amount");
      }

      const amountInWei = BigInt(Math.floor(parseFloat(approvalData.approvalAmount) * 1e18));

      console.log("Preparing approval transaction...");
      const transaction = prepareContractCall({
        contract,
        method: "function approveTransaction(uint256 _transactionId)",
        params: [contractId],
      });

      console.log("Sending approval transaction...");
      await sendTransaction(transaction);
      console.log("Approval transaction sent successfully");

      onComplete();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to approve transaction");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="space-y-6 p-6 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-gray-50">
            Approve Transaction
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Enter approval details and confirm the transaction
          </p>
        </div>

        <form onSubmit={handleApproval} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="approvalAmount" className="text-sm font-medium text-gray-900 dark:text-gray-100">
              Approval Amount (ETH)
            </label>
            <input
              type="number"
              step="0.000001"
              id="approvalAmount"
              name="approvalAmount"
              value={approvalData.approvalAmount}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 text-sm bg-transparent border border-gray-200 dark:border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-600"
              placeholder="Enter approval amount in ETH"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="approverNotes" className="text-sm font-medium text-gray-900 dark:text-gray-100">
              Approval Notes
            </label>
            <textarea
              id="approverNotes"
              name="approverNotes"
              value={approvalData.approverNotes}
              onChange={handleInputChange}
              className="w-full min-h-[100px] px-3 py-2 text-sm bg-transparent border border-gray-200 dark:border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-600"
              placeholder="Enter any notes for this approval"
            />
          </div>

          {error && (
            <div className="text-sm text-red-600 dark:text-red-400">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full justify-center text-sm font-medium inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm
              text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
              disabled:opacity-50 disabled:cursor-not-allowed dark:focus:ring-offset-gray-900`}
          >
            {isSubmitting ? 'Processing...' : 'Approve Transaction'}
          </button>
        </form>

        <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
            <span>Contract ID: {contractId.toString()}</span>
            <span className="text-xs">
              Approval is permanent
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}