"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Search, Star, MapPin, Calendar } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface PackageSelectionProps {
  packages: any[]
  selectedPackages: any[]
  onPackageSelect: (packageId: string) => void
}

export default function PackageSelection({ packages, selectedPackages, onPackageSelect }: PackageSelectionProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const filteredPackages = packages.filter((pkg) => {
    // Filter by search term
    const matchesSearch =
      searchTerm === "" ||
      pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.type.toLowerCase().includes(searchTerm.toLowerCase())

    // Filter by tab
    const matchesTab = activeTab === "all" || pkg.type === activeTab

    return matchesSearch && matchesTab
  })

  const isSelected = (packageId: string) => {
    return selectedPackages.some((pkg) => pkg.id === packageId)
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="mb-4 text-xl font-semibold">Select Packages to Compare</h2>
        <p className="mb-6 text-muted-foreground">
          Choose up to 4 holiday packages to compare side by side. You can filter by type or search for specific
          destinations.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search packages..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="beach">Beach</TabsTrigger>
              <TabsTrigger value="city">City</TabsTrigger>
              <TabsTrigger value="adventure">Adventure</TabsTrigger>
              <TabsTrigger value="luxury">Luxury</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredPackages.map((pkg) => (
          <Card
            key={pkg.id}
            className={`cursor-pointer transition-all hover:shadow-md ${
              isSelected(pkg.id) ? "border-teal-500 ring-2 ring-teal-500/20" : ""
            }`}
            onClick={() => onPackageSelect(pkg.id)}
          >
            <div className="relative">
              <Image
                src={pkg.image || "/placeholder.svg"}
                alt={pkg.title}
                width={400}
                height={200}
                className="h-[150px] w-full rounded-t-lg object-cover"
              />
              {pkg.discount > 0 && (
                <Badge className="absolute left-2 top-2 bg-green-600 hover:bg-green-700">{pkg.discount}% OFF</Badge>
              )}
              {isSelected(pkg.id) && (
                <div className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-teal-500 text-white">
                  <Check className="h-4 w-4" />
                </div>
              )}
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold">{pkg.title}</h3>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" />
                <span>{pkg.location}</span>
              </div>

              <div className="mt-2 flex flex-wrap gap-2">
                <Badge variant="outline" className="bg-blue-50">
                  <Calendar className="mr-1 h-3 w-3" />
                  {pkg.duration} nights
                </Badge>
                <Badge variant="outline" className="bg-teal-50">
                  {pkg.type.charAt(0).toUpperCase() + pkg.type.slice(1)}
                </Badge>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{pkg.rating}</span>
                  <span className="text-xs text-muted-foreground">({pkg.reviews})</span>
                </div>
                <div className="text-lg font-bold text-green-600">${pkg.price}</div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredPackages.length === 0 && (
          <div className="col-span-full rounded-lg border border-dashed p-8 text-center">
            <Search className="mx-auto h-8 w-8 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">No packages found</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Try adjusting your search or filter to find packages to compare.
            </p>
          </div>
        )}
      </div>

      {selectedPackages.length > 0 && (
        <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-lg border bg-muted/30 p-4 sm:flex-row">
          <div>
            <span className="font-medium">{selectedPackages.length} packages selected</span>
            <p className="text-sm text-muted-foreground">
              {selectedPackages.length < 4
                ? `You can select up to ${4 - selectedPackages.length} more packages`
                : "Maximum number of packages selected"}
            </p>
          </div>
          <Button>Compare Selected Packages</Button>
        </div>
      )}
    </div>
  )
}
