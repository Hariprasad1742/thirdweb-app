"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function BidForm() {
  const [builderName, setBuilderName] = useState("")
  const [agencyName, setAgencyName] = useState("")
  const [bidAmount, setBidAmount] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to a server
    console.log({ builderName, agencyName, bidAmount })
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Submission Successful</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Thank you for your bid submission!</p>
        </CardContent>
        <CardFooter>
          <Button onClick={() => setSubmitted(false)}>Submit Another Bid</Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Submit Your Bid</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="builderName">Builder Name</Label>
            <Input id="builderName" value={builderName} onChange={(e) => setBuilderName(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="agencyName">Agency Name</Label>
            <Input id="agencyName" value={agencyName} onChange={(e) => setAgencyName(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bidAmount">Bid Amount</Label>
            <Input
              id="bidAmount"
              type="number"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Submit Bid
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

