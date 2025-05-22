"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Star, MapPin, Calendar, Users, Home, Wifi, Utensils, Waves, Check } from "lucide-react"

interface TravelPackageCardProps {
  id: string
  title: string
  location: string
  image: string
  rating: number
  reviews: number
  duration: number
  occupancy: string
  accommodationType: string
  amenities: string[]
  totalPrice: number
  pricePerPerson: number
  cancellationPolicy: string
  onCompare?: (id: string, isComparing: boolean) => void
  isComparing?: boolean
}

export default function TravelPackageCard({
  id,
  title,
  location,
  image,
  rating,
  reviews,
  duration,
  occupancy,
  accommodationType,
  amenities,
  totalPrice,
  pricePerPerson,
  cancellationPolicy,
  onCompare,
  isComparing = false,
}: TravelPackageCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Helper function to render amenity icon
  const getAmenityIcon = (amenity: string) => {
    const lowerAmenity = amenity.toLowerCase()
    if (lowerAmenity.includes("wifi")) return <Wifi className="h-3.5 w-3.5 text-teal-600" />
    if (lowerAmenity.includes("pool")) return <Waves className="h-3.5 w-3.5 text-blue-600" />
    if (lowerAmenity.includes("meal") || lowerAmenity.includes("board") || lowerAmenity.includes("breakfast"))
      return <Utensils className="h-3.5 w-3.5 text-orange-600" />
    return <Check className="h-3.5 w-3.5 text-green-600" />
  }

  return (
    <Card
      className="group overflow-hidden transition-all duration-300 hover:shadow-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Section */}
      <div className="relative">
        <div className="relative h-[220px] w-full overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 pt-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-sm backdrop-blur-sm">
              <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{rating}</span>
              <span className="text-muted-foreground">({reviews})</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <CardContent className="p-5">
        {/* Title and Location */}
        <div className="mb-3">
          <h3 className="text-lg font-semibold leading-tight">{title}</h3>
          <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            <span>{location}</span>
          </div>
        </div>

        {/* Key Details */}
        <div className="mb-4 grid grid-cols-3 gap-2 text-sm">
          <div className="flex flex-col">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" />
              <span>Duration</span>
            </div>
            <span className="font-medium">{duration} nights</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Users className="h-3.5 w-3.5" />
              <span>Guests</span>
            </div>
            <span className="font-medium">{occupancy}</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Home className="h-3.5 w-3.5" />
              <span>Room</span>
            </div>
            <span className="font-medium truncate" title={accommodationType}>
              {accommodationType}
            </span>
          </div>
        </div>

        {/* Amenities */}
        <div className="mb-4">
          <div className="text-xs font-medium text-muted-foreground">Top amenities:</div>
          <div className="mt-1.5 flex flex-wrap gap-2">
            {amenities.slice(0, 3).map((amenity, index) => (
              <div key={index} className="flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-xs">
                {getAmenityIcon(amenity)}
                <span>{amenity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Price and Cancellation */}
        <div className="mb-4 space-y-1.5">
          <div className="flex items-baseline justify-between">
            <div className="text-xs text-muted-foreground">Total price</div>
            <div className="text-xs text-green-600">{cancellationPolicy}</div>
          </div>
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-2xl font-bold">${totalPrice.toLocaleString()}</span>
              <span className="text-sm text-muted-foreground"> total</span>
            </div>
            <div className="text-sm text-muted-foreground">${pricePerPerson.toLocaleString()} per person</div>
          </div>
          <div className="text-xs text-muted-foreground">Includes taxes and fees</div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            <Checkbox
              id={`compare-${id}`}
              checked={isComparing}
              onCheckedChange={(checked) => onCompare?.(id, checked === true)}
            />
            <Label htmlFor={`compare-${id}`} className="ml-2 text-sm">
              Compare
            </Label>
          </div>
          <div className="flex-1"></div>
          <Button variant="outline" size="sm" asChild>
            <Link href={`/package/${id}`}>Details</Link>
          </Button>
          <Button size="sm">Book Now</Button>
        </div>
      </CardContent>
    </Card>
  )
}
