import BidForm from "@/components/BidForm"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function SubmitBid() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="p-6 border-b">
        <nav className="container mx-auto flex justify-between items-center">
          <Link href="/">
            <h1 className="text-2xl font-bold">Transparent Contracts</h1>
          </Link>
          <Link href="/">
            <Button variant="outline">Back to Home</Button>
          </Link>
        </nav>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold mb-8">Submit Your Bid</h2>
        <BidForm />
      </main>

      <footer className="border-t p-6">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          © 2023 Transparent Construction Contracts. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

