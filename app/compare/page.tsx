"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import ComparisonTable from "@/components/comparison-table"
import VisualCharts from "@/components/visual-charts"
import PackageSelection from "@/components/package-selection"
import SideBySideComparison from "@/components/side-by-side-comparison"
import InteractiveMap from "@/components/interactive-map"
import CustomerReviews from "@/components/customer-reviews"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { holidayPackages } from "@/data/holiday-packages"

export default function ComparePage() {
  const searchParams = useSearchParams()
  const [selectedPackages, setSelectedPackages] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState("table")
  const [hoveredPackage, setHoveredPackage] = useState<string | null>(null)

  useEffect(() => {
    const ids = searchParams.get("ids")
    if (ids) {
      const packageIds = ids.split(",")
      const packages = holidayPackages.filter((pkg) => packageIds.includes(pkg.id))

      // Only update state if the selected packages have actually changed
      if (JSON.stringify(packages.map((p) => p.id)) !== JSON.stringify(selectedPackages.map((p) => p.id))) {
        setSelectedPackages(packages)
      }
    } else if (selectedPackages.length > 0) {
      // Only reset if we currently have packages selected
      setSelectedPackages([])
    }
  }, [searchParams, selectedPackages])

  const handlePackageSelect = (packageId: string) => {
    const isSelected = selectedPackages.some((pkg) => pkg.id === packageId)

    if (isSelected) {
      setSelectedPackages(selectedPackages.filter((pkg) => pkg.id !== packageId))
    } else {
      if (selectedPackages.length < 4) {
        const packageToAdd = holidayPackages.find((pkg) => pkg.id === packageId)
        if (packageToAdd) {
          setSelectedPackages([...selectedPackages, packageToAdd])
        }
      }
    }
  }

  const handlePackageHover = (packageId: string | null) => {
    setHoveredPackage(packageId)
  }

  if (selectedPackages.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center">
          <Button variant="ghost" asChild className="mr-4">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to packages
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Compare Holiday Packages</h1>
        </div>

        <div className="rounded-xl border bg-card p-8 text-center shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">No packages selected for comparison</h2>
          <p className="mb-8 text-muted-foreground">Please select packages to compare from our collection.</p>
          <PackageSelection
            packages={holidayPackages}
            selectedPackages={selectedPackages}
            onPackageSelect={handlePackageSelect}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" asChild className="mr-4">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to packages
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Compare Holiday Packages</h1>
        </div>
        <Button variant="outline" onClick={() => setSelectedPackages([])} className="hidden sm:inline-flex">
          Clear Selection
        </Button>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-4">
        <div className="lg:col-span-3">
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <Tabs defaultValue="table" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-6 grid w-full grid-cols-4">
                <TabsTrigger value="table">Table View</TabsTrigger>
                <TabsTrigger value="sideBySide">Side by Side</TabsTrigger>
                <TabsTrigger value="charts">Charts & Graphs</TabsTrigger>
                <TabsTrigger value="map">Map View</TabsTrigger>
              </TabsList>

              <TabsContent value="table" className="mt-0">
                <ComparisonTable packages={selectedPackages} onPackageHover={handlePackageHover} />
              </TabsContent>

              <TabsContent value="sideBySide" className="mt-0">
                <SideBySideComparison packages={selectedPackages} onPackageHover={handlePackageHover} />
              </TabsContent>

              <TabsContent value="charts" className="mt-0">
                <VisualCharts packages={selectedPackages} onPackageHover={handlePackageHover} />
              </TabsContent>

              <TabsContent value="map" className="mt-0">
                <InteractiveMap
                  packages={selectedPackages}
                  hoveredPackage={hoveredPackage}
                  onPackageHover={handlePackageHover}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold">Selected Packages</h2>
            <div className="space-y-4">
              {selectedPackages.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`relative rounded-lg border p-3 transition-colors ${
                    hoveredPackage === pkg.id ? "border-teal-500 bg-teal-50" : ""
                  }`}
                  onMouseEnter={() => handlePackageHover(pkg.id)}
                  onMouseLeave={() => handlePackageHover(null)}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{pkg.title}</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={() => handlePackageSelect(pkg.id)}
                    >
                      ✕
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">{pkg.location}</p>
                  <div className="mt-2 text-sm">
                    <span className="font-semibold">${pkg.price}</span> per person
                  </div>
                </div>
              ))}

              {selectedPackages.length < 4 && (
                <Button variant="outline" className="w-full" onClick={() => setActiveTab("addMore")}>
                  + Add More Packages
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-semibold">Customer Reviews & Ratings</h2>
        <CustomerReviews packages={selectedPackages} />
      </div>
    </div>
  )
}
