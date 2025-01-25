import { ConnectButton } from "thirdweb/react";
import { client } from "../client";

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
        <h1 className="text-4xl font-bold mb-8">Begin Your Process</h1>
        <p className="text-zinc-400 mb-8">
          This page will contain the implementation of the three stages.
        </p>
        
        {/* Placeholder for future implementation */}
        <div className="bg-zinc-900 p-8 rounded-lg border border-zinc-800">
          <p className="text-center text-zinc-500">
            Stage implementation coming soon...
          </p>
        </div>
      </div>
    </div>
  );
}