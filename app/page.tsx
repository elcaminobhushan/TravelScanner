"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { holidayPackages } from "@/data/holiday-packages"
import HolidayPackageCard from "@/components/holiday-package-card"
import DestinationsCarousel from "@/components/destinations-carousel"
import WhyChooseUs from "@/components/why-choose-us"
import ContactForm from "@/components/contact-form"
import { Search, MapPin, Calendar, Users, ChevronDown, Phone } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Sample destinations data
const popularDestinations = [
  {
    name: "Bali",
    image: "/placeholder.svg?height=300&width=400&text=Bali",
    packages: 24,
  },
  {
    name: "Maldives",
    image: "/placeholder.svg?height=300&width=400&text=Maldives",
    packages: 18,
  },
  {
    name: "Rome",
    image: "/placeholder.svg?height=300&width=400&text=Rome",
    packages: 15,
  },
  {
    name: "Paris",
    image: "/placeholder.svg?height=300&width=400&text=Paris",
    packages: 22,
  },
  {
    name: "Tokyo",
    image: "/placeholder.svg?height=300&width=400&text=Tokyo",
    packages: 19,
  },
  {
    name: "New York",
    image: "/placeholder.svg?height=300&width=400&text=New+York",
    packages: 17,
  },
  {
    name: "Swiss Alps",
    image: "/placeholder.svg?height=300&width=400&text=Swiss+Alps",
    packages: 12,
  },
  {
    name: "Barcelona",
    image: "/placeholder.svg?height=300&width=400&text=Barcelona",
    packages: 16,
  },
]

// Sample destinations for search dropdown
const destinationOptions = [
  { value: "bali", label: "Bali, Indonesia" },
  { value: "maldives", label: "Maldives" },
  { value: "rome", label: "Rome, Italy" },
  { value: "paris", label: "Paris, France" },
  { value: "tokyo", label: "Tokyo, Japan" },
  { value: "new-york", label: "New York, USA" },
  { value: "swiss-alps", label: "Swiss Alps, Switzerland" },
  { value: "barcelona", label: "Barcelona, Spain" },
  { value: "dubai", label: "Dubai, UAE" },
  { value: "phuket", label: "Phuket, Thailand" },
]

