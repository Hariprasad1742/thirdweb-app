import { useState } from "react";
import { prepareContractCall } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";
import { contract } from "../main";

interface ContractInitializerProps {
  onSubmit: (contractId: bigint, data: {
    projectName: string;
    projectDescription: string;
    totalAmount: string;
    inflationClauseEnabled: boolean;
    inflationMaxDeviation: string;
    prePaymentEnabled: boolean;
    milestones: Array<{
      description: string;
      percentage: string;
    }>;
  }) => void;
}

export default function ContractInitializer({ onSubmit }: ContractInitializerProps) {
  const [contractData, setContractData] = useState({
    projectName: "",
    projectDescription: "",
    totalAmount: "",
    inflationClauseEnabled: false,
    inflationMaxDeviation: "5",
    prePaymentEnabled: false,
    milestones: [
      { description: "Project Start", percentage: "25" },
      { description: "Foundation Work", percentage: "25" },
      { description: "Structure Complete", percentage: "25" },
      { description: "Project Completion", percentage: "25" }
    ]
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const { mutate: sendTransaction } = useSendTransaction();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setContractData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleMilestoneChange = (index: number, field: "description" | "percentage", value: string) => {
    setContractData(prev => ({
      ...prev,
      milestones: prev.milestones.map((milestone, i) => 
        i === index ? { ...milestone, [field]: value } : milestone
      )
    }));
  };

  const validateMilestones = () => {
    const totalPercentage = contractData.milestones.reduce(
      (sum, milestone) => sum + Number(milestone.percentage),
      0
    );
    return totalPercentage === 100;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      if (!contractData.projectName || !contractData.projectDescription || !contractData.totalAmount) {
        throw new Error("Please fill in all required fields");
      }

      if (!validateMilestones()) {
        throw new Error("Milestone percentages must sum to 100%");
      }

      const createContractTx = prepareContractCall({
        contract,
        method: "function createContract(string memory _projectName, string memory _projectDescription, uint256 _totalAmount, bool _inflationClauseEnabled, uint256 _inflationMaxDeviation, bool _prePaymentEnabled, string[] memory _milestoneDescriptions, uint256[] memory _milestonePercentages)",
        params: [
          contractData.projectName,
          contractData.projectDescription,
          BigInt(Math.floor(parseFloat(contractData.totalAmount) * 1e18)), // Convert to Wei
          contractData.inflationClauseEnabled,
          BigInt(parseInt(contractData.inflationMaxDeviation)),
          contractData.prePaymentEnabled,
          contractData.milestones.map(m => m.description),
          contractData.milestones.map(m => BigInt(parseInt(m.percentage)))
        ],
      });

      console.log("Creating contract...");
      await sendTransaction(createContractTx);
      console.log("Contract created successfully");

      // Notify parent component
      onSubmit(BigInt(1), contractData);

      // Reset form
      setContractData({
        projectName: "",
        projectDescription: "",
        totalAmount: "",
        inflationClauseEnabled: false,
        inflationMaxDeviation: "5",
        prePaymentEnabled: false,
        milestones: [
          { description: "Project Start", percentage: "25" },
          { description: "Foundation Work", percentage: "25" },
          { description: "Structure Complete", percentage: "25" },
          { description: "Project Completion", percentage: "25" }
        ]
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create contract");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="space-y-6 p-6 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-gray-50">
            Create Construction Contract
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Enter the details for your construction project contract
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="projectName" className="text-sm font-medium text-gray-900 dark:text-gray-100">
              Project Name
            </label>
            <input
              type="text"
              id="projectName"
              name="projectName"
              value={contractData.projectName}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 text-sm bg-transparent border border-gray-200 dark:border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 dark:text-gray-100"
              placeholder="Enter project name"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="projectDescription" className="text-sm font-medium text-gray-900 dark:text-gray-100">
              Project Description
            </label>
            <textarea
              id="projectDescription"
              name="projectDescription"
              value={contractData.projectDescription}
              onChange={handleInputChange}
              required
              className="w-full min-h-[100px] px-3 py-2 text-sm bg-transparent border border-gray-200 dark:border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 dark:text-gray-100"
              placeholder="Enter project description and requirements"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="totalAmount" className="text-sm font-medium text-gray-900 dark:text-gray-100">
              Total Amount (ETH)
            </label>
            <input
              type="number"
              step="0.000001"
              id="totalAmount"
              name="totalAmount"
              value={contractData.totalAmount}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 text-sm bg-transparent border border-gray-200 dark:border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 dark:text-gray-100"
              placeholder="Enter total amount in ETH"
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="inflationClauseEnabled"
              name="inflationClauseEnabled"
              checked={contractData.inflationClauseEnabled}
              onChange={handleInputChange}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="inflationClauseEnabled" className="text-sm text-gray-900 dark:text-gray-100">
              Enable Inflation Clause
            </label>
          </div>

          {contractData.inflationClauseEnabled && (
            <div className="space-y-2">
              <label htmlFor="inflationMaxDeviation" className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Max Inflation Deviation (%)
              </label>
              <input
                type="number"
                id="inflationMaxDeviation"
                name="inflationMaxDeviation"
                value={contractData.inflationMaxDeviation}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 text-sm bg-transparent border border-gray-200 dark:border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 dark:text-gray-100"
                placeholder="Enter max inflation deviation percentage"
              />
            </div>
          )}

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="prePaymentEnabled"
              name="prePaymentEnabled"
              checked={contractData.prePaymentEnabled}
              onChange={handleInputChange}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="prePaymentEnabled" className="text-sm text-gray-900 dark:text-gray-100">
              Enable Pre-Payment
            </label>
          </div>

          <div className="space-y-4">
            <label className="text-sm font-medium text-gray-900 dark:text-gray-100">
              Payment Milestones
            </label>
            {contractData.milestones.map((milestone, index) => (
              <div key={index} className="flex space-x-4">
                <input
                  type="text"
                  value={milestone.description}
                  onChange={(e) => handleMilestoneChange(index, "description", e.target.value)}
                  className="flex-1 px-3 py-2 text-sm bg-transparent border border-gray-200 dark:border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 dark:text-gray-100"
                  placeholder="Milestone description"
                />
                <input
                  type="number"
                  value={milestone.percentage}
                  onChange={(e) => handleMilestoneChange(index, "percentage", e.target.value)}
                  className="w-24 px-3 py-2 text-sm bg-transparent border border-gray-200 dark:border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 dark:text-gray-100"
                  placeholder="%"
                />
              </div>
            ))}
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
            {isSubmitting ? 'Creating Contract...' : 'Create Contract'}
          </button>
        </form>

        <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            This will deploy a new smart contract to the blockchain
          </p>
        </div>
      </div>
    </div>
  );
}