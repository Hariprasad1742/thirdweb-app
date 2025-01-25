"use client"

import { useState } from "react"
import BidForm from "@/components/BidForm"
import ApprovalWorkflow from "@/components/ApprovalWorkflow"
import TransactionVerification from "@/components/TransactionVerification"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type ContractStage = "bid" | "approval" | "transaction"

interface ContractState {
  bidId?: string
  builderName?: string
  agencyName?: string
  projectName?: string
  projectDescription?: string
  bidAmount?: string
  estimatedTimeline?: string
  inflationProtection?: {
    usePrePayment: boolean
    inflationClauseEnabled: boolean
    inflationPercentage: string
  }
  paymentSchedule?: {
    description: string
    percentage: number
    amount: number
    completed: boolean
  }[]
}

export default function ContractPage() {
  const [stage, setStage] = useState<ContractStage>("bid")
  const [contractState, setContractState] = useState<ContractState>({})

  const handleBidSubmission = (bidData: any) => {
    const bidId = `BID-${Date.now()}`
    const paymentSchedule = bidData.paymentSchedule.map((milestone: any) => ({
      ...milestone,
      amount: (parseFloat(bidData.basicInfo.bidAmount) * milestone.percentage) / 100,
      completed: false
    }))

    setContractState({
      bidId,
      ...bidData.basicInfo,
      inflationProtection: bidData.inflationProtection,
      paymentSchedule
    })
    setStage("approval")
  }

  const handleApprovalComplete = () => {
    setStage("transaction")
  }

  const renderStageIndicator = () => {
    return (
      <div className="flex justify-center mb-8">
        <div className="flex items-center space-x-4">
          <div className={`flex items-center ${stage === "bid" ? "text-blue-500" : "text-gray-500"}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
              stage === "bid" ? "border-blue-500 bg-blue-50" : "border-gray-300"
            }`}>
              1
            </div>
            <span className="ml-2">Bid Submission</span>
          </div>
          <div className="w-16 h-0.5 bg-gray-300" />
          <div className={`flex items-center ${stage === "approval" ? "text-blue-500" : "text-gray-500"}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
              stage === "approval" ? "border-blue-500 bg-blue-50" : "border-gray-300"
            }`}>
              2
            </div>
            <span className="ml-2">Approval Process</span>
          </div>
          <div className="w-16 h-0.5 bg-gray-300" />
          <div className={`flex items-center ${stage === "transaction" ? "text-blue-500" : "text-gray-500"}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
              stage === "transaction" ? "border-blue-500 bg-blue-50" : "border-gray-300"
            }`}>
              3
            </div>
            <span className="ml-2">Transaction Verification</span>
          </div>
        </div>
      </div>
    )
  }

  const renderCurrentStage = () => {
    switch (stage) {
      case "bid":
        return <BidForm onSubmit={handleBidSubmission} />
      case "approval":
        return (
          <ApprovalWorkflow
            bidDetails={{
              bidId: contractState.bidId!,
              builderName: contractState.builderName!,
              agencyName: contractState.agencyName!,
              projectName: contractState.projectName!,
              bidAmount: contractState.bidAmount!,
              inflationProtection: contractState.inflationProtection!,
              paymentSchedule: contractState.paymentSchedule!
            }}
            onComplete={handleApprovalComplete}
          />
        )
      case "transaction":
        return (
          <TransactionVerification
            contractDetails={{
              bidId: contractState.bidId!,
              totalAmount: parseFloat(contractState.bidAmount!),
              inflationProtection: {
                usePrePayment: contractState.inflationProtection!.usePrePayment,
                inflationClauseEnabled: contractState.inflationProtection!.inflationClauseEnabled,
                inflationPercentage: parseFloat(contractState.inflationProtection!.inflationPercentage)
              },
              paymentSchedule: contractState.paymentSchedule!
            }}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto py-8">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Construction Contract Management</CardTitle>
        </CardHeader>
        <CardContent>
          {renderStageIndicator()}
          <div className="flex justify-center">
            {renderCurrentStage()}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}