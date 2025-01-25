import { useState } from "react";

interface PaymentMilestone {
  description: string;
  percentage: number;
}

interface BidFormProps {
  onSubmit: (data: {
    basicInfo: {
      builderName: string;
      agencyName: string;
      projectName: string;
      projectDescription: string;
      bidAmount: string;
      estimatedTimeline: string;
    };
    inflationProtection: {
      usePrePayment: boolean;
      inflationClauseEnabled: boolean;
      inflationPercentage: string;
    };
    paymentSchedule: PaymentMilestone[];
  }) => void;
}

export function BidForm({ onSubmit }: BidFormProps) {
  // Basic Information
  const [builderName, setBuilderName] = useState("");
  const [agencyName, setAgencyName] = useState("");
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [bidAmount, setBidAmount] = useState("");
  const [estimatedTimeline, setEstimatedTimeline] = useState("");
  
  // Inflation Protection
  const [usePrePayment, setUsePrePayment] = useState(false);
  const [inflationClauseEnabled, setInflationClauseEnabled] = useState(false);
  const [inflationPercentage, setInflationPercentage] = useState("20");
  
  // Payment Schedule
  const [paymentMilestones, setPaymentMilestones] = useState<PaymentMilestone[]>([
    { description: "Project Initiation", percentage: 20 },
    { description: "Foundation Complete", percentage: 30 },
    { description: "Structure Complete", percentage: 30 },
    { description: "Final Completion", percentage: 20 }
  ]);
  
  // Terms
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptedTerms) {
      alert("Please accept the terms and conditions");
      return;
    }
    onSubmit({
      basicInfo: {
        builderName,
        agencyName,
        projectName,
        projectDescription,
        bidAmount,
        estimatedTimeline
      },
      inflationProtection: {
        usePrePayment,
        inflationClauseEnabled,
        inflationPercentage
      },
      paymentSchedule: paymentMilestones
    });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-zinc-900 p-8 rounded-lg border border-zinc-800 w-[800px]">
        <h2 className="text-2xl font-bold mb-4">Bid Submission Successful</h2>
        <p className="text-zinc-400 mb-4">
          Thank you for your bid submission! Your bid has been recorded and will go through the approval process.
        </p>
        <p className="text-sm text-zinc-500">
          Please keep your bid reference number for future correspondence.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit Another Bid
        </button>
      </div>
    );
  }

  return (
    <div className="bg-zinc-900 p-8 rounded-lg border border-zinc-800 w-[800px]">
      <h2 className="text-2xl font-bold mb-6">Submit Construction Bid</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Basic Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium">Builder Name</label>
              <input
                type="text"
                value={builderName}
                onChange={(e) => setBuilderName(e.target.value)}
                required
                className="w-full p-2 bg-zinc-800 rounded border border-zinc-700"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium">Agency Name</label>
              <input
                type="text"
                value={agencyName}
                onChange={(e) => setAgencyName(e.target.value)}
                required
                className="w-full p-2 bg-zinc-800 rounded border border-zinc-700"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Project Name</label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              required
              className="w-full p-2 bg-zinc-800 rounded border border-zinc-700"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Project Description</label>
            <textarea
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              required
              className="w-full p-2 bg-zinc-800 rounded border border-zinc-700 h-24"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium">Base Bid Amount (₹)</label>
              <input
                type="number"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                required
                className="w-full p-2 bg-zinc-800 rounded border border-zinc-700"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium">Estimated Timeline (months)</label>
              <input
                type="number"
                value={estimatedTimeline}
                onChange={(e) => setEstimatedTimeline(e.target.value)}
                required
                className="w-full p-2 bg-zinc-800 rounded border border-zinc-700"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Inflation Protection</h3>
          <div className="flex items-center space-x-8">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={usePrePayment}
                onChange={(e) => setUsePrePayment(e.target.checked)}
                className="form-checkbox"
              />
              <span>Enable Pre-payment Option</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={inflationClauseEnabled}
                onChange={(e) => setInflationClauseEnabled(e.target.checked)}
                className="form-checkbox"
              />
              <span>Enable Inflation Clause</span>
            </label>
          </div>
          {inflationClauseEnabled && (
            <div className="space-y-2">
              <label className="block text-sm font-medium">
                Inflation Adjustment Range (%)
              </label>
              <input
                type="number"
                value={inflationPercentage}
                onChange={(e) => setInflationPercentage(e.target.value)}
                max="50"
                min="1"
                className="w-full p-2 bg-zinc-800 rounded border border-zinc-700"
              />
            </div>
          )}
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Payment Schedule</h3>
          <div className="space-y-4">
            {paymentMilestones.map((milestone, index) => (
              <div key={index} className="grid grid-cols-2 gap-4">
                <input
                  value={milestone.description}
                  onChange={(e) => {
                    const newMilestones = [...paymentMilestones];
                    newMilestones[index].description = e.target.value;
                    setPaymentMilestones(newMilestones);
                  }}
                  placeholder="Milestone Description"
                  className="w-full p-2 bg-zinc-800 rounded border border-zinc-700"
                />
                <input
                  type="number"
                  value={milestone.percentage}
                  onChange={(e) => {
                    const newMilestones = [...paymentMilestones];
                    newMilestones[index].percentage = Number(e.target.value);
                    setPaymentMilestones(newMilestones);
                  }}
                  placeholder="Percentage"
                  className="w-full p-2 bg-zinc-800 rounded border border-zinc-700"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              required
              className="form-checkbox"
            />
            <span>
              I accept the terms and conditions and understand this will initiate a blockchain contract
            </span>
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          Submit Bid for Approval
        </button>
      </form>
    </div>
  );
}