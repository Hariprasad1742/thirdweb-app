"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface ApprovalLevel {
  level: number
  title: string
  approver: string
  status: "pending" | "approved" | "rejected"
  timestamp?: string
  comments?: string
}

interface BidDetails {
  bidId: string
  builderName: string
  agencyName: string
  projectName: string
  bidAmount: string
  inflationProtection: {
    usePrePayment: boolean
    inflationClauseEnabled: boolean
    inflationPercentage: string
  }
  paymentSchedule: {
    description: string
    percentage: number
  }[]
}

interface ApprovalWorkflowProps {
  bidDetails: BidDetails
  onComplete: () => void
}

export default function ApprovalWorkflow({ bidDetails, onComplete }: ApprovalWorkflowProps) {
  const [approvalLevels, setApprovalLevels] = useState<ApprovalLevel[]>([
    {
      level: 1,
      title: "Initial Technical Review",
      approver: "Technical Officer",
      status: "pending"
    },
    {
      level: 2,
      title: "Financial Assessment",
      approver: "Financial Officer",
      status: "pending"
    },
    {
      level: 3,
      title: "Legal Compliance",
      approver: "Legal Officer",
      status: "pending"
    },
    {
      level: 4,
      title: "Department Head Review",
      approver: "Department Head",
      status: "pending"
    },
    {
      level: 5,
      title: "Final Executive Approval",
      approver: "Executive Officer",
      status: "pending"
    }
  ])

  const [currentLevel, setCurrentLevel] = useState(1)

  const handleApproval = (level: number, status: "approved" | "rejected") => {
    const newApprovalLevels = [...approvalLevels]
    const levelIndex = level - 1
    
    newApprovalLevels[levelIndex] = {
      ...newApprovalLevels[levelIndex],
      status,
      timestamp: new Date().toISOString()
    }
    
    setApprovalLevels(newApprovalLevels)
    
    if (status === "approved") {
      if (level < 5) {
        setCurrentLevel(level + 1)
      } else {
        // All levels approved, trigger completion
        onComplete()
      }
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-500">Approved</Badge>
      case "rejected":
        return <Badge className="bg-red-500">Rejected</Badge>
      default:
        return <Badge className="bg-yellow-500">Pending</Badge>
    }
  }

  return (
    <Card className="w-[800px]">
      <CardHeader>
        <CardTitle>Bid Approval Workflow</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Bid Summary */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Bid Summary</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="font-medium">Bid ID:</span> {bidDetails.bidId}
              </div>
              <div>
                <span className="font-medium">Builder:</span> {bidDetails.builderName}
              </div>
              <div>
                <span className="font-medium">Agency:</span> {bidDetails.agencyName}
              </div>
              <div>
                <span className="font-medium">Project:</span> {bidDetails.projectName}
              </div>
              <div>
                <span className="font-medium">Amount:</span> ₹{bidDetails.bidAmount}
              </div>
            </div>
          </div>

          <Separator />

          {/* Approval Levels */}
          <div className="space-y-4">
            {approvalLevels.map((level) => (
              <div
                key={level.level}
                className={`p-4 rounded-lg border ${
                  currentLevel === level.level ? "border-blue-500 bg-blue-50" : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">
                      Level {level.level}: {level.title}
                    </h4>
                    <p className="text-sm text-gray-500">Approver: {level.approver}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    {getStatusBadge(level.status)}
                    {currentLevel === level.level && level.status === "pending" && (
                      <div className="space-x-2">
                        <Button
                          className="border border-red-500 bg-transparent text-red-500 hover:bg-red-50 px-3 py-1 text-sm"
                          onClick={() => handleApproval(level.level, "rejected")}
                        >
                          Reject
                        </Button>
                        <Button
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 text-sm"
                          onClick={() => handleApproval(level.level, "approved")}
                        >
                          Approve
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
                {level.timestamp && (
                  <p className="text-xs text-gray-500 mt-2">
                    {level.status} at: {new Date(level.timestamp).toLocaleString()}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}