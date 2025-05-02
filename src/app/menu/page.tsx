"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

const menuItems = [
  {
    id: 1,
    name: "Strawberry Delight",
    price: 8.9,
    image: "/placeholder.svg?height=200&width=200",
    description: "Fresh strawberries with whipped cream on a delicious crepe base.",
    category: "sweet",
  },
  {
    id: 2,
    name: "Banana Chocolate",
    price: 7.9,
    image: "/placeholder.svg?height=200&width=200",
    description: "Sliced banana with rich chocolate sauce on a warm crepe.",
    category: "sweet",
  },
  {
    id: 3,
    name: "Matcha Special",
    price: 9.5,
    image: "/placeholder.svg?height=200&width=200",
    description: "Premium matcha with sweet red bean paste folded in a soft crepe.",
    category: "sweet",
  },
  {
    id: 4,
    name: "Teriyaki Chicken",
    price: 10.9,
    image: "/placeholder.svg?height=200&width=200",
    description: "Grilled chicken with teriyaki sauce and fresh vegetables.",
    category: "savory",
  },
  {
    id: 5,
    name: "Smoked Salmon",
    price: 11.9,
    image: "/placeholder.svg?height=200&width=200",
    description: "Smoked salmon with cream cheese and fresh herbs.",
    category: "savory",
  },
  {
    id: 6,
    name: "Egg & Cheese",
    price: 9.9,
    image: "/placeholder.svg?height=200&width=200",
    description: "Scrambled eggs with melted cheese and a touch of herbs.",
    category: "savory",
  },
]

export default function MenuPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      <header className="sticky top-0 z-10 bg-white p-4 shadow-sm">
        <h1 className="text-2xl font-bold text-pink-600">Crepe Menu</h1>
      </header>

      <main className="p-4">
        <div className="mb-8">
          <h2 className="mb-4 text-xl font-semibold">Sweet Crepes</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {menuItems
              .filter((item) => item.category === "sweet")
              .map((item) => (
                <Link key={item.id} href={`/menu/${item.id}`}>
                  <Card className="transition-transform hover:scale-[1.02]">
                    <CardContent className="p-4">
                      <div className="mb-3 h-40 overflow-hidden rounded-lg">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                        {item.description}
                      </p>
                      <p className="mt-2 font-medium">${item.price.toFixed(2)}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-xl font-semibold">Savory Crepes</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {menuItems
              .filter((item) => item.category === "savory")
              .map((item) => (
                <Link key={item.id} href={`/menu/${item.id}`}>
                  <Card className="transition-transform hover:scale-[1.02]">
                    <CardContent className="p-4">
                      <div className="mb-3 h-40 overflow-hidden rounded-lg">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                        {item.description}
                      </p>
                      <p className="mt-2 font-medium">${item.price.toFixed(2)}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
          </div>
        </div>
      </main>
    </div>
  )
} 