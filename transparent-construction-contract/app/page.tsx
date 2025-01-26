import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Building, FileText, Shield } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="p-6 border-b">
        <nav className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Transparent Contracts</h1>
          <div className="space-x-4">
            <a href="/create-contract">
              <Button className="bg-transparent border hover:bg-gray-100">Create Contract</Button>
            </a>
            <a href="/contract">
              <Button className="bg-primary">View & Approve Contracts</Button>
            </a>
          </div>
        </nav>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Transparent Construction Contracts</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Revolutionizing the construction industry with clear, fair, and efficient contract processes.
          </p>
        </section>

        <section className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="text-center">
            <CardHeader>
              <FileText className="w-12 h-12 mb-2 text-primary mx-auto" />
              <CardTitle className="text-2xl">Stage 1: Contract Creation</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-lg mb-6">
                Start here to create a new construction contract. Submit project details, 
                payment schedules, and inflation protection measures.
              </CardDescription>
              <a href="/create-contract">
                <Button className="px-6 py-3 text-lg">
                  Create New Contract <ArrowRight className="ml-2" />
                </Button>
              </a>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Shield className="w-12 h-12 mb-2 text-primary mx-auto" />
              <CardTitle className="text-2xl">Stages 2 & 3: Approval & Verification</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-lg mb-6">
                Review and approve contracts, then proceed with transaction verification 
                and payment scheduling.
              </CardDescription>
              <a href="/contract">
                <Button className="px-6 py-3 text-lg">
                  View & Approve Contracts <ArrowRight className="ml-2" />
                </Button>
              </a>
            </CardContent>
          </Card>
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
      </main>

      <footer className="border-t p-6">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          © 2024 Transparent Construction Contracts. All rights reserved.
        </div>
      </footer>
    </div>
  )
}