"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const products = [
  "3-Eye Solar Light",
  "4-Eye Solar Light",
  "3 Lens 4G Solar Camera",
  "2 Lens 4G Solar Camera",
]

const paymentTypes = ["Cash", "Transfer", "Debt"]

export function SalesForm() {
  const [product, setProduct] = useState("")
  const [quantity, setQuantity] = useState("")
  const [paymentType, setPaymentType] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // No backend logic as requested
    alert(`Sale recorded:\nProduct: ${product}\nQuantity: ${quantity}\nPayment: ${paymentType}`)
    setProduct("")
    setQuantity("")
    setPaymentType("")
  }

  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>Record Sale</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="product">Product</Label>
            <Select value={product} onValueChange={setProduct}>
              <SelectTrigger id="product">
                <SelectValue placeholder="Select a product" />
              </SelectTrigger>
              <SelectContent>
                {products.map((p) => (
                  <SelectItem key={p} value={p}>
                    {p}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              min="1"
              placeholder="Enter quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="payment">Payment Type</Label>
            <Select value={paymentType} onValueChange={setPaymentType}>
              <SelectTrigger id="payment">
                <SelectValue placeholder="Select payment type" />
              </SelectTrigger>
              <SelectContent>
                {paymentTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full">
            Submit Sale
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
