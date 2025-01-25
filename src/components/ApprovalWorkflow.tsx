import { useState } from "react";

interface ApprovalLevel {
  level: number;
  title: string;
  approver: string;
  status: "pending" | "approved" | "rejected";
  timestamp?: string;
  comments?: string;
}

interface BidDetails {
  bidId: string;
  builderName: string;
  agencyName: string;
  projectName: string;
  bidAmount: string;
  inflationProtection: {
    usePrePayment: boolean;
    inflationClauseEnabled: boolean;
    inflationPercentage: string;
  };
  paymentSchedule: {
    description: string;
    percentage: number;
  }[];
}

interface ApprovalWorkflowProps {
  bidDetails: BidDetails;
  onComplete: () => void;
}

export function ApprovalWorkflow({ bidDetails, onComplete }: ApprovalWorkflowProps) {
  const [approvalLevels, setApprovalLevels] = useState<ApprovalLevel[]>([
    {
      level: 1,
      title: "Initial Technical Review",
      approver: "Technical Officer",
      status: "pending"
    },
    {
      level: 2,
      title: "Financial Assessment",
      approver: "Financial Officer",
      status: "pending"
    },
    {
      level: 3,
      title: "Legal Compliance",
      approver: "Legal Officer",
      status: "pending"
    },
    {
      level: 4,
      title: "Department Head Review",
      approver: "Department Head",
      status: "pending"
    },
    {
      level: 5,
      title: "Final Executive Approval",
      approver: "Executive Officer",
      status: "pending"
    }
  ]);

  const [currentLevel, setCurrentLevel] = useState(1);

  const handleApproval = (level: number, status: "approved" | "rejected") => {
    const newApprovalLevels = [...approvalLevels];
    const levelIndex = level - 1;
    
    newApprovalLevels[levelIndex] = {
      ...newApprovalLevels[levelIndex],
      status,
      timestamp: new Date().toISOString()
    };
    
    setApprovalLevels(newApprovalLevels);
    
    if (status === "approved") {
      if (level < 5) {
        setCurrentLevel(level + 1);
      } else {
        onComplete();
      }
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <span className="px-2 py-1 text-sm rounded bg-green-500 text-white">Approved</span>;
      case "rejected":
        return <span className="px-2 py-1 text-sm rounded bg-red-500 text-white">Rejected</span>;
      default:
        return <span className="px-2 py-1 text-sm rounded bg-yellow-500 text-white">Pending</span>;
    }
  };

  return (
    <div className="bg-zinc-900 p-8 rounded-lg border border-zinc-800 w-[800px]">
      <h2 className="text-2xl font-bold mb-6">Bid Approval Workflow</h2>
      
      <div className="space-y-6">
        {/* Bid Summary */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Bid Summary</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="font-medium">Bid ID:</span> {bidDetails.bidId}
            </div>
            <div>
              <span className="font-medium">Builder:</span> {bidDetails.builderName}
            </div>
            <div>
              <span className="font-medium">Agency:</span> {bidDetails.agencyName}
            </div>
            <div>
              <span className="font-medium">Project:</span> {bidDetails.projectName}
            </div>
            <div>
              <span className="font-medium">Amount:</span> ₹{bidDetails.bidAmount}
            </div>
          </div>
        </div>

        <hr className="border-zinc-800" />

        {/* Approval Levels */}
        <div className="space-y-4">
          {approvalLevels.map((level) => (
            <div
              key={level.level}
              className={`p-4 rounded-lg border ${
                currentLevel === level.level
                  ? "border-blue-500 bg-blue-900/20"
                  : "border-zinc-800"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">
                    Level {level.level}: {level.title}
                  </h4>
                  <p className="text-sm text-zinc-400">Approver: {level.approver}</p>
                </div>
                <div className="flex items-center space-x-4">
                  {getStatusBadge(level.status)}
                  {currentLevel === level.level && level.status === "pending" && (
                    <div className="space-x-2">
                      <button
                        className="px-3 py-1 text-sm border border-red-500 text-red-500 hover:bg-red-500/10 rounded"
                        onClick={() => handleApproval(level.level, "rejected")}
                      >
                        Reject
                      </button>
                      <button
                        className="px-3 py-1 text-sm bg-green-500 hover:bg-green-600 text-white rounded"
                        onClick={() => handleApproval(level.level, "approved")}
                      >
                        Approve
                      </button>
                    </div>
                  )}
                </div>
              </div>
              {level.timestamp && (
                <p className="text-xs text-zinc-500 mt-2">
                  {level.status} at: {new Date(level.timestamp).toLocaleString()}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}