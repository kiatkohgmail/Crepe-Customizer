"use client"

import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function CartPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      <header className="sticky top-0 z-10 bg-white p-4 shadow-sm">
        <div className="flex items-center">
          <Link href="/menu" className="mr-2">
            <ChevronLeft className="h-5 w-5 text-pink-600" />
          </Link>
          <h1 className="text-xl font-bold text-pink-600">Shopping Cart</h1>
        </div>
      </header>

      <main className="p-4">
        <Card>
          <CardContent className="p-6">
            <p className="text-center text-gray-500">Your cart is empty</p>
            <div className="mt-4 text-center">
              <Link href="/menu">
                <Button>Continue Shopping</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
} 