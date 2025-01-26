import * as React from "react";
import { useState } from "react";
import { ConnectButton } from "thirdweb/react";
import { client } from "../client";
import ContractInitializer from "../components/ContractInitializer";
import BidForm from "../components/BidForm";
import { TransactionVerification } from "../components/TransactionVerification";

type ContractStage = "create" | "bid" | "transaction";

interface ContractData {
  contractId: bigint;
  projectName?: string;
  totalAmount?: string;
}

export function ContractPage() {
  const [stage, setStage] = useState<ContractStage>("create");
  const [contractData, setContractData] = useState<ContractData>({
    contractId: BigInt(0)
  });

  const handleContractCreated = (contractId: bigint, data: {
    projectName: string;
    totalAmount: string;
  }) => {
    setContractData({
      contractId,
      projectName: data.projectName,
      totalAmount: data.totalAmount
    });
    setStage("bid");
  };

  const handleBidSubmitted = (data: {
    amount: string;
    timeline: string;
    technicalDetails: string;
  }) => {
    setStage("transaction");
  };

  const renderStageIndicator = () => {
    return (
      <div className="flex justify-center mb-8">
        <div className="flex items-center space-x-4">
          <div className={`flex items-center ${stage === "create" ? "text-blue-400" : "text-gray-600"}`}>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center border ${
                stage === "create" 
                  ? "border-blue-500 bg-blue-500/10 text-blue-400" 
                  : "border-gray-800 bg-gray-900 text-gray-600"
              }`}
            >
              1
            </div>
            <span className="ml-2 text-sm font-medium">Create Contract</span>
          </div>
          <div className="w-16 h-px bg-gray-800" />
          <div className={`flex items-center ${stage === "bid" ? "text-blue-400" : "text-gray-600"}`}>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center border ${
                stage === "bid"
                  ? "border-blue-500 bg-blue-500/10 text-blue-400"
                  : "border-gray-800 bg-gray-900 text-gray-600"
              }`}
            >
              2
            </div>
            <span className="ml-2 text-sm font-medium">Submit Bid</span>
          </div>
          <div className="w-16 h-px bg-gray-800" />
          <div className={`flex items-center ${stage === "transaction" ? "text-blue-400" : "text-gray-600"}`}>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center border ${
                stage === "transaction"
                  ? "border-blue-500 bg-blue-500/10 text-blue-400"
                  : "border-gray-800 bg-gray-900 text-gray-600"
              }`}
            >
              3
            </div>
            <span className="ml-2 text-sm font-medium">Transaction Verification</span>
          </div>
        </div>
      </div>
    );
  };

  const renderCurrentStage = () => {
    switch (stage) {
      case "create":
        return <ContractInitializer onSubmit={handleContractCreated} />;
      case "bid":
        return (
          <BidForm
            contractId={contractData.contractId}
            onSubmit={handleBidSubmitted}
          />
        );
      case "transaction":
        return (
          <TransactionVerification
            contractId={contractData.contractId}
          />
        );
      default:
        return null;
    }
  };

  const renderStageTitle = () => {
    switch (stage) {
      case "create":
        return "Create Construction Contract";
      case "bid":
        return `Submit Bid for ${contractData.projectName || "Project"}`;
      case "transaction":
        return "Verify Transaction";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Navigation */}
      <nav className="border-b border-gray-800 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold">BuildChain</div>
          <ConnectButton
            client={client}
            appMetadata={{
              name: "BuildChain",
              url: window.location.origin,
            }}
          />
        </div>
      </nav>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            {renderStageTitle()}
          </h1>
          {renderStageIndicator()}
          <div className="max-w-2xl mx-auto">
            {renderCurrentStage()}
          </div>
        </div>
      </div>
    </div>
  );
}