"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"

interface PaymentMilestone {
  description: string;
  percentage: number;
}

interface BidFormProps {
  onSubmit: (data: {
    basicInfo: {
      builderName: string
      agencyName: string
      projectName: string
      projectDescription: string
      bidAmount: string
      estimatedTimeline: string
    }
    inflationProtection: {
      usePrePayment: boolean
      inflationClauseEnabled: boolean
      inflationPercentage: string
    }
    paymentSchedule: {
      description: string
      percentage: number
    }[]
  }) => void
}

export default function BidForm({ onSubmit }: BidFormProps) {
  // Basic Information
  const [builderName, setBuilderName] = useState("")
  const [agencyName, setAgencyName] = useState("")
  const [projectName, setProjectName] = useState("")
  const [projectDescription, setProjectDescription] = useState("")
  const [bidAmount, setBidAmount] = useState("")
  const [estimatedTimeline, setEstimatedTimeline] = useState("")
  
  // Inflation Protection
  const [usePrePayment, setUsePrePayment] = useState(false)
  const [inflationClauseEnabled, setInflationClauseEnabled] = useState(false)
  const [inflationPercentage, setInflationPercentage] = useState("20")
  
  // Payment Schedule
  const [paymentMilestones, setPaymentMilestones] = useState<PaymentMilestone[]>([
    { description: "Project Initiation", percentage: 20 },
    { description: "Foundation Complete", percentage: 30 },
    { description: "Structure Complete", percentage: 30 },
    { description: "Final Completion", percentage: 20 }
  ])
  
  // Terms
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!acceptedTerms) {
      alert("Please accept the terms and conditions")
      return
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
    })
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <Card className="w-[800px]">
        <CardHeader>
          <CardTitle>Bid Submission Successful</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Thank you for your bid submission! Your bid has been recorded and will go through the approval process.</p>
          <p className="text-sm text-gray-500 mt-2">Please keep your bid reference number for future correspondence.</p>
        </CardContent>
        <CardFooter>
          <Button onClick={() => setSubmitted(false)}>Submit Another Bid</Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card className="w-[800px]">
      <CardHeader>
        <CardTitle>Submit Construction Bid</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Basic Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="builderName">Builder Name</Label>
                <Input id="builderName" value={builderName} onChange={(e) => setBuilderName(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="agencyName">Agency Name</Label>
                <Input id="agencyName" value={agencyName} onChange={(e) => setAgencyName(e.target.value)} required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="projectName">Project Name</Label>
              <Input id="projectName" value={projectName} onChange={(e) => setProjectName(e.target.value)} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="projectDescription">Project Description</Label>
              <Textarea
                id="projectDescription"
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bidAmount">Base Bid Amount (₹)</Label>
                <Input
                  id="bidAmount"
                  type="number"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="estimatedTimeline">Estimated Timeline (months)</Label>
                <Input
                  id="estimatedTimeline"
                  type="number"
                  value={estimatedTimeline}
                  onChange={(e) => setEstimatedTimeline(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Inflation Protection</h3>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="usePrePayment"
                  checked={usePrePayment}
                  onCheckedChange={setUsePrePayment}
                />
                <Label htmlFor="usePrePayment">Enable Pre-payment Option</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="inflationClause"
                  checked={inflationClauseEnabled}
                  onCheckedChange={setInflationClauseEnabled}
                />
                <Label htmlFor="inflationClause">Enable Inflation Clause</Label>
              </div>
            </div>
            {inflationClauseEnabled && (
              <div className="space-y-2">
                <Label htmlFor="inflationPercentage">Inflation Adjustment Range (%)</Label>
                <Input
                  id="inflationPercentage"
                  type="number"
                  value={inflationPercentage}
                  onChange={(e) => setInflationPercentage(e.target.value)}
                  max="50"
                  min="1"
                />
              </div>
            )}
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Payment Schedule</h3>
            <div className="space-y-4">
              {paymentMilestones.map((milestone, index) => (
                <div key={index} className="grid grid-cols-2 gap-4">
                  <Input
                    value={milestone.description}
                    onChange={(e) => {
                      const newMilestones = [...paymentMilestones]
                      newMilestones[index].description = e.target.value
                      setPaymentMilestones(newMilestones)
                    }}
                    placeholder="Milestone Description"
                  />
                  <Input
                    type="number"
                    value={milestone.percentage}
                    onChange={(e) => {
                      const newMilestones = [...paymentMilestones]
                      newMilestones[index].percentage = Number(e.target.value)
                      setPaymentMilestones(newMilestones)
                    }}
                    placeholder="Percentage"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={acceptedTerms}
                onCheckedChange={(checked: boolean | "indeterminate") => setAcceptedTerms(checked === true)}
                required
              />
              <Label htmlFor="terms">
                I accept the terms and conditions and understand this will initiate a blockchain contract
              </Label>
            </div>
          </div>

          <Button type="submit" className="w-full">
            Submit Bid for Approval
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

