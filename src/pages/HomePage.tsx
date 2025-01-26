import { ConnectButton } from "thirdweb/react";
import { client } from "../client";
import { Link } from "react-router-dom";

export function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="border-b border-zinc-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold">BuildChain</div>
          <ConnectButton
            client={client}
            appMetadata={{
              name: "BuildChain",
              url: "https://example.com",
            }}
          />
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#3b82f6,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#8b5cf6,transparent_50%)]" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-lg">
              Transparent Construction Contracts on the Blockchain
            </h1>
            <p className="text-xl text-zinc-400 mb-12 max-w-2xl mx-auto">
              Secure, transparent, and inflation-protected construction contracts with multi-level approvals and blockchain verification.
            </p>
            <div className="flex justify-center gap-4">
              <Link 
                to="/begin" 
                className="inline-block bg-white text-black px-8 py-4 rounded-full text-lg font-semibold hover:bg-zinc-200 transition-colors"
              >
                Start New Contract
              </Link>
              <a 
                href="#features" 
                className="inline-block bg-transparent border border-zinc-700 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-zinc-900 transition-colors"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-colors group">
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Blockchain Verification</h3>
              <p className="text-zinc-400">
                Every contract and transaction is verified and recorded on the blockchain for complete transparency.
              </p>
            </div>

            <div className="p-6 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-colors group">
              <div className="w-12 h-12 rounded-lg bg-purple-500/10 text-purple-500 flex items-center justify-center mb-4 group-hover:bg-purple-500/20 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Inflation Protection</h3>
              <p className="text-zinc-400">
                Built-in inflation protection with pre-payment options and adjustable clauses.
              </p>
            </div>

            <div className="p-6 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-colors group">
              <div className="w-12 h-12 rounded-lg bg-pink-500/10 text-pink-500 flex items-center justify-center mb-4 group-hover:bg-pink-500/20 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Multi-Level Approval</h3>
              <p className="text-zinc-400">
                Five-level approval process ensuring thorough verification at every stage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-24 bg-zinc-900/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Three-Stage Contract Management</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-colors">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-xl font-bold mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Bid Submission</h3>
              <p className="text-zinc-400">
                Submit construction bids with detailed project information and inflation protection options.
              </p>
            </div>

            <div className="p-6 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-colors">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center text-xl font-bold mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Approval Process</h3>
              <p className="text-zinc-400">
                Five-level approval workflow including technical, financial, and legal verification.
              </p>
            </div>

            <div className="p-6 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-colors">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-pink-600 flex items-center justify-center text-xl font-bold mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Transaction Verification</h3>
              <p className="text-zinc-400">
                Blockchain-based payment tracking and milestone verification system.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Trusted Blockchain Technology</h2>
            <p className="text-zinc-400 mb-8">
              Built on secure blockchain infrastructure, ensuring transparency and immutability for all construction contracts.
            </p>
            <Link 
              to="/begin" 
              className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Get Started Now
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-8">
        <div className="container mx-auto px-4 text-center text-zinc-500">
          Powered by ThirdWeb SDK • Secure Blockchain Infrastructure
        </div>
      </footer>
    </div>
  );
}