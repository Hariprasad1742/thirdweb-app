"use client"

import { useState } from "react"
import Link from "next/link"
import BidForm from "@/components/BidForm"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function CreateContractPage() {
  const handleBidSubmission = (bidData: any) => {
    const bidId = `BID-${Date.now()}`
    const contractData = {
      bidId,
      ...bidData.basicInfo,
      inflationProtection: bidData.inflationProtection,
      paymentSchedule: bidData.paymentSchedule.map((milestone: any) => ({
        ...milestone,
        amount: (parseFloat(bidData.basicInfo.bidAmount) * milestone.percentage) / 100,
        completed: false
      }))
    }
    
    // Store contract data in localStorage for now
    localStorage.setItem(`contract-${bidId}`, JSON.stringify(contractData))
    
    // Use window.location for navigation after storing data
    window.location.href = `/contract?bidId=${bidId}`
  }

  return (
    <div className="container mx-auto py-8">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Stage 1: Create New Construction Contract</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center">
            <BidForm onSubmit={handleBidSubmission} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}