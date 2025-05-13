"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, X, Star, MapPin, Calendar, Users, Utensils, Home, Activity, Award } from "lucide-react"

interface SideBySideComparisonProps {
  packages: any[]
  onPackageHover: (packageId: string | null) => void
}

export default function SideBySideComparison({ packages, onPackageHover }: SideBySideComparisonProps) {
  // Find best value package (lowest price per night)
  const bestValuePackage = packages.reduce((best, current) => {
    const bestValue = best.price / best.duration
    const currentValue = current.price / current.duration
    return currentValue < bestValue ? current : best
  }, packages[0])

  // Find highest rated package
  const highestRatedPackage = packages.reduce((highest, current) => {
    return current.rating > highest.rating ? current : highest
  }, packages[0])

  // Find package with most amenities
  const packageWithMostAmenities = packages.reduce((most, current) => {
    return (current.amenities?.length || 0) > (most.amenities?.length || 0) ? current : most
  }, packages[0])

  const getPackageBadge = (pkg: any) => {
    if (pkg.id === bestValuePackage.id) {
      return <Badge className="bg-green-600 hover:bg-green-700">Best Value</Badge>
    } else if (pkg.id === highestRatedPackage.id) {
      return <Badge className="bg-yellow-600 hover:bg-yellow-700">Top Rated</Badge>
    } else if (pkg.id === packageWithMostAmenities.id) {
      return <Badge className="bg-blue-600 hover:bg-blue-700">Most Inclusive</Badge>
    }
    return null
  }

  // Categories for comparison
  const categories = [
    {
      name: "Basic Information",
      items: [
        { id: "price", label: "Price", icon: <span className="text-green-600">$</span> },
        { id: "duration", label: "Duration", icon: <Calendar className="h-4 w-4 text-blue-600" /> },
        { id: "location", label: "Destination", icon: <MapPin className="h-4 w-4 text-red-600" /> },
      ],
    },
    {
      name: "Accommodation & Meals",
      items: [
        { id: "roomType", label: "Room Type", icon: <Home className="h-4 w-4 text-indigo-600" /> },
        { id: "meals", label: "Meals", icon: <Utensils className="h-4 w-4 text-orange-600" /> },
      ],
    },
    {
      name: "Activities & Inclusions",
      items: [
        { id: "activities", label: "Activities", icon: <Activity className="h-4 w-4 text-purple-600" /> },
        { id: "transfers", label: "Transfers", icon: <Users className="h-4 w-4 text-teal-600" /> },
      ],
    },
    {
      name: "Ratings & Reviews",
      items: [
        { id: "rating", label: "Rating", icon: <Star className="h-4 w-4 text-yellow-600" /> },
        { id: "reviews", label: "Reviews", icon: <Award className="h-4 w-4 text-pink-600" /> },
      ],
    },
  ]

  // Helper function to render cell content based on attribute
  const renderCellContent = (pkg: any, attributeId: string) => {
    switch (attributeId) {
      case "price":
        return (
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1">
              {pkg.discount > 0 && (
                <span className="text-sm line-through text-muted-foreground">
                  ${Math.round(pkg.price / (1 - pkg.discount / 100))}
                </span>
              )}
              <span className="text-lg font-bold text-green-600">${pkg.price}</span>
            </div>
            <span className="text-xs text-muted-foreground">per person</span>
            {pkg.discount > 0 && (
              <Badge className="mt-1 bg-green-100 text-green-800 hover:bg-green-200">Save {pkg.discount}%</Badge>
            )}
          </div>
        )
      case "duration":
        return (
          <div className="flex items-center gap-1">
            <span className="font-medium">{pkg.duration}</span> nights
          </div>
        )
      case "location":
        return <span>{pkg.location}</span>
      case "roomType":
        return <span>{pkg.roomType || "Standard Room"}</span>
      case "meals":
        return <span>{pkg.meals || "Not included"}</span>
      case "activities":
        return (
          <div>
            <div>{pkg.activities?.length || 0} included</div>
            {pkg.activities && (
              <ul className="mt-1 space-y-1 text-sm">
                {pkg.activities.slice(0, 3).map((activity: string, index: number) => (
                  <li key={index} className="flex items-start gap-1">
                    <Check className="mt-0.5 h-3 w-3 text-green-600" />
                    <span>{activity}</span>
                  </li>
                ))}
                {pkg.activities.length > 3 && (
                  <li className="text-xs text-muted-foreground">+{pkg.activities.length - 3} more</li>
                )}
              </ul>
            )}
          </div>
        )
      case "transfers":
        return (
          <div className="flex items-center gap-1">
            {pkg.transfers === "Included" ? (
              <>
                <Check className="h-4 w-4 text-green-600" />
                <span>Included</span>
              </>
            ) : (
              <>
                <X className="h-4 w-4 text-red-500" />
                <span>Not included</span>
              </>
            )}
          </div>
        )
      case "rating":
        return (
          <div className="flex items-center gap-1">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-4 w-4 ${
                    star <= Math.round(pkg.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-medium">{pkg.rating}</span>
          </div>
        )
      case "reviews":
        return <span>{pkg.reviews} reviews</span>
      default:
        return <span>-</span>
    }
  }

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[640px]">
        {/* Package Headers */}
        <div className="grid grid-cols-[200px_repeat(auto-fill,minmax(180px,1fr))] gap-4">
          <div className="p-2"></div>
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="flex flex-col items-center rounded-t-lg border border-b-0 p-4 text-center transition-colors hover:bg-muted/50"
              onMouseEnter={() => onPackageHover(pkg.id)}
              onMouseLeave={() => onPackageHover(null)}
            >
              <div className="relative mb-2 h-24 w-full overflow-hidden rounded-md">
                <Image src={pkg.image || "/placeholder.svg"} alt={pkg.title} fill className="object-cover" />
              </div>
              <h3 className="font-semibold">{pkg.title}</h3>
              <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3" />
                <span>{pkg.location}</span>
              </div>
              <div className="mt-2">{getPackageBadge(pkg)}</div>
              <Button asChild size="sm" className="mt-3 w-full">
                <Link href={`/package/${pkg.id}`}>View Details</Link>
              </Button>
            </div>
          ))}
        </div>

        {/* Categories and Attributes */}
        {categories.map((category) => (
          <div key={category.name} className="mb-6">
            <div className="mb-2 bg-muted/50 p-2 font-semibold">{category.name}</div>

            {category.items.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-[200px_repeat(auto-fill,minmax(180px,1fr))] gap-4 border-b py-3"
              >
                <div className="flex items-center gap-2 p-2">
                  {item.icon}
                  <span>{item.label}</span>
                </div>

                {packages.map((pkg) => (
                  <div
                    key={`${pkg.id}-${item.id}`}
                    className="p-2 transition-colors hover:bg-muted/30"
                    onMouseEnter={() => onPackageHover(pkg.id)}
                    onMouseLeave={() => onPackageHover(null)}
                  >
                    {renderCellContent(pkg, item.id)}
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}

        {/* Highlights Section */}
        <div className="mb-6">
          <div className="mb-2 bg-muted/50 p-2 font-semibold">Package Highlights</div>
          <div className="grid grid-cols-[200px_repeat(auto-fill,minmax(180px,1fr))] gap-4 border-b py-3">
            <div className="flex items-center gap-2 p-2">
              <Award className="h-4 w-4 text-teal-600" />
              <span>Highlights</span>
            </div>

            {packages.map((pkg) => (
              <div
                key={`${pkg.id}-highlights`}
                className="p-2 transition-colors hover:bg-muted/30"
                onMouseEnter={() => onPackageHover(pkg.id)}
                onMouseLeave={() => onPackageHover(null)}
              >
                <ul className="space-y-1 text-sm">
                  {pkg.highlights?.slice(0, 3).map((highlight: string, index: number) => (
                    <li key={index} className="flex items-start gap-1">
                      <Check className="mt-0.5 h-3 w-3 text-green-600" />
                      <span>{highlight}</span>
                    </li>
                  )) || <li className="text-muted-foreground">No highlights available</li>}
                  {pkg.highlights && pkg.highlights.length > 3 && (
                    <li className="text-xs text-muted-foreground">+{pkg.highlights.length - 3} more</li>
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="grid grid-cols-[200px_repeat(auto-fill,minmax(180px,1fr))] gap-4">
          <div className="p-2"></div>
          {packages.map((pkg) => (
            <div
              key={`${pkg.id}-cta`}
              className="flex flex-col items-center gap-2 rounded-b-lg border border-t-0 p-4"
              onMouseEnter={() => onPackageHover(pkg.id)}
              onMouseLeave={() => onPackageHover(null)}
            >
              <div className="text-center text-2xl font-bold text-green-600">${pkg.price}</div>
              <div className="text-sm text-muted-foreground">per person</div>
              <Button className="mt-2 w-full">Book Now</Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
