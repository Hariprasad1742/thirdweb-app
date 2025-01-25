import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Building, FileText, Shield } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="p-6 border-b">
        <nav className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Transparent Contracts</h1>
          <Link href="/submit-bid">
            <Button>Submit a Bid</Button>
          </Link>
        </nav>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Transparent Construction Contracts</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Revolutionizing the construction industry with clear, fair, and efficient contract processes.
          </p>
        </section>

        <section className="grid md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader>
              <Building className="w-10 h-10 mb-2 text-primary" />
              <CardTitle>Streamlined Process</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Simplify your construction projects with our transparent bidding and contract system.
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <FileText className="w-10 h-10 mb-2 text-primary" />
              <CardTitle>Clear Documentation</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                All contracts and bids are clearly documented and easily accessible to all parties involved.
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Shield className="w-10 h-10 mb-2 text-primary" />
              <CardTitle>Increased Trust</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Build stronger relationships with clients and contractors through our transparent system.
              </CardDescription>
            </CardContent>
          </Card>
        </section>

        <section className="text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to get started?</h3>
          <Link href="/submit-bid">
            <Button size="lg" className="mt-2">
              Submit a Bid <ArrowRight className="ml-2" />
            </Button>
          </Link>
        </section>
      </main>

      <footer className="border-t p-6">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          © 2023 Transparent Construction Contracts. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

