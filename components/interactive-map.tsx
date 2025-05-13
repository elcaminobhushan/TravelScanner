"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, Star } from "lucide-react"
import Image from "next/image"

interface InteractiveMapProps {
  packages: any[]
  hoveredPackage: string | null
  onPackageHover: (packageId: string | null) => void
}

export default function InteractiveMap({ packages, hoveredPackage, onPackageHover }: InteractiveMapProps) {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null)

  // Reset selected location when hovered package changes
  useEffect(() => {
    if (hoveredPackage) {
      const pkg = packages.find((p) => p.id === hoveredPackage)
      if (pkg) {
        setSelectedLocation(pkg.location)
      }
    } else {
      // Only reset selectedLocation when hoveredPackage becomes null
      // if we previously set it due to a hover
      if (selectedLocation && packages.some((p) => p.location === selectedLocation && p.id === hoveredPackage)) {
        setSelectedLocation(null)
      }
    }
  }, [hoveredPackage, packages])

  // Mock location coordinates for the map
  const locationCoordinates: Record<string, { x: number; y: number }> = {
    "Bali, Indonesia": { x: 75, y: 60 },
    "Rome, Italy": { x: 50, y: 40 },
    "Swiss Alps, Switzerland": { x: 48, y: 35 },
    Maldives: { x: 65, y: 55 },
    "Barcelona, Spain": { x: 45, y: 40 },
    "Phuket, Thailand": { x: 70, y: 50 },
    "Paris, France": { x: 47, y: 35 },
    "Tokyo, Japan": { x: 85, y: 40 },
    "New York, USA": { x: 25, y: 40 },
    "Sydney, Australia": { x: 90, y: 70 },
    "Cairo, Egypt": { x: 55, y: 45 },
    "Rio de Janeiro, Brazil": { x: 30, y: 65 },
  }

  // Get packages for a specific location
  const getPackagesForLocation = (location: string) => {
    return packages.filter((pkg) => pkg.location === location)
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Destination Map</CardTitle>
            <CardDescription>Explore the locations of your selected holiday packages</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative h-[400px] w-full overflow-hidden rounded-md border bg-slate-100">
              {/* World map background */}
              <Image
                src="/placeholder.svg?height=800&width=1200&text=World Map"
                alt="World Map"
                fill
                className="object-cover"
              />

              {/* Location pins */}
              {Object.entries(locationCoordinates).map(([location, coords]) => {
                const packagesAtLocation = getPackagesForLocation(location)
                const isActive = packagesAtLocation.length > 0
                const isHighlighted = selectedLocation === location

                if (!isActive) return null

                return (
                  <div
                    key={location}
                    className={`absolute z-10 flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full transition-all ${
                      isHighlighted
                        ? "bg-teal-500 text-white shadow-lg"
                        : "bg-slate-200 text-slate-700 hover:bg-teal-100"
                    }`}
                    style={{ left: `${coords.x}%`, top: `${coords.y}%` }}
                    onClick={() => setSelectedLocation(isHighlighted ? null : location)}
                    onMouseEnter={() => {
                      if (packagesAtLocation.length === 1) {
                        onPackageHover(packagesAtLocation[0].id)
                      }
                    }}
                    onMouseLeave={() => {
                      if (packagesAtLocation.length === 1) {
                        onPackageHover(null)
                      }
                    }}
                  >
                    <MapPin className="h-4 w-4" />

                    {/* Badge showing number of packages */}
                    {packagesAtLocation.length > 1 && (
                      <Badge
                        className={`absolute -right-2 -top-2 h-5 w-5 rounded-full p-0 ${
                          isHighlighted ? "bg-white text-teal-600" : "bg-teal-500 text-white"
                        }`}
                      >
                        <span className="text-xs">{packagesAtLocation.length}</span>
                      </Badge>
                    )}
                  </div>
                )
              })}

              {/* Location labels for highlighted location */}
              {selectedLocation && (
                <div
                  className="absolute z-20 -translate-x-1/2 rounded-md bg-white px-2 py-1 text-xs font-medium shadow-md"
                  style={{
                    left: `${locationCoordinates[selectedLocation]?.x}%`,
                    top: `${locationCoordinates[selectedLocation]?.y - 5}%`,
                  }}
                >
                  {selectedLocation}
                </div>
              )}
            </div>

            <div className="mt-4 text-sm text-muted-foreground">
              Click on a pin to see packages available at that location. Hover over packages in the list to highlight
              their location on the map.
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <Card className="h-full">
          <CardHeader>
            <CardTitle>{selectedLocation ? `Packages in ${selectedLocation}` : "All Destinations"}</CardTitle>
            <CardDescription>
              {selectedLocation
                ? `${getPackagesForLocation(selectedLocation).length} packages available`
                : "Select a location on the map to see available packages"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {(selectedLocation ? getPackagesForLocation(selectedLocation) : packages).map((pkg) => (
                <div
                  key={pkg.id}
                  className={`rounded-lg border p-3 transition-all ${
                    hoveredPackage === pkg.id ? "border-teal-500 bg-teal-50" : ""
                  }`}
                  onMouseEnter={() => onPackageHover(pkg.id)}
                  onMouseLeave={() => onPackageHover(null)}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                      <Image src={pkg.image || "/placeholder.svg"} alt={pkg.title} fill className="object-cover" />
                    </div>
                    <div>
                      <h3 className="font-medium">{pkg.title}</h3>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        <span>{pkg.location}</span>
                      </div>
                      <div className="mt-1 flex flex-wrap gap-2">
                        <div className="flex items-center gap-1 text-xs">
                          <Calendar className="h-3 w-3 text-blue-600" />
                          <span>{pkg.duration} nights</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs">
                          <Star className="h-3 w-3 text-yellow-500" />
                          <span>{pkg.rating}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs">
                          <span className="text-green-600">$</span>
                          <span>{pkg.price}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {selectedLocation && getPackagesForLocation(selectedLocation).length === 0 && (
                <div className="rounded-lg border border-dashed p-6 text-center text-muted-foreground">
                  No packages available for this location
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
