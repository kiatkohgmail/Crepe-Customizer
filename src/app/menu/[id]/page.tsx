"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ChevronLeft, ShoppingBag } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

// Sample menu item data
const getItemById = (id: number) => {
  const allItems = [
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

  return allItems.find((item) => item.id === id) || allItems[0]
}

// Add-ons data
const addOns = {
  toppings: [
    { id: "t1", name: "Extra Strawberries", price: 1.5, category: "sweet" },
    { id: "t2", name: "Banana Slices", price: 1.0, category: "sweet" },
    { id: "t3", name: "Blueberries", price: 2.0, category: "sweet" },
    { id: "t4", name: "Whipped Cream", price: 0.8, category: "sweet" },
    { id: "t5", name: "Ice Cream Scoop", price: 2.5, category: "sweet" },
    { id: "t6", name: "Extra Chicken", price: 2.5, category: "savory" },
    { id: "t7", name: "Extra Cheese", price: 1.5, category: "savory" },
    { id: "t8", name: "Avocado", price: 2.0, category: "savory" },
    { id: "t9", name: "Corn", price: 1.0, category: "savory" },
    { id: "t10", name: "Seaweed", price: 0.8, category: "savory" },
  ],
  sauces: [
    { id: "s1", name: "Chocolate Sauce", price: 0.5, category: "sweet" },
    { id: "s2", name: "Caramel Sauce", price: 0.5, category: "sweet" },
    { id: "s3", name: "Strawberry Sauce", price: 0.5, category: "sweet" },
    { id: "s4", name: "Honey", price: 0.5, category: "sweet" },
    { id: "s5", name: "Maple Syrup", price: 0.8, category: "sweet" },
    { id: "s6", name: "Teriyaki Sauce", price: 0.5, category: "savory" },
    { id: "s7", name: "Mayo", price: 0.5, category: "savory" },
    { id: "s8", name: "Spicy Mayo", price: 0.5, category: "savory" },
    { id: "s9", name: "Soy Sauce", price: 0.5, category: "savory" },
    { id: "s10", name: "Wasabi Mayo", price: 0.8, category: "savory" },
  ],
}

export default function ItemDetail({ params }: { params: { id: string } }) {
  const itemId = Number.parseInt(params.id)
  const item = getItemById(itemId)
  const router = useRouter()
  const { toast } = useToast()

  const [selectedToppings, setSelectedToppings] = useState<string[]>([])
  const [selectedSauces, setSelectedSauces] = useState<string[]>([])
  const [quantity, setQuantity] = useState(1)

  // Filter add-ons based on item category
  const availableToppings = addOns.toppings.filter((topping) => topping.category === item.category)
  const availableSauces = addOns.sauces.filter((sauce) => sauce.category === item.category)

  const handleToppingChange = (toppingId: string, checked: boolean) => {
    if (checked) {
      setSelectedToppings([...selectedToppings, toppingId])
    } else {
      setSelectedToppings(selectedToppings.filter((id) => id !== toppingId))
    }
  }

  const handleSauceChange = (sauceId: string, checked: boolean) => {
    if (checked) {
      setSelectedSauces([...selectedSauces, sauceId])
    } else {
      setSelectedSauces(selectedSauces.filter((id) => id !== sauceId))
    }
  }

  const calculateTotalPrice = () => {
    let total = item.price

    // Add topping prices
    selectedToppings.forEach((toppingId) => {
      const topping = availableToppings.find((t) => t.id === toppingId)
      if (topping) {
        total += topping.price
      }
    })

    // Add sauce prices
    selectedSauces.forEach((sauceId) => {
      const sauce = availableSauces.find((s) => s.id === sauceId)
      if (sauce) {
        total += sauce.price
      }
    })

    return total * quantity
  }

  const addToCart = () => {
    // Here you would add the item with selected add-ons to the cart
    // For now, we'll just show a toast and navigate back
    toast({
      title: "Added to cart",
      description: `${item.name} with ${selectedToppings.length} toppings and ${selectedSauces.length} sauces`,
    })

    router.push("/cart")
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-pink-50 to-white">
      <header className="sticky top-0 z-10 bg-white p-4 shadow-sm">
        <div className="flex items-center">
          <Link href="/menu" className="mr-2">
            <ChevronLeft className="h-5 w-5 text-pink-600" />
          </Link>
          <h1 className="text-xl font-bold text-pink-600">Customize Item</h1>
        </div>
      </header>

      <main className="flex-1 p-4">
        <div className="mb-6">
          <div className="mb-4 h-48 w-full overflow-hidden rounded-lg">
            <img src={item.image || "/placeholder.svg"} alt={item.name} className="h-full w-full object-cover" />
          </div>
          <h2 className="text-2xl font-bold">{item.name}</h2>
          <p className="mt-1 text-gray-600">{item.description}</p>
          <p className="mt-2 text-lg font-medium">${item.price.toFixed(2)}</p>
        </div>

        <Card className="mb-4">
          <CardContent className="p-4">
            <h3 className="mb-3 font-medium">Add Extra Toppings</h3>
            <div className="space-y-2">
              {availableToppings.map((topping) => (
                <div key={topping.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={topping.id}
                      checked={selectedToppings.includes(topping.id)}
                      onCheckedChange={(checked) => handleToppingChange(topping.id, checked === true)}
                    />
                    <Label htmlFor={topping.id} className="text-sm">
                      {topping.name}
                    </Label>
                  </div>
                  <span className="text-sm text-gray-500">+${topping.price.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="mb-4">
          <CardContent className="p-4">
            <h3 className="mb-3 font-medium">Add Extra Sauces</h3>
            <div className="space-y-2">
              {availableSauces.map((sauce) => (
                <div key={sauce.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={sauce.id}
                      checked={selectedSauces.includes(sauce.id)}
                      onCheckedChange={(checked) => handleSauceChange(sauce.id, checked === true)}
                    />
                    <Label htmlFor={sauce.id} className="text-sm">
                      {sauce.name}
                    </Label>
                  </div>
                  <span className="text-sm text-gray-500">+${sauce.price.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardContent className="p-4">
            <h3 className="mb-3 font-medium">Quantity</h3>
            <div className="flex items-center">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </Button>
              <span className="mx-4 min-w-[30px] text-center">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-[0_-2px_10px_rgba(0,0,0,0.1)]">
          <div className="mb-2 flex items-center justify-between">
            <span className="font-medium">Total Price:</span>
            <span className="text-lg font-bold">${calculateTotalPrice().toFixed(2)}</span>
          </div>
          <Button className="w-full bg-pink-600 hover:bg-pink-700" onClick={addToCart}>
            <ShoppingBag className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </div>

        {/* Add padding at the bottom to account for the fixed button */}
        <div className="h-24"></div>
      </main>
    </div>
  )
} 