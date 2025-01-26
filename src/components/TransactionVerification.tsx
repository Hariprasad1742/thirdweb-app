import { useState, useEffect } from "react";
import { prepareContractCall } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";
import { contract } from "../main";

interface TransactionVerificationProps {
  contractId: bigint;
}

interface Milestone {
  description: string;
  percentage: number;
  isCompleted: boolean;
}

interface ContractDetails {
  projectName: string;
  projectDescription: string;
  builder: string;
  selectedContractor: string;
  totalAmount: bigint;
  allocatedAmount: bigint;
  remainingAmount: bigint;
  startDate: bigint;
  endDate: bigint;
  status: number; // 0: Open, 1: InProgress, 2: Completed, 3: Cancelled
  milestones: Milestone[];
}

export function TransactionVerification({ contractId }: TransactionVerificationProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const { mutate: sendTransaction } = useSendTransaction();
  const [contractDetails, setContractDetails] = useState<ContractDetails | null>(null);

  useEffect(() => {
    const fetchContractDetails = async () => {
      try {
        // Fetch contract details
        const contractDetailsCall = prepareContractCall({
          contract,
          method: "function contracts(uint256) view returns (string, string, address, uint256, uint256, uint256, uint256, uint256, bool, uint256, bool, uint8, address)",
          params: [contractId],
        });
        const contractData = await contract.execute(contractDetailsCall) as [
          string, // projectName
          string, // projectDescription
          string, // builder
          bigint, // totalAmount
          bigint, // allocatedAmount
          bigint, // remainingAmount
          bigint, // startDate
          bigint, // endDate
          boolean, // inflationClauseEnabled
          bigint, // inflationMaxDeviation
          boolean, // prePaymentEnabled
          number, // status
          string // selectedContractor
        ];
        
        // Fetch milestones
        const milestonesCall = prepareContractCall({
          contract,
          method: "function getMilestones(uint256) view returns (tuple(string, uint256, bool)[])",
          params: [contractId],
        });
        const milestonesData = await contract.execute(milestonesCall) as Array<[string, bigint, boolean]>;

        const [
          projectName,
          projectDescription,
          builder,
          totalAmount,
          allocatedAmount,
          remainingAmount,
          startDate,
          endDate,
          _inflationClauseEnabled,
          _inflationMaxDeviation,
          _prePaymentEnabled,
          status,
          selectedContractor
        ] = contractData;

        const milestones = milestonesData.map((milestone: any) => ({
          description: milestone[0],
          percentage: Number(milestone[1]),
          isCompleted: milestone[2]
        }));

        setContractDetails({
          projectName,
          projectDescription,
          builder,
          selectedContractor,
          totalAmount,
          allocatedAmount,
          remainingAmount,
          startDate,
          endDate,
          status,
          milestones
        });
      } catch (err) {
        setError("Failed to fetch contract details");
        console.error(err);
      }
    };

    fetchContractDetails();
  }, [contractId]);

  const handleCompleteMilestone = async (milestoneIndex: number) => {
    setError("");
    setIsSubmitting(true);

    try {
      console.log(`Completing milestone ${milestoneIndex}...`);
      // Use prepareContractCall and sendTransaction for write operations
      const tx = prepareContractCall({
        contract,
        method: "function completeMilestone(uint256 _contractId, uint256 _milestoneIndex)",
        params: [contractId, BigInt(milestoneIndex)],
      });
      await sendTransaction(tx);
      console.log("Milestone completed successfully");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to complete milestone");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusText = (status: number) => {
    switch (status) {
      case 0: return "Open";
      case 1: return "In Progress";
      case 2: return "Completed";
      case 3: return "Cancelled";
      default: return "Unknown";
    }
  };

  const formatDate = (timestamp: bigint) => {
    if (timestamp === BigInt(0)) return "Not set";
    return new Date(Number(timestamp) * 1000).toLocaleDateString();
  };

  const formatAmount = (amount: bigint) => {
    return (Number(amount) / 1e18).toFixed(6) + " ETH";
  };

  if (!contractDetails) {
    return (
      <div className="w-full max-w-2xl mx-auto p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-800 rounded w-3/4"></div>
          <div className="h-4 bg-gray-800 rounded w-1/2"></div>
          <div className="h-4 bg-gray-800 rounded w-5/6"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="space-y-6 p-6 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm">
        {/* Contract Details */}
        <div className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-gray-50">
              {contractDetails.projectName}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {contractDetails.projectDescription}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500 dark:text-gray-400">Status:</span>
              <span className="ml-2 font-medium text-gray-900 dark:text-gray-100">
                {getStatusText(contractDetails.status)}
              </span>
            </div>
            <div>
              <span className="text-gray-500 dark:text-gray-400">Total Amount:</span>
              <span className="ml-2 font-medium text-gray-900 dark:text-gray-100">
                {formatAmount(contractDetails.totalAmount)}
              </span>
            </div>
            <div>
              <span className="text-gray-500 dark:text-gray-400">Start Date:</span>
              <span className="ml-2 font-medium text-gray-900 dark:text-gray-100">
                {formatDate(contractDetails.startDate)}
              </span>
            </div>
            <div>
              <span className="text-gray-500 dark:text-gray-400">End Date:</span>
              <span className="ml-2 font-medium text-gray-900 dark:text-gray-100">
                {formatDate(contractDetails.endDate)}
              </span>
            </div>
          </div>
        </div>

        {/* Milestones */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
            Payment Milestones
          </h3>
          <div className="space-y-3">
            {contractDetails.milestones.map((milestone, index) => (
              <div
                key={index}
                className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg"
              >
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">
                      {milestone.description}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {milestone.percentage}% of total amount
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    {milestone.isCompleted ? (
                      <span className="px-2 py-1 text-sm font-medium text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/20 rounded">
                        Completed
                      </span>
                    ) : (
                      <button
                        onClick={() => handleCompleteMilestone(index)}
                        disabled={isSubmitting}
                        className="px-3 py-1 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        Mark Complete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {error && (
          <div className="text-sm text-red-600 dark:text-red-400">
            {error}
          </div>
        )}

        <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
            <span>Contract ID: {contractId.toString()}</span>
            <span className="text-xs">
              Milestone completion is permanent
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}