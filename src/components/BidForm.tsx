import { useState } from "react";
import { prepareContractCall } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";
import { contract } from "../main";

interface BidFormProps {
  contractId: bigint;
  onSubmit: (data: {
    amount: string;
    timeline: string;
    technicalDetails: string;
  }) => void;
}

export default function BidForm({ contractId, onSubmit }: BidFormProps) {
  const [bidData, setBidData] = useState({
    amount: "",
    timeline: "",
    technicalDetails: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const { mutate: sendTransaction } = useSendTransaction();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBidData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      if (!bidData.amount || !bidData.timeline || !bidData.technicalDetails) {
        throw new Error("Please fill in all required fields");
      }

      const amountInWei = BigInt(Math.floor(parseFloat(bidData.amount) * 1e18));
      const timelineInDays = BigInt(Math.floor(parseFloat(bidData.timeline)));
      
      const technicalDetails = JSON.stringify({
        details: bidData.technicalDetails,
        metadata: {
          submissionDate: new Date().toISOString(),
          version: "1.0",
          bidType: "construction",
        }
      });

      const submitBidTx = prepareContractCall({
        contract,
        method: "function submitBid(uint256 _contractId, uint256 _amount, uint256 _timeline, string memory _technicalDetails)",
        params: [
          contractId,
          amountInWei,
          timelineInDays,
          technicalDetails
        ],
      });

      console.log("Submitting bid...");
      await sendTransaction(submitBidTx);
      console.log("Bid submitted successfully");

      // Notify parent component
      onSubmit(bidData);

      // Reset form
      setBidData({
        amount: "",
        timeline: "",
        technicalDetails: ""
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit bid");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="space-y-6 p-6 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-gray-50">
            Submit Bid
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Enter your bid details for the construction project
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="amount" className="text-sm font-medium text-gray-900 dark:text-gray-100">
              Bid Amount (ETH)
            </label>
            <input
              type="number"
              step="0.000001"
              id="amount"
              name="amount"
              value={bidData.amount}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 text-sm bg-transparent border border-gray-200 dark:border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-600"
              placeholder="Enter bid amount in ETH"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="timeline" className="text-sm font-medium text-gray-900 dark:text-gray-100">
              Timeline (Days)
            </label>
            <input
              type="number"
              id="timeline"
              name="timeline"
              value={bidData.timeline}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 text-sm bg-transparent border border-gray-200 dark:border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-600"
              placeholder="Enter project timeline in days"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="technicalDetails" className="text-sm font-medium text-gray-900 dark:text-gray-100">
              Technical Details
            </label>
            <textarea
              id="technicalDetails"
              name="technicalDetails"
              value={bidData.technicalDetails}
              onChange={handleInputChange}
              required
              className="w-full min-h-[100px] px-3 py-2 text-sm bg-transparent border border-gray-200 dark:border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-600"
              placeholder="Enter technical details and specifications"
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
            {isSubmitting ? 'Submitting...' : 'Submit Bid'}
          </button>
        </form>

        <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            All bids are recorded on the blockchain and cannot be modified after submission
          </p>
        </div>
      </div>
    </div>
  );
}