import { useState } from "react";
import { ConnectButton } from "thirdweb/react";
import { client } from "../client";
import { BidForm } from "../components/BidForm";
import { ApprovalWorkflow } from "../components/ApprovalWorkflow";
import { TransactionVerification } from "../components/TransactionVerification";

type ContractStage = "bid" | "approval" | "transaction";

interface ContractState {
  bidId?: string;
  builderName?: string;
  agencyName?: string;
  projectName?: string;
  projectDescription?: string;
  bidAmount?: string;
  estimatedTimeline?: string;
  inflationProtection?: {
    usePrePayment: boolean;
    inflationClauseEnabled: boolean;
    inflationPercentage: string;
  };
  paymentSchedule?: {
    description: string;
    percentage: number;
    amount: number;
    completed: boolean;
  }[];
}

export function ContractPage() {
  const [stage, setStage] = useState<ContractStage>("bid");
  const [contractState, setContractState] = useState<ContractState>({});

  const handleBidSubmission = (bidData: any) => {
    const bidId = `BID-${Date.now()}`;
    const paymentSchedule = bidData.paymentSchedule.map((milestone: any) => ({
      ...milestone,
      amount: (parseFloat(bidData.basicInfo.bidAmount) * milestone.percentage) / 100,
      completed: false,
    }));

    setContractState({
      bidId,
      ...bidData.basicInfo,
      inflationProtection: bidData.inflationProtection,
      paymentSchedule,
    });
    setStage("approval");
  };

  const handleApprovalComplete = () => {
    setStage("transaction");
  };

  const renderStageIndicator = () => {
    return (
      <div className="flex justify-center mb-8">
        <div className="flex items-center space-x-4">
          <div className={`flex items-center ${stage === "bid" ? "text-blue-500" : "text-gray-500"}`}>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                stage === "bid" ? "border-blue-500 bg-blue-50" : "border-gray-300"
              }`}
            >
              1
            </div>
            <span className="ml-2">Bid Submission</span>
          </div>
          <div className="w-16 h-0.5 bg-gray-300" />
          <div className={`flex items-center ${stage === "approval" ? "text-blue-500" : "text-gray-500"}`}>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                stage === "approval" ? "border-blue-500 bg-blue-50" : "border-gray-300"
              }`}
            >
              2
            </div>
            <span className="ml-2">Approval Process</span>
          </div>
          <div className="w-16 h-0.5 bg-gray-300" />
          <div className={`flex items-center ${stage === "transaction" ? "text-blue-500" : "text-gray-500"}`}>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                stage === "transaction" ? "border-blue-500 bg-blue-50" : "border-gray-300"
              }`}
            >
              3
            </div>
            <span className="ml-2">Transaction Verification</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="border-b border-zinc-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold">Process Flow</div>
          <ConnectButton
            client={client}
            appMetadata={{
              name: "Process Flow",
              url: "https://example.com",
            }}
          />
        </div>
      </nav>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Contract Management</h1>
        {renderStageIndicator()}
        <div className="flex justify-center">
          {stage === "bid" && (
            <BidForm onSubmit={handleBidSubmission} />
          )}
          
          {stage === "approval" && (
            <ApprovalWorkflow
              bidDetails={{
                bidId: contractState.bidId!,
                builderName: contractState.builderName!,
                agencyName: contractState.agencyName!,
                projectName: contractState.projectName!,
                bidAmount: contractState.bidAmount!,
                inflationProtection: contractState.inflationProtection!,
                paymentSchedule: contractState.paymentSchedule!
              }}
              onComplete={handleApprovalComplete}
            />
          )}
          
          {stage === "transaction" && (
            <TransactionVerification
              contractDetails={{
                bidId: contractState.bidId!,
                totalAmount: parseFloat(contractState.bidAmount!),
                inflationProtection: {
                  usePrePayment: contractState.inflationProtection!.usePrePayment,
                  inflationClauseEnabled: contractState.inflationProtection!.inflationClauseEnabled,
                  inflationPercentage: parseFloat(contractState.inflationProtection!.inflationPercentage)
                },
                paymentSchedule: contractState.paymentSchedule!.map(milestone => ({
                  ...milestone,
                  amount: (parseFloat(contractState.bidAmount!) * milestone.percentage) / 100,
                  completed: false
                }))
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}