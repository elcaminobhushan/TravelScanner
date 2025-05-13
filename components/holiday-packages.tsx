"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Check, Heart, MapPin, Star, Users, Filter, SlidersHorizontal, Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

// Mock data for holiday packages
const holidayPackages = [
  {
    id: "1",
    title: "Tropical Paradise Resort",
    location: "Bali, Indonesia",
    description: "7 nights at a luxury beachfront resort with all-inclusive meals and activities.",
    price: 1299,
    rating: 4.8,
    reviews: 245,
    image: "/placeholder.svg?height=400&width=600",
    type: "beach",
    tags: ["beach", "luxury", "all-inclusive"],
    duration: 7,
    amenities: ["All-inclusive", "Spa", "Pool", "Beach access", "Free WiFi"],
    discount: 15,
  },
  {
    id: "2",
    title: "Historic City Getaway",
    location: "Rome, Italy",
    description: "5 nights in the heart of Rome with guided tours and museum passes included.",
    price: 899,
    rating: 4.6,
    reviews: 189,
    image: "/placeholder.svg?height=400&width=600",
    type: "city",
    tags: ["city", "cultural", "tours"],
    duration: 5,
    amenities: ["Breakfast included", "City tours", "Museum passes", "Central location", "Free WiFi"],
    discount: 0,
  },
  {
    id: "3",
    title: "Mountain Adventure Lodge",
    location: "Swiss Alps, Switzerland",
    description: "6 nights in a cozy mountain lodge with skiing and hiking activities included.",
    price: 1499,
    rating: 4.9,
    reviews: 176,
    image: "/placeholder.svg?height=400&width=600",
    type: "adventure",
    tags: ["adventure", "mountain", "skiing"],
    duration: 6,
    amenities: ["Breakfast & dinner", "Ski passes", "Equipment rental", "Guided hikes", "Hot tub"],
    discount: 10,
  },
  {
    id: "4",
    title: "Luxury Island Escape",
    location: "Maldives",
    description: "5 nights in an overwater bungalow with private pool and full board meals.",
    price: 2999,
    rating: 5.0,
    reviews: 312,
    image: "/placeholder.svg?height=400&width=600",
    type: "luxury",
    tags: ["luxury", "beach", "romantic"],
    duration: 5,
    amenities: ["Full board", "Private pool", "Spa treatments", "Water activities", "Butler service"],
    discount: 0,
  },
  {
    id: "5",
    title: "Cultural City Break",
    location: "Barcelona, Spain",
    description: "4 nights in a boutique hotel with tapas tour and flamenco show included.",
    price: 749,
    rating: 4.5,
    reviews: 203,
    image: "/placeholder.svg?height=400&width=600",
    type: "city",
    tags: ["city", "cultural", "food"],
    duration: 4,
    amenities: ["Breakfast included", "Tapas tour", "Flamenco show", "Central location", "Free WiFi"],
    discount: 5,
  },
  {
    id: "6",
    title: "Tropical Beach Resort",
    location: "Phuket, Thailand",
    description: "8 nights at a beachfront resort with daily breakfast and airport transfers.",
    price: 1099,
    rating: 4.7,
    reviews: 267,
    image: "/placeholder.svg?height=400&width=600",
    type: "beach",
    tags: ["beach", "resort", "relaxation"],
    duration: 8,
    amenities: ["Breakfast included", "Airport transfers", "Pool", "Beach access", "Free WiFi"],
    discount: 12,
  },
]

export default function HolidayPackages({ filter }: { filter?: string }) {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("all")
  const [packages, setPackages] = useState(holidayPackages)
  const [filteredPackages, setFilteredPackages] = useState(holidayPackages)
  const [sortOption, setSortOption] = useState<"recommended" | "price-low" | "price-high" | "rating" | "duration">(
    "recommended",
  )
  const [selectedPackages, setSelectedPackages] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<number[]>([0, 3000])
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  // Apply filters and search
  useEffect(() => {
    let result = holidayPackages

    // Apply tab filter
    if (activeTab !== "all") {
      result = result.filter((pkg) => pkg.type === activeTab)
    }

    // Apply price range filter
    result = result.filter((pkg) => pkg.price >= priceRange[0] && pkg.price <= priceRange[1])

    // Apply search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      result = result.filter(
        (pkg) =>
          pkg.title.toLowerCase().includes(term) ||
          pkg.location.toLowerCase().includes(term) ||
          pkg.description.toLowerCase().includes(term) ||
          pkg.type.toLowerCase().includes(term),
      )
    }

    // Apply sorting
    result = [...result].sort((a, b) => {
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

    setFilteredPackages(result)
  }, [activeTab, priceRange, sortOption, searchTerm])

  const togglePackageSelection = (id: string) => {
    if (selectedPackages.includes(id)) {
      setSelectedPackages(selectedPackages.filter((item) => item !== id))
    } else {
      if (selectedPackages.length < 3) {
        setSelectedPackages([...selectedPackages, id])
      } else {
        toast({
          title: "Too many packages selected",
          description: "You can only compare up to 3 packages at a time",
          variant: "destructive",
        })
      }
    }
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  return (
    <section className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <TabsList className="h-auto">
            <TabsTrigger value="all">All Packages</TabsTrigger>
            <TabsTrigger value="beach">Beach</TabsTrigger>
            <TabsTrigger value="city">City Break</TabsTrigger>
            <TabsTrigger value="adventure">Adventure</TabsTrigger>
            <TabsTrigger value="luxury">Luxury</TabsTrigger>
          </TabsList>
          {selectedPackages.length > 0 && (
            <Link
              href={`/compare?ids=${selectedPackages.join(",")}`}
              className="hidden text-sm font-medium text-teal-600 hover:underline sm:block"
            >
              Compare Selected ({selectedPackages.length})
            </Link>
          )}
        </div>

        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-xs">
            <input
              type="search"
              placeholder="Search packages..."
              className="w-full rounded-md border border-input bg-background px-3 py-2 pl-9 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              value={searchTerm}
              onChange={handleSearch}
            />
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-1"
            >
              <Filter className="h-4 w-4" />
              Filters
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <SlidersHorizontal className="h-4 w-4" />
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

        {/* Filter panel */}
        {isFilterOpen && (
          <div className="mb-6 rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Filter Options</h3>
              <Button variant="ghost" size="sm" onClick={() => setIsFilterOpen(false)}>
                Close
              </Button>
            </div>

            <div className="space-y-6">
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

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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

              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setPriceRange([0, 3000])
                    // Reset other filters here
                  }}
                >
                  Reset Filters
                </Button>
                <Button onClick={() => setIsFilterOpen(false)}>Apply Filters</Button>
              </div>
            </div>
          </div>
        )}

        {filteredPackages.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="mb-4 rounded-full bg-muted p-3">
              <Search className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">No packages found</h3>
            <p className="mb-6 text-muted-foreground">
              We couldn't find any packages matching your criteria. Try adjusting your filters.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setActiveTab("all")
                setPriceRange([0, 3000])
                setSearchTerm("")
                setSortOption("recommended")
              }}
            >
              Reset all filters
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPackages.map((pkg) => (
              <Card
                key={pkg.id}
                className="group overflow-hidden rounded-xl transition-all duration-300 hover:shadow-lg"
              >
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
                        <div
                          key={index}
                          className="flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-xs"
                        >
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
        )}
      </Tabs>

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
