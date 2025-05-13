"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { toast } from "@/components/ui/use-toast"
import { holidayPackages } from "@/data/holiday-packages"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
// Update the import section to include additional icons
import { Calendar, Check, Heart, MapPin, Star, Users, Filter, SlidersHorizontal } from "lucide-react"

export default function HolidayPackages({ filter }: { filter?: string }) {
  const [packages, setPackages] = useState(holidayPackages)
  const [sortOption, setSortOption] = useState<"recommended" | "price-low" | "price-high" | "rating" | "duration">(
    "recommended",
  )
  const [selectedPackages, setSelectedPackages] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<number[]>([0, 3000])

  useEffect(() => {
    let filteredPackages = holidayPackages

    if (filter) {
      filteredPackages = filteredPackages.filter((pkg) => pkg.tags.includes(filter))
    }

    filteredPackages = filteredPackages.filter((pkg) => pkg.price >= priceRange[0] && pkg.price <= priceRange[1])

    setPackages(filteredPackages)
  }, [filter, priceRange])

  const sortedPackages = [...packages].sort((a, b) => {
    if (sortOption === "price-low") {
      return a.price - b.price
    }
    if (sortOption === "price-high") {
      return b.price - a.price
    }
    if (sortOption === "rating") {
      return b.rating - a.rating
    }
    if (sortOption === "duration") {
      return a.duration - b.duration
    }
    return 0
  })

  const togglePackageSelection = (id: string) => {
    if (selectedPackages.includes(id)) {
      setSelectedPackages(selectedPackages.filter((item) => item !== id))
    } else {
      if (selectedPackages.length < 3) {
        setSelectedPackages([...selectedPackages, id])
      } else {
        toast({
          title: "Too many packages selected.",
          description: "You can only compare up to 3 packages.",
        })
      }
    }
  }

  // Replace the filter and sort controls with a more visually appealing design
  // Find the section starting with <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
  // and replace it with:

  return (
    <section className="container py-8">
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
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const filterDialog = document.getElementById("filter-dialog")
              if (filterDialog) {
                filterDialog.classList.toggle("hidden")
              }
            }}
          >
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <SlidersHorizontal className="mr-2 h-4 w-4" />
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

      {/* Filter panel - initially hidden */}
      <div id="filter-dialog" className="hidden mb-6 rounded-xl border bg-card p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Filter Options</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              const filterDialog = document.getElementById("filter-dialog")
              if (filterDialog) {
                filterDialog.classList.add("hidden")
              }
            }}
          >
            Close
          </Button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-2">
            <Label htmlFor="price-range" className="font-medium">
              Price Range: ${priceRange[0]} - ${priceRange[1]}
            </Label>
            <Slider
              id="price-range"
              defaultValue={[0, 3000]}
              max={3000}
              step={100}
              value={priceRange}
              onValueChange={setPriceRange}
            />
          </div>

          <div className="space-y-2">
            <Label className="font-medium">Duration</Label>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" className="justify-start">
                <Calendar className="mr-2 h-4 w-4" />
                Any
              </Button>
              <Button variant="outline" size="sm" className="justify-start">
                <Calendar className="mr-2 h-4 w-4" />
                5+ nights
              </Button>
              <Button variant="outline" size="sm" className="justify-start">
                <Calendar className="mr-2 h-4 w-4" />
                7+ nights
              </Button>
              <Button variant="outline" size="sm" className="justify-start">
                <Calendar className="mr-2 h-4 w-4" />
                10+ nights
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="font-medium">Amenities</Label>
            <div className="grid grid-cols-1 gap-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="amenity-pool" />
                <Label htmlFor="amenity-pool">Pool</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="amenity-beach" />
                <Label htmlFor="amenity-beach">Beach Access</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="amenity-wifi" />
                <Label htmlFor="amenity-wifi">Free WiFi</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="amenity-spa" />
                <Label htmlFor="amenity-spa">Spa</Label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="font-medium">Meals</Label>
            <div className="grid grid-cols-1 gap-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="meals-all" />
                <Label htmlFor="meals-all">All-inclusive</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="meals-breakfast" />
                <Label htmlFor="meals-breakfast">Breakfast included</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="meals-half" />
                <Label htmlFor="meals-half">Half board</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="meals-full" />
                <Label htmlFor="meals-full">Full board</Label>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <Button variant="outline">Reset Filters</Button>
          <Button>Apply Filters</Button>
        </div>
      </div>

      {/* Replace the package cards with a more visually appealing design
      // Find the section starting with <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      // and replace it with: */}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sortedPackages.map((pkg) => (
          <Card key={pkg.id} className="group overflow-hidden rounded-xl transition-all duration-300 hover:shadow-lg">
            <div className="relative">
              <Image
                src={pkg.image || "/placeholder.svg"}
                alt={pkg.title}
                width={600}
                height={400}
                className="h-[220px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2 h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm transition-colors hover:bg-white/90"
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
                <Badge className="absolute left-2 top-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700">
                  {pkg.discount}% OFF
                </Badge>
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 pt-8 text-white">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{pkg.title}</h3>
                  <div className="flex items-center gap-1 rounded-full bg-white/20 px-2 py-1 text-sm backdrop-blur-sm">
                    <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                    <span>{pkg.rating}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-sm text-white/80">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{pkg.location}</span>
                </div>
              </div>
            </div>
            <div className="p-4">
              <div className="mb-3 flex flex-wrap gap-1">
                <Badge variant="outline" className="bg-blue-50">
                  <Calendar className="mr-1 h-3.5 w-3.5" />
                  {pkg.duration} nights
                </Badge>
                <Badge variant="outline" className="bg-purple-50">
                  <Users className="mr-1 h-3.5 w-3.5" />2 adults
                </Badge>
                {pkg.type && (
                  <Badge variant="outline" className="bg-teal-50">
                    {pkg.type.charAt(0).toUpperCase() + pkg.type.slice(1)}
                  </Badge>
                )}
              </div>

              <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">{pkg.description}</p>

              <div className="mb-3">
                <div className="text-xs font-medium text-muted-foreground">Top amenities:</div>
                <div className="mt-1 flex flex-wrap gap-2">
                  {pkg.amenities.slice(0, 3).map((amenity, index) => (
                    <div key={index} className="flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-xs">
                      <Check className="h-3 w-3 text-green-500" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                  {pkg.amenities.length > 3 && (
                    <div className="rounded-full bg-slate-100 px-2 py-0.5 text-xs">
                      +{pkg.amenities.length - 3} more
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-end justify-between">
                <div>
                  {pkg.discount > 0 && (
                    <span className="text-sm line-through text-muted-foreground">
                      ${Math.round(pkg.price / (1 - pkg.discount / 100))}
                    </span>
                  )}
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold">${pkg.price}</span>
                    <span className="text-xs text-muted-foreground">per person</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    <Checkbox
                      id={`compare-${pkg.id}`}
                      checked={selectedPackages.includes(pkg.id)}
                      onCheckedChange={() => togglePackageSelection(pkg.id)}
                    />
                    <Label htmlFor={`compare-${pkg.id}`} className="ml-2 text-sm">
                      Compare
                    </Label>
                  </div>
                  <Button asChild size="sm">
                    <Link href={`/package/${pkg.id}`}>View</Link>
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Replace the comparison bar with a more visually appealing design
      // Find the section starting with {selectedPackages.length > 0 && (
      // and replace it with: */}

      {selectedPackages.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-teal-500 to-green-500 p-4 shadow-lg md:px-6">
          <div className="container mx-auto flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="text-white">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm font-bold text-teal-600">
                  {selectedPackages.length}
                </div>
                <span className="font-medium">packages selected</span>
              </div>
              <p className="text-sm text-white/80">Select up to 3 packages to compare</p>
            </div>
            <Button asChild className="w-full bg-white text-teal-600 hover:bg-white/90 sm:w-auto">
              <Link href={`/compare?ids=${selectedPackages.join(",")}`}>Compare Packages</Link>
            </Button>
          </div>
        </div>
      )}
    </section>
  )
}
