import { ConnectButton } from "thirdweb/react";
import { client } from "../client";
import { Link } from "react-router-dom";

export function HomePage() {
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

      {/* Hero Section */}
      <section className="py-24 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
            Streamline Your Process
          </h1>
          <p className="text-xl text-zinc-400 mb-12 max-w-2xl mx-auto">
            Complete your process in three simple stages. Fast, efficient, and secure.
          </p>
          <Link 
            to="/begin" 
            className="inline-block bg-white text-black px-8 py-4 rounded-full text-lg font-semibold hover:bg-zinc-200 transition-colors"
          >
            Begin Process
          </Link>
        </div>
      </section>

      {/* Stages Section */}
      <section className="py-24 bg-zinc-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Three Simple Stages</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Stage 1 */}
            <div className="p-6 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-colors">
              <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-xl font-bold mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Initial Selection</h3>
              <p className="text-zinc-400">
                Choose your preferences and set up your initial configuration.
              </p>
            </div>

            {/* Stage 2 */}
            <div className="p-6 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-colors">
              <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center text-xl font-bold mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Process Configuration</h3>
              <p className="text-zinc-400">
                Configure your process settings and parameters.
              </p>
            </div>

            {/* Stage 3 */}
            <div className="p-6 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-colors">
              <div className="w-12 h-12 rounded-full bg-pink-500 flex items-center justify-center text-xl font-bold mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Final Review</h3>
              <p className="text-zinc-400">
                Review your selections and complete the process.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-8">
        <div className="container mx-auto px-4 text-center text-zinc-500">
          Powered by ThirdWeb SDK
        </div>
      </footer>
    </div>
  );
}