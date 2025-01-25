import { ConnectButton } from "thirdweb/react";
import { client } from "../client";
import { Link } from "react-router-dom";

export function BeginPage() {
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
        <h1 className="text-4xl font-bold mb-8">Construction Contract Management</h1>
        <p className="text-zinc-400 mb-8">
          Manage your construction contracts with blockchain-powered verification and multi-level approvals.
        </p>
        
        <div className="flex justify-center">
          <Link
            to="/contract"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            Start New Contract
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
            <h3 className="text-xl font-semibold mb-4">Bid Submission</h3>
            <p className="text-zinc-400">
              Submit construction bids with detailed project information, inflation protection, and payment schedules.
            </p>
          </div>

          <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
            <h3 className="text-xl font-semibold mb-4">5-Level Approval</h3>
            <p className="text-zinc-400">
              Secure approval process through technical, financial, legal, department head, and executive reviews.
            </p>
          </div>

          <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
            <h3 className="text-xl font-semibold mb-4">Transaction Verification</h3>
            <p className="text-zinc-400">
              Track and verify payments with blockchain-based records and inflation adjustments.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}