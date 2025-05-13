"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Check, Star, MapPin, Calendar, Utensils, Home, Activity } from "lucide-react"
import PackageDetailCard from "@/components/package-detail-card"

interface ComparisonTableProps {
  packages: any[]
  onPackageHover: (packageId: string | null) => void
}

export default function ComparisonTable({ packages, onPackageHover }: ComparisonTableProps) {
  const [expandedPackage, setExpandedPackage] = useState<string | null>(null)

  const toggleExpandPackage = (packageId: string) => {
    if (expandedPackage === packageId) {
      setExpandedPackage(null)
    } else {
      setExpandedPackage(packageId)
    }
  }

  // Define the attributes to compare
  const attributes = [
    { id: "price", label: "Price", icon: <span className="text-green-600">$</span> },
    { id: "duration", label: "Duration", icon: <Calendar className="h-4 w-4 text-blue-600" /> },
    { id: "meals", label: "Meals", icon: <Utensils className="h-4 w-4 text-orange-600" /> },
    { id: "activities", label: "Activities", icon: <Activity className="h-4 w-4 text-purple-600" /> },
    { id: "accommodation", label: "Accommodation", icon: <Home className="h-4 w-4 text-indigo-600" /> },
    { id: "location", label: "Destination", icon: <MapPin className="h-4 w-4 text-red-600" /> },
    { id: "rating", label: "Rating", icon: <Star className="h-4 w-4 text-yellow-600" /> },
  ]

  // Helper function to render cell content based on attribute
  const renderCellContent = (pkg: any, attribute: string) => {
    switch (attribute) {
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
      case "meals":
        return <span>{pkg.meals || "Not included"}</span>
      case "activities":
        return (
          <div className="flex flex-col gap-1">
            <span>{pkg.activities?.length || 0} included</span>
            {pkg.activities && pkg.activities.length > 0 && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                      View all
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="w-64 p-0">
                    <div className="rounded-md bg-white p-3 shadow-md">
                      <h4 className="mb-2 font-medium">Included Activities:</h4>
                      <ul className="space-y-1 text-sm">
                        {pkg.activities.map((activity: string, index: number) => (
                          <li key={index} className="flex items-start gap-2">
                            <Check className="mt-0.5 h-3 w-3 text-green-600" />
                            <span>{activity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        )
      case "accommodation":
        return <span>{pkg.roomType || "Standard Room"}</span>
      case "location":
        return <span>{pkg.location}</span>
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
            <span className="text-sm">({pkg.reviews})</span>
          </div>
        )
      default:
        return <span>-</span>
    }
  }

  // Responsive table for desktop
  const desktopTable = (
    <div className="hidden md:block">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="w-1/4 border-b p-3 text-left">Package</th>
            {attributes.map((attr) => (
              <th key={attr.id} className="border-b p-3 text-center">
                <div className="flex items-center justify-center gap-1">
                  {attr.icon}
                  <span>{attr.label}</span>
                </div>
              </th>
            ))}
            <th className="border-b p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {packages.map((pkg) => (
            <tr
              key={pkg.id}
              className="transition-colors hover:bg-muted/50"
              onMouseEnter={() => onPackageHover(pkg.id)}
              onMouseLeave={() => onPackageHover(null)}
            >
              <td className="border-b p-3">
                <div className="flex items-center gap-3">
                  <div className="relative h-16 w-16 overflow-hidden rounded-md">
                    <Image src={pkg.image || "/placeholder.svg"} alt={pkg.title} fill className="object-cover" />
                  </div>
                  <div>
                    <h3 className="font-medium">{pkg.title}</h3>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span>{pkg.location}</span>
                    </div>
                  </div>
                </div>
              </td>
              {attributes.map((attr) => (
                <td key={`${pkg.id}-${attr.id}`} className="border-b p-3 text-center">
                  {renderCellContent(pkg, attr.id)}
                </td>
              ))}
              <td className="border-b p-3 text-center">
                <div className="flex flex-col items-center gap-2">
                  <Button asChild size="sm">
                    <Link href={`/package/${pkg.id}`}>View Details</Link>
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => toggleExpandPackage(pkg.id)}>
                    Quick Preview
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  // Responsive cards for mobile
  const mobileCards = (
    <div className="md:hidden">
      <div className="space-y-6">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className="rounded-lg border shadow-sm"
            onMouseEnter={() => onPackageHover(pkg.id)}
            onMouseLeave={() => onPackageHover(null)}
          >
            <div className="relative h-40 w-full overflow-hidden rounded-t-lg">
              <Image src={pkg.image || "/placeholder.svg"} alt={pkg.title} fill className="object-cover" />
              {pkg.discount > 0 && (
                <Badge className="absolute left-2 top-2 bg-green-600 hover:bg-green-700">{pkg.discount}% OFF</Badge>
              )}
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold">{pkg.title}</h3>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{pkg.location}</span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">Price</span>
                  <div className="flex items-baseline gap-1">
                    {pkg.discount > 0 && (
                      <span className="text-xs line-through text-muted-foreground">
                        ${Math.round(pkg.price / (1 - pkg.discount / 100))}
                      </span>
                    )}
                    <span className="font-bold text-green-600">${pkg.price}</span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">Duration</span>
                  <span>{pkg.duration} nights</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">Meals</span>
                  <span>{pkg.meals || "Not included"}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">Rating</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>
                      {pkg.rating} ({pkg.reviews})
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <Button asChild className="flex-1" size="sm">
                  <Link href={`/package/${pkg.id}`}>View Details</Link>
                </Button>
                <Button variant="outline" size="sm" className="flex-1" onClick={() => toggleExpandPackage(pkg.id)}>
                  Quick Preview
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div>
      {desktopTable}
      {mobileCards}

      {/* Package Detail Preview */}
      {expandedPackage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-auto rounded-lg bg-white p-6 shadow-lg">
            <PackageDetailCard
              package={packages.find((pkg) => pkg.id === expandedPackage)}
              onClose={() => setExpandedPackage(null)}
            />
          </div>
        </div>
      )}
    </div>
  )
}
