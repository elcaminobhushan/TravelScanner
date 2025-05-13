"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { ArrowLeft, Check, MapPin, Minus, Star, Calendar, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

// Mock data for holiday packages (same as in holiday-packages.tsx)
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
    meals: "All-inclusive",
    transfers: "Included",
    flights: "Included",
    roomType: "Deluxe Ocean View",
    cancellation: "Free cancellation up to 7 days before arrival",
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
    meals: "Breakfast only",
    transfers: "Not included",
    flights: "Included",
    roomType: "Standard Double Room",
    cancellation: "Free cancellation up to 48 hours before arrival",
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
    meals: "Half board",
    transfers: "Included",
    flights: "Included",
    roomType: "Alpine Suite",
    cancellation: "Free cancellation up to 14 days before arrival",
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
    meals: "Full board",
    transfers: "Included",
    flights: "Included",
    roomType: "Overwater Villa with Pool",
    cancellation: "Free cancellation up to 30 days before arrival",
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
    meals: "Breakfast only",
    transfers: "Not included",
    flights: "Included",
    roomType: "Superior Double Room",
    cancellation: "Free cancellation up to 24 hours before arrival",
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
    meals: "Breakfast only",
    transfers: "Included",
    flights: "Included",
    roomType: "Deluxe Garden View",
    cancellation: "Free cancellation up to 3 days before arrival",
  },
]

// All possible amenities across all packages
const allAmenities = [
  "All-inclusive",
  "Breakfast included",
  "Full board",
  "Half board",
  "Spa",
  "Pool",
  "Beach access",
  "Free WiFi",
  "City tours",
  "Museum passes",
  "Central location",
  "Ski passes",
  "Equipment rental",
  "Guided hikes",
  "Hot tub",
  "Private pool",
  "Spa treatments",
  "Water activities",
  "Butler service",
  "Tapas tour",
  "Flamenco show",
  "Airport transfers",
]

