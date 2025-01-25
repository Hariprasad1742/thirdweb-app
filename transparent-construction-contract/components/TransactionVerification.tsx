"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

interface Transaction {
  id: string
  milestoneIndex: number
  amount: number
  timestamp: string
  status: "pending" | "verified" | "disputed"
  inflationAdjustment?: number
}

interface ContractDetails {
  bidId: string
  totalAmount: number
  inflationProtection: {
    usePrePayment: boolean
    inflationClauseEnabled: boolean
    inflationPercentage: number
  }
  paymentSchedule: {
    description: string
    percentage: number
    amount: number
    completed: boolean
  }[]
}

export default function TransactionVerification({ contractDetails }: { contractDetails: ContractDetails }) {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [newAmount, setNewAmount] = useState("")
  const [selectedMilestone, setSelectedMilestone] = useState(0)

  const handleAddTransaction = () => {
    const amount = parseFloat(newAmount)
    if (isNaN(amount)) return

    const milestone = contractDetails.paymentSchedule[selectedMilestone]
    let adjustedAmount = amount

    // Calculate inflation adjustment if enabled
    if (contractDetails.inflationProtection.inflationClauseEnabled) {
      const maxAdjustment = milestone.amount * (contractDetails.inflationProtection.inflationPercentage / 100)
      if (Math.abs(amount - milestone.amount) > maxAdjustment) {
        alert("Amount exceeds allowed inflation adjustment range")
        return
      }
      adjustedAmount = amount
    }

    const newTransaction: Transaction = {
      id: `TXN-${Date.now()}`,
      milestoneIndex: selectedMilestone,
      amount: adjustedAmount,
      timestamp: new Date().toISOString(),
      status: "pending",
      inflationAdjustment: adjustedAmount - milestone.amount
    }

    setTransactions([...transactions, newTransaction])
    setNewAmount("")
  }

  const verifyTransaction = (transactionId: string) => {
    const updatedTransactions = transactions.map(txn => {
      if (txn.id === transactionId) {
        const milestone = contractDetails.paymentSchedule[txn.milestoneIndex]
        milestone.completed = true
        return { ...txn, status: "verified" as const }
      }
      return txn
    })
    setTransactions(updatedTransactions)
  }

  const disputeTransaction = (transactionId: string) => {
    setTransactions(
      transactions.map(txn =>
        txn.id === transactionId ? { ...txn, status: "disputed" } : txn
      )
    )
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return <Badge className="bg-green-500">Verified</Badge>
      case "disputed":
        return <Badge className="bg-red-500">Disputed</Badge>
      default:
        return <Badge className="bg-yellow-500">Pending</Badge>
    }
  }

  const calculateTotalPaid = () => {
    return transactions
      .filter(txn => txn.status === "verified")
      .reduce((sum, txn) => sum + txn.amount, 0)
  }

  return (
    <Card className="w-[800px]">
      <CardHeader>
        <CardTitle>Transaction Verification</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Contract Summary */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Contract Summary</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="font-medium">Contract ID:</span> {contractDetails.bidId}
              </div>
              <div>
                <span className="font-medium">Total Amount:</span> ₹{contractDetails.totalAmount}
              </div>
              <div>
                <span className="font-medium">Total Paid:</span> ₹{calculateTotalPaid()}
              </div>
              <div>
                <span className="font-medium">Remaining:</span> ₹
                {contractDetails.totalAmount - calculateTotalPaid()}
              </div>
            </div>
          </div>

          <Separator />

          {/* New Transaction */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Record New Transaction</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="milestone">Payment Milestone</Label>
                <select
                  id="milestone"
                  className="w-full p-2 border rounded"
                  value={selectedMilestone}
                  onChange={(e) => setSelectedMilestone(Number(e.target.value))}
                >
                  {contractDetails.paymentSchedule.map((milestone, index) => (
                    <option key={index} value={index} disabled={milestone.completed}>
                      {milestone.description} (₹{milestone.amount})
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Amount (₹)</Label>
                <Input
                  id="amount"
                  type="number"
                  value={newAmount}
                  onChange={(e) => setNewAmount(e.target.value)}
                  placeholder="Enter amount"
                />
              </div>
            </div>
            <Button
              className="w-full bg-blue-500 hover:bg-blue-600"
              onClick={handleAddTransaction}
            >
              Record Transaction
            </Button>
          </div>

          <Separator />

          {/* Transaction History */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Transaction History</h3>
            <div className="space-y-4">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="p-4 rounded-lg border"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">
                        {contractDetails.paymentSchedule[transaction.milestoneIndex].description}
                      </h4>
                      <p className="text-sm text-gray-500">
                        Amount: ₹{transaction.amount}
                        {transaction.inflationAdjustment !== 0 && (
                          <span className="ml-2">
                            (Adjustment: ₹{transaction.inflationAdjustment})
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(transaction.timestamp).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      {getStatusBadge(transaction.status)}
                      {transaction.status === "pending" && (
                        <div className="space-x-2">
                          <Button
                            className="border border-red-500 bg-transparent text-red-500 hover:bg-red-50 px-3 py-1 text-sm"
                            onClick={() => disputeTransaction(transaction.id)}
                          >
                            Dispute
                          </Button>
                          <Button
                            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 text-sm"
                            onClick={() => verifyTransaction(transaction.id)}
                          >
                            Verify
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}