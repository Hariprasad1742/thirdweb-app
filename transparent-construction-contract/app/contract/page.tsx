"use client"

import { useState, useEffect } from "react"
import ApprovalWorkflow from "@/components/ApprovalWorkflow"
import TransactionVerification from "@/components/TransactionVerification"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type ContractStage = "approval" | "transaction"

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
  const [stage, setStage] = useState<ContractStage>("approval")
  const [contractState, setContractState] = useState<ContractState>({})

  useEffect(() => {
    // Get bidId from URL parameters
    const params = new URLSearchParams(window.location.search)
    const bidId = params.get('bidId')
    
    if (bidId) {
      // Load contract data from localStorage
      const contractData = localStorage.getItem(`contract-${bidId}`)
      if (contractData) {
        setContractState(JSON.parse(contractData))
      }
    }
  }, [])

  const handleApprovalComplete = () => {
    setStage("transaction")
  }

  const renderStageIndicator = () => {
    return (
      <div className="flex justify-center mb-8">
        <div className="flex items-center space-x-4">
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
    if (!contractState.bidId) {
      return (
        <div className="text-center">
          <p className="text-red-500">No contract data found. Please create a contract first.</p>
          <a href="/create-contract" className="text-blue-500 hover:underline mt-4 block">
            Go to Contract Creation
          </a>
        </div>
      )
    }

    switch (stage) {
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
          <CardTitle>Contract Approval and Verification</CardTitle>
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