export default function ComparePage() {
  const searchParams = useSearchParams()
  const [selectedPackages, setSelectedPackages] = useState<any[]>([])

  useEffect(() => {
    const ids = searchParams.get("ids")
    if (ids) {
      const packageIds = ids.split(",").map(Number)
      const packages = holidayPackages.filter((pkg) => packageIds.includes(pkg.id))
      setSelectedPackages(packages)
    }
  }, [searchParams])

  if (selectedPackages.length === 0) {
    return (
      <div className="container flex flex-col items-center justify-center min-h-[70vh] px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">No packages selected for comparison</h1>
        <p className="text-muted-foreground mb-8">Please select packages to compare from the main page.</p>
        <Button asChild>
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to packages
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container px-4 py-12">
      <div className="mb-8 flex items-center">
        <Button variant="ghost" asChild className="mr-4">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to packages
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Compare Holiday Packages</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {selectedPackages.map((pkg) => (
          <Card key={pkg.id} className="overflow-hidden">
            <div className="relative h-[200px]">
              <Image src={pkg.image || "/placeholder.svg"} alt={pkg.title} fill className="object-cover" />
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
          </Card>
        ))}
      </div>

      <div className="mt-8 space-y-8">
        {/* Price Comparison */}
        <div className="rounded-xl bg-gradient-to-r from-teal-50 to-green-50 p-6">
          <h2 className="mb-6 text-xl font-semibold">Price & Value</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {selectedPackages.map((pkg) => (
              <div key={`price-${pkg.id}`} className="rounded-lg bg-white p-5 shadow-md">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="font-medium">{pkg.title}</h3>
                  {pkg.discount > 0 && <Badge className="bg-green-600 hover:bg-green-700">{pkg.discount}% OFF</Badge>}
                </div>
                <div className="mb-2 text-3xl font-bold">${pkg.price}</div>
                <div className="mb-4 text-sm text-muted-foreground">per person, includes taxes</div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-teal-600" />
                    <span>{pkg.duration} nights</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-teal-600" />
                    <span>2 adults</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Accommodations */}
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-xl font-semibold">Accommodations</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {selectedPackages.map((pkg) => (
              <div key={`room-${pkg.id}`} className="rounded-lg border p-5">
                <div className="mb-3">
                  <h3 className="font-medium">{pkg.title}</h3>
                  <div className="text-sm text-muted-foreground">{pkg.location}</div>
                </div>
                <div className="mb-4 rounded-lg bg-slate-100 p-3">
                  <div className="font-medium">Room Type</div>
                  <div className="text-sm">{pkg.roomType}</div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-green-600" />
                    <span>{pkg.meals}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    {pkg.transfers === "Included" ? (
                      <>
                        <Check className="h-4 w-4 text-green-600" />
                        <span>Airport transfers included</span>
                      </>
                    ) : (
                      <>
                        <Minus className="h-4 w-4 text-red-500" />
                        <span>Airport transfers not included</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Inclusions & Features */}
        <div className="rounded-xl bg-gradient-to-r from-slate-50 to-blue-50 p-6">
          <h2 className="mb-6 text-xl font-semibold">Inclusions & Features</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-lg bg-white p-4 shadow-sm">
              <h3 className="mb-3 font-medium">Meals</h3>
              <div className="space-y-3">
                {selectedPackages.map((pkg) => (
                  <div key={`meals-${pkg.id}`} className="flex items-center gap-3 rounded-md border p-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-100">
                      <span className="text-xs font-medium text-teal-700">{pkg.id}</span>
                    </div>
                    <div className="text-sm">{pkg.meals}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-lg bg-white p-4 shadow-sm">
              <h3 className="mb-3 font-medium">Flights</h3>
              <div className="space-y-3">
                {selectedPackages.map((pkg) => (
                  <div key={`flights-${pkg.id}`} className="flex items-center gap-3 rounded-md border p-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-100">
                      <span className="text-xs font-medium text-teal-700">{pkg.id}</span>
                    </div>
                    {pkg.flights === "Included" ? (
                      <div className="flex items-center gap-1 text-sm text-green-600">
                        <Check className="h-4 w-4" /> Included
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-sm text-red-500">
                        <Minus className="h-4 w-4" /> Not included
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-lg bg-white p-4 shadow-sm">
              <h3 className="mb-3 font-medium">Transfers</h3>
              <div className="space-y-3">
                {selectedPackages.map((pkg) => (
                  <div key={`transfers-${pkg.id}`} className="flex items-center gap-3 rounded-md border p-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-100">
                      <span className="text-xs font-medium text-teal-700">{pkg.id}</span>
                    </div>
                    {pkg.transfers === "Included" ? (
                      <div className="flex items-center gap-1 text-sm text-green-600">
                        <Check className="h-4 w-4" /> Included
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-sm text-red-500">
                        <Minus className="h-4 w-4" /> Not included
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Cancellation Policies */}
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-xl font-semibold">Cancellation Policies</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {selectedPackages.map((pkg) => (
              <div key={`cancel-${pkg.id}`} className="rounded-lg border p-5">
                <div className="mb-3">
                  <h3 className="font-medium">{pkg.title}</h3>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <Calendar className="mt-0.5 h-4 w-4 text-teal-600" />
                  <span>{pkg.cancellation}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Amenities Comparison */}
        <div className="rounded-xl bg-gradient-to-r from-purple-50 to-indigo-50 p-6">
          <h2 className="mb-6 text-xl font-semibold">Amenities</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {selectedPackages.map((pkg) => (
              <div key={`amenities-${pkg.id}`} className="rounded-lg bg-white p-5 shadow-md">
                <div className="mb-3">
                  <h3 className="font-medium">{pkg.title}</h3>
                </div>
                <div className="space-y-2">
                  {pkg.amenities.map((amenity: string, index: number) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-600" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {selectedPackages.map((pkg) => (
          <div
            key={`book-${pkg.id}`}
            className="overflow-hidden rounded-xl bg-white shadow-lg transition-all hover:shadow-xl"
          >
            <div className="relative h-40">
              <Image src={pkg.image || "/placeholder.svg"} alt={pkg.title} fill className="object-cover" />
              {pkg.discount > 0 && (
                <Badge className="absolute left-3 top-3 bg-green-600 hover:bg-green-700">{pkg.discount}% OFF</Badge>
              )}
            </div>
            <div className="p-6">
              <h3 className="mb-1 text-lg font-semibold">{pkg.title}</h3>
              <div className="mb-4 flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" />
                <span>{pkg.location}</span>
              </div>
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">${pkg.price}</div>
                  <div className="text-xs text-muted-foreground">per person</div>
                </div>
                <Button>Book Now</Button>
              </div>
              <Separator className="my-4" />
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{pkg.duration} nights</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                  <span>
                    {pkg.rating} ({pkg.reviews})
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
