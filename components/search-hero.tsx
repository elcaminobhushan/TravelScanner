"use client"

import type React from "react"

import { useState } from "react"
import { Search, Calendar, MapPin, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

export default function SearchHero() {
  const { toast } = useToast()
  const [destination, setDestination] = useState("")
  const [dates, setDates] = useState("")
  const [travelers, setTravelers] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    if (!destination) {
      toast({
        title: "Please enter a destination",
        description: "Enter a destination to search for holiday packages",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Searching for packages",
      description: `Looking for holidays to ${destination}`,
    })

    // In a real app, this would navigate to search results
    // For now, we'll just log the search parameters
    console.log("Search params:", { destination, dates, travelers })
  }

  return (
    <section className="w-full bg-gradient-to-r from-teal-50 to-green-50 py-16 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-6 text-center">
          <div className="space-y-3">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              Find Your Perfect Holiday
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Compare thousands of holiday packages to find the best deals for your dream vacation.
            </p>
          </div>

          <div className="w-full max-w-4xl">
            <Tabs defaultValue="packages" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="packages">Holiday Packages</TabsTrigger>
                <TabsTrigger value="hotels">Hotels</TabsTrigger>
                <TabsTrigger value="flights">Flights</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="mt-4 rounded-xl bg-white p-4 shadow-md">
              <form onSubmit={handleSearch} className="grid gap-4 md:grid-cols-12">
                <div className="relative md:col-span-5">
                  <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Where do you want to go?"
                    className="pl-9"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                  />
                </div>

                <div className="relative md:col-span-3">
                  <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="When?"
                    className="pl-9"
                    value={dates}
                    onChange={(e) => setDates(e.target.value)}
                  />
                </div>

                <div className="relative md:col-span-2">
                  <Users className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Travelers"
                    className="pl-9"
                    value={travelers}
                    onChange={(e) => setTravelers(e.target.value)}
                  />
                </div>

                <Button type="submit" className="md:col-span-2">
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
