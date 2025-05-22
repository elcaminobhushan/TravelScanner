"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { MapPin, Calendar, Star, ArrowRight, Plus } from "lucide-react"
import { useRouter } from "next/navigation"

interface HolidayPackageCardProps {
  id: string
  title: string
  destination: string
  image: string
  duration: string
  packageTypes: string[]
  totalPrice: number
  priceType: string
  rating: number
  reviews: number
  onCompare?: (id: string) => void
}

export default function HolidayPackageCard({
  id,
  title,
  destination,
  image,
  duration,
  packageTypes,
  totalPrice,
  priceType,
  rating,
  reviews,
  onCompare,
}: HolidayPackageCardProps) {
  const router = useRouter()
  const [isHovered, setIsHovered] = useState(false)

  const handleViewDetails = () => {
    router.push(`/package/${id}`)
  }

  const handleCompare = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (onCompare) {
      onCompare(id)
    }
  }

  return (
    <Card
      className="group relative h-full overflow-hidden transition-all hover:shadow-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className={`object-cover transition-transform duration-500 ${isHovered ? "scale-110" : "scale-100"}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-4">
          <h3 className="text-lg font-bold text-white">{title}</h3>
          <div className="flex items-center text-white">
            <MapPin className="mr-1 h-3.5 w-3.5" />
            <span className="text-sm">{destination}</span>
          </div>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="mb-3 flex flex-wrap gap-2">
          {packageTypes.map((type) => (
            <Badge key={type} variant="outline" className="bg-blue-50">
              {type}
            </Badge>
          ))}
        </div>

        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Calendar className="h-3.5 w-3.5" />
          <span>{duration}</span>
        </div>

        <div className="mt-2 flex items-center">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="ml-1 font-medium">{rating}</span>
          <span className="ml-1 text-xs text-muted-foreground">({reviews} reviews)</span>
        </div>
      </CardContent>

      <CardFooter className="mt-auto flex flex-col items-stretch gap-2 border-t p-4">
        <div className="flex items-baseline justify-between">
          <div className="text-lg font-bold text-green-600">${totalPrice}</div>
          <div className="text-sm text-muted-foreground">{priceType}</div>
        </div>

        <div className="flex gap-2">
          <Button className="flex-1" onClick={handleViewDetails}>
            View Details
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleCompare}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
