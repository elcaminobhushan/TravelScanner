"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Check, Heart, MapPin, Star, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { useToast } from "@/hooks/use-toast"

// Mock data for holiday packages
const holidayPackages = [
  {
    id: 1,
    title: "Tropical Paradise Resort",
    location: "Bali, Indonesia",
    description: "7 nights at a luxury beachfront resort with all-inclusive meals and activities.",
    price: 1299,
    rating: 4.8,
    reviews: 245,
    image: "/placeholder.svg?height=400&width=600",
    type: "beach",
    duration: 7,
    amenities: ["All-inclusive", "Spa", "Pool", "Beach access", "Free WiFi"],
    discount: 15,
  },
  {
    id: 2,
    title: "Historic City Getaway",
    location: "Rome, Italy",
    description: "5 nights in the heart of Rome with guided tours and museum passes included.",
    price: 899,
    rating: 4.6,
    reviews: 189,
    image: "/placeholder.svg?height=400&width=600",
    type: "city",
    duration: 5,
    amenities: ["Breakfast included", "City tours", "Museum passes", "Central location", "Free WiFi"],
    discount: 0,
  },
  {
    id: 3,
    title: "Mountain Adventure Lodge",
    location: "Swiss Alps, Switzerland",
    description: "6 nights in a cozy mountain lodge with skiing and hiking activities included.",
    price: 1499,
    rating: 4.9,
    reviews: 176,
    image: "/placeholder.svg?height=400&width=600",
    type: "adventure",
    duration: 6,
    amenities: ["Breakfast & dinner", "Ski passes", "Equipment rental", "Guided hikes", "Hot tub"],
    discount: 10,
  },
  {
    id: 4,
    title: "Luxury Island Escape",
    location: "Maldives",
    description: "5 nights in an overwater bungalow with private pool and full board meals.",
    price: 2999,
    rating: 5.0,
    reviews: 312,
    image: "/placeholder.svg?height=400&width=600",
    type: "luxury",
    duration: 5,
    amenities: ["Full board", "Private pool", "Spa treatments", "Water activities", "Butler service"],
    discount: 0,
  },
  {
    id: 5,
    title: "Cultural City Break",
    location: "Barcelona, Spain",
    description: "4 nights in a boutique hotel with tapas tour and flamenco show included.",
    price: 749,
    rating: 4.5,
    reviews: 203,
    image: "/placeholder.svg?height=400&width=600",
    type: "city",
    duration: 4,
    amenities: ["Breakfast included", "Tapas tour", "Flamenco show", "Central location", "Free WiFi"],
    discount: 5,
  },
  {
    id: 6,
    title: "Tropical Beach Resort",
    location: "Phuket, Thailand",
    description: "8 nights at a beachfront resort with daily breakfast and airport transfers.",
    price: 1099,
    rating: 4.7,
    reviews: 267,
    image: "/placeholder.svg?height=400&width=600",
    type: "beach",
    duration: 8,
    amenities: ["Breakfast included", "Airport transfers", "Pool", "Beach access", "Free WiFi"],
    discount: 12,
  },
]