export default function Home() {
  const router = useRouter()
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [open, setOpen] = useState(false)
  const [destination, setDestination] = useState("")
  const [openDestination, setOpenDestination] = useState(false)
  const [travelers, setTravelers] = useState("2 Adults")
  const [packagesToCompare, setPackagesToCompare] = useState<string[]>([])

  // Load saved packages from localStorage on initial render
  useEffect(() => {
    const savedPackages = localStorage.getItem("packagesToCompare")
    if (savedPackages) {
      try {
        const parsed = JSON.parse(savedPackages)
        setPackagesToCompare(parsed.map((pkg: any) => pkg.id))
      } catch (error) {
        console.error("Error parsing saved packages:", error)
      }
    }
  }, [])

  const handleCompare = (id: string) => {
    setPackagesToCompare((prev) => {
      // If already in compare list, remove it
      if (prev.includes(id)) {
        return prev.filter((packageId) => packageId !== id)
      }

      // If we already have 4 packages, show an alert
      if (prev.length >= 4) {
        alert("You can compare up to 4 packages at a time. Please remove one to add another.")
        return prev
      }

      // Add the new package
      return [...prev, id]
    })
  }

  const handleCompareClick = () => {
    if (packagesToCompare.length > 0) {
      // Save to localStorage
      const packagesToSave = holidayPackages.filter((pkg) => packagesToCompare.includes(pkg.id))
      localStorage.setItem("packagesToCompare", JSON.stringify(packagesToSave))

      // Navigate to compare page
      router.push(`/compare?ids=${packagesToCompare.join(",")}`)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section with Beach Video Background */}
      <section className="relative w-full">
        {/* Video Background */}
        <div className="absolute inset-0 overflow-hidden">
          <video autoPlay loop muted playsInline className="h-full w-full object-cover">
            <source
              src="https://assets.mixkit.co/videos/preview/mixkit-waves-coming-to-the-beach-5016-large.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Content */}
        <div className="relative py-24 md:py-32 lg:py-40">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center space-y-6 text-center">
              <div className="space-y-3">
                <h1 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl lg:text-6xl">
                  Find Your Perfect Holiday
                </h1>
                <p className="mx-auto max-w-[700px] text-white/80 md:text-xl">
                  Compare thousands of holiday packages to find the best deals for your dream vacation.
                </p>
              </div>

              <div className="w-full max-w-4xl">
                <div className="mt-4 rounded-xl bg-white/95 p-4 shadow-md backdrop-blur-sm">
                  <form className="grid gap-4 md:grid-cols-12">
                    {/* Destination Search with Dropdown */}
                    <div className="relative md:col-span-5">
                      <Popover open={openDestination} onOpenChange={setOpenDestination}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={openDestination}
                            className="w-full justify-between pl-9"
                          >
                            {destination
                              ? destinationOptions.find((option) => option.value === destination)?.label
                              : "Where do you want to go?"}
                            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <PopoverContent className="w-full p-0" align="start">
                          <Command>
                            <CommandInput placeholder="Search destinations..." />
                            <CommandList>
                              <CommandEmpty>No destinations found.</CommandEmpty>
                              <CommandGroup>
                                {destinationOptions.map((option) => (
                                  <CommandItem
                                    key={option.value}
                                    value={option.value}
                                    onSelect={(currentValue) => {
                                      setDestination(currentValue === destination ? "" : currentValue)
                                      setOpenDestination(false)
                                    }}
                                  >
                                    {option.label}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </div>

                    {/* Date Picker with Calendar Popup */}
                    <div className="relative md:col-span-3">
                      <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start pl-9 text-left font-normal">
                            {date ? format(date, "PPP") : "When?"}
                          </Button>
                        </PopoverTrigger>
                        <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <PopoverContent className="w-auto p-0">
                          <CalendarComponent mode="single" selected={date} onSelect={setDate} initialFocus />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="relative md:col-span-2">
                      <Users className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <select
                        className="w-full rounded-md border border-input bg-background px-3 py-2 pl-9 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        value={travelers}
                        onChange={(e) => setTravelers(e.target.value)}
                      >
                        <option value="1 Adult">1 Adult</option>
                        <option value="2 Adults">2 Adults</option>
                        <option value="2 Adults, 1 Child">2 Adults, 1 Child</option>
                        <option value="2 Adults, 2 Children">2 Adults, 2 Children</option>
                        <option value="Group">Group</option>
                      </select>
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
        </div>
      </section>

      {/* Popular Destinations Section - Now with Carousel */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">Popular Destinations</h2>
            <Button variant="outline">View All Destinations</Button>
          </div>

          <DestinationsCarousel destinations={popularDestinations} />
        </div>
      </section>

      {/* Featured Packages Section */}
      <section className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-3xl font-bold">Holiday Packages</h2>
            <p className="mt-2 text-muted-foreground">
              Discover our curated selection of holiday packages for your next adventure
            </p>
          </div>

          {packagesToCompare.length > 0 && (
            <Button onClick={handleCompareClick}>Compare ({packagesToCompare.length})</Button>
          )}
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {holidayPackages.map((pkg) => (
            <HolidayPackageCard
              key={pkg.id}
              id={pkg.id}
              destination={pkg.destination}
              title={pkg.title}
              image={pkg.image}
              duration={pkg.duration}
              departureCity={pkg.departureCity}
              packageTypes={pkg.packageTypes}
              included={pkg.included}
              totalPrice={pkg.totalPrice}
              priceType={pkg.priceType}
              cancellationPolicy={pkg.cancellationPolicy}
              rating={pkg.rating}
              reviews={pkg.reviews}
              customizable={pkg.customizable}
              bookingType={pkg.bookingType}
              onCompare={handleCompare}
            />
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-slate-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <WhyChooseUs />
        </div>
      </section>

      {/* Contact Us Section with Request a Call Button */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-8">
              <h2 className="text-2xl font-bold tracking-tight">Contact Us</h2>
              <p className="mt-2 text-muted-foreground">
                Have questions about our holiday packages? Our travel experts are here to help.
              </p>
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" className="mx-auto">
                  <Phone className="mr-2 h-4 w-4" /> Request a Call
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Request a Call Back</DialogTitle>
                  <DialogDescription>
                    Fill in your details and our travel expert will call you back shortly.
                  </DialogDescription>
                </DialogHeader>
                <ContactForm />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </section>
    </div>
  )
}