export default function HolidayPackages({ filter = "" }) {
  const { toast } = useToast()
  const [priceRange, setPriceRange] = useState([0, 3000])
  const [selectedPackages, setSelectedPackages] = useState<number[]>([])
  const [sortOption, setSortOption] = useState("recommended")

  // Filter packages based on type if filter is provided
  const filteredPackages = filter ? holidayPackages.filter((pkg) => pkg.type === filter) : holidayPackages

  // Filter packages based on price range
  const priceFilteredPackages = filteredPackages.filter(
    (pkg) => pkg.price >= priceRange[0] && pkg.price <= priceRange[1],
  )

  // Sort packages based on selected option
  const sortedPackages = [...priceFilteredPackages].sort((a, b) => {
    switch (sortOption) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      case "duration":
        return b.duration - a.duration
      default:
        return 0
    }
  })

  const togglePackageSelection = (id: number) => {
    setSelectedPackages((prev) => {
      if (prev.includes(id)) {
        return prev.filter((packageId) => packageId !== id)
      } else {
        if (prev.length >= 3) {
          toast({
            title: "Maximum selection reached",
            description: "You can only compare up to 3 packages at a time.",
          })
          return prev
        }
        return [...prev, id]
      }
    })
  }

  return (
    <div className="grid gap-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold tracking-tight">
            {filter ? `${filter.charAt(0).toUpperCase() + filter.slice(1)} Holidays` : "All Holiday Packages"}
          </h2>
          <p className="text-muted-foreground">
            {sortedPackages.length} packages found
            {selectedPackages.length > 0 && `, ${selectedPackages.length} selected for comparison`}
          </p>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex flex-col gap-2">
            <Label htmlFor="price-range">
              Price Range: ${priceRange[0]} - ${priceRange[1]}
            </Label>
            <Slider
              id="price-range"
              defaultValue={[0, 3000]}
              max={3000}
              step={100}
              value={priceRange}
              onValueChange={setPriceRange}
              className="w-[200px]"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Sort by:{" "}
                {sortOption === "recommended"
                  ? "Recommended"
                  : sortOption === "price-low"
                    ? "Price: Low to High"
                    : sortOption === "price-high"
                      ? "Price: High to Low"
                      : sortOption === "rating"
                        ? "Rating"
                        : "Duration"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setSortOption("recommended")}>Recommended</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortOption("price-low")}>Price: Low to High</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortOption("price-high")}>Price: High to Low</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortOption("rating")}>Rating</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortOption("duration")}>Duration</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sortedPackages.map((pkg) => (
          <Card key={pkg.id} className="overflow-hidden">
            <div className="relative">
              <Image
                src={pkg.image || "/placeholder.svg"}
                alt={pkg.title}
                width={600}
                height={400}
                className="h-[200px] w-full object-cover"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2 h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm"
                onClick={() => {
                  toast({
                    title: "Added to favorites",
                    description: `${pkg.title} has been added to your favorites.`,
                  })
                }}
              >
                <Heart className="h-4 w-4" />
                <span className="sr-only">Add to favorites</span>
              </Button>
              {pkg.discount > 0 && (
                <Badge className="absolute left-2 top-2 bg-green-600 hover:bg-green-700">{pkg.discount}% OFF</Badge>
              )}
              <div className="absolute bottom-2 right-2 flex items-center gap-1 rounded-full bg-white/80 px-2 py-1 text-sm backdrop-blur-sm">
                <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{pkg.rating}</span>
                <span className="text-xs text-muted-foreground">({pkg.reviews})</span>
              </div>
            </div>
            <CardHeader className="p-4">
              <div className="space-y-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold">{pkg.title}</h3>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5" />
                      <span>{pkg.location}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    {pkg.discount > 0 && (
                      <span className="text-sm line-through text-muted-foreground">
                        ${Math.round(pkg.price / (1 - pkg.discount / 100))}
                      </span>
                    )}
                    <div className="text-lg font-bold">${pkg.price}</div>
                    <div className="text-xs text-muted-foreground">per person</div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center gap-1 text-xs">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{pkg.duration} nights</span>
                </div>
                <div className="flex items-center gap-1 text-xs">
                  <Users className="h-3.5 w-3.5" />
                  <span>2 adults</span>
                </div>
              </div>
              <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{pkg.description}</p>
              <div className="mt-3">
                <div className="text-xs font-medium">Includes:</div>
                <ul className="mt-1 grid grid-cols-2 gap-x-2 gap-y-1">
                  {pkg.amenities.slice(0, 4).map((amenity, index) => (
                    <li key={index} className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Check className="h-3 w-3 text-green-500" />
                      <span>{amenity}</span>
                    </li>
                  ))}
                  {pkg.amenities.length > 4 && (
                    <li className="text-xs text-muted-foreground">+{pkg.amenities.length - 4} more</li>
                  )}
                </ul>
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between p-4 pt-0">
              <div className="flex items-center gap-2">
                <Checkbox
                  id={`compare-${pkg.id}`}
                  checked={selectedPackages.includes(pkg.id)}
                  onCheckedChange={() => togglePackageSelection(pkg.id)}
                />
                <Label htmlFor={`compare-${pkg.id}`} className="text-sm">
                  Compare
                </Label>
              </div>
              <Button asChild size="sm">
                <Link href={`/package/${pkg.id}`}>View Details</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {selectedPackages.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 flex items-center justify-between bg-background p-4 shadow-lg md:px-6">
          <div>
            <span className="font-medium">{selectedPackages.length} packages selected</span>
            <p className="text-sm text-muted-foreground">Select up to 3 packages to compare</p>
          </div>
          <Button asChild>
            <Link href={`/compare?ids=${selectedPackages.join(",")}`}>Compare Packages</Link>
          </Button>
        </div>
      )}
    </div>
  )
}
