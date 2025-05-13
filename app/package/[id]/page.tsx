"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, Check, Heart, MapPin, Share, Star, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

// Mock data for holiday packages (same as in holiday-packages.tsx)
const holidayPackages = [
  {
    id: 1,
    title: "Tropical Paradise Resort",
    location: "Bali, Indonesia",
    description: "7 nights at a luxury beachfront resort with all-inclusive meals and activities.",
    longDescription:
      "Experience the ultimate tropical getaway at our luxury beachfront resort in Bali. Nestled on pristine white sands with crystal-clear waters, this all-inclusive paradise offers everything you need for a perfect vacation. Enjoy spacious rooms with ocean views, gourmet dining options, and a wide range of activities from water sports to cultural excursions. Our spa facilities provide the perfect relaxation after a day of adventure, while evening entertainment ensures your nights are as memorable as your days.",
    price: 1299,
    rating: 4.8,
    reviews: 245,
    image: "/placeholder.svg?height=400&width=600",
    gallery: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    type: "beach",
    duration: 7,
    amenities: [
      "All-inclusive",
      "Spa",
      "Pool",
      "Beach access",
      "Free WiFi",
      "Air conditioning",
      "Restaurant",
      "Bar",
      "Room service",
      "Fitness center",
    ],
    discount: 15,
    meals: "All-inclusive",
    transfers: "Included",
    flights: "Included",
    roomType: "Deluxe Ocean View",
    cancellation: "Free cancellation up to 7 days before arrival",
    highlights: [
      "Direct beach access",
      "All-inclusive gourmet dining",
      "Daily activities and entertainment",
      "Complimentary water sports",
      "Luxury spa treatments available",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Welcome",
        description: "Airport pickup, welcome drinks, and resort orientation. Evening welcome dinner on the beach.",
      },
      {
        day: 2,
        title: "Beach Day & Water Activities",
        description: "Enjoy the pristine beach and try complimentary water sports like snorkeling and paddleboarding.",
      },
      {
        day: 3,
        title: "Cultural Excursion",
        description: "Morning visit to local temples and traditional villages. Afternoon free for relaxation.",
      },
      {
        day: 4,
        title: "Spa & Wellness Day",
        description: "Complimentary spa treatment and wellness activities including yoga on the beach.",
      },
      {
        day: 5,
        title: "Island Exploration",
        description: "Full-day tour to nearby islands with lunch included. Evening cultural performance.",
      },
      {
        day: 6,
        title: "Free Day",
        description: "Enjoy the resort facilities at your leisure or book optional excursions.",
      },
      {
        day: 7,
        title: "Farewell",
        description: "Last day to enjoy the resort. Special farewell dinner with traditional entertainment.",
      },
    ],
  },
  {
    id: 2,
    title: "Historic City Getaway",
    location: "Rome, Italy",
    description: "5 nights in the heart of Rome with guided tours and museum passes included.",
    longDescription:
      "Immerse yourself in the eternal city with our Historic Rome Getaway. Stay in a boutique hotel in the heart of Rome, just steps away from iconic landmarks like the Colosseum and Roman Forum. This carefully curated package includes skip-the-line access to major attractions, expert-guided tours, and authentic culinary experiences. Explore ancient ruins, Renaissance masterpieces, and vibrant piazzas while enjoying the comfort of centrally located accommodations. Perfect for history enthusiasts and first-time visitors to Rome.",
    price: 899,
    rating: 4.6,
    reviews: 189,
    image: "/placeholder.svg?height=400&width=600",
    gallery: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    type: "city",
    duration: 5,
    amenities: [
      "Breakfast included",
      "City tours",
      "Museum passes",
      "Central location",
      "Free WiFi",
      "Air conditioning",
      "24-hour reception",
      "Concierge service",
    ],
    discount: 0,
    meals: "Breakfast only",
    transfers: "Not included",
    flights: "Included",
    roomType: "Standard Double Room",
    cancellation: "Free cancellation up to 48 hours before arrival",
    highlights: [
      "Central location near major attractions",
      "Skip-the-line museum and attraction passes",
      "Expert-guided walking tours",
      "Authentic Italian cooking class",
      "Evening food and wine tour",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Rome",
        description: "Check-in to your hotel and evening orientation walk with your guide, followed by welcome dinner.",
      },
      {
        day: 2,
        title: "Ancient Rome",
        description: "Guided tour of the Colosseum, Roman Forum, and Palatine Hill with skip-the-line access.",
      },
      {
        day: 3,
        title: "Vatican City",
        description: "Morning tour of Vatican Museums, Sistine Chapel, and St. Peter's Basilica. Afternoon at leisure.",
      },
      {
        day: 4,
        title: "Roman Cuisine",
        description: "Morning market visit followed by cooking class. Evening free to explore Rome's nightlife.",
      },
      {
        day: 5,
        title: "Departure",
        description: "Final morning to explore or shop before departure. Optional transfer to airport available.",
      },
    ],
  },
  {
    id: 3,
    title: "Mountain Adventure Lodge",
    location: "Swiss Alps, Switzerland",
    description: "6 nights in a cozy mountain lodge with skiing and hiking activities included.",
    longDescription:
      "Escape to the breathtaking Swiss Alps with our Mountain Adventure Lodge package. Nestled in a picturesque valley surrounded by snow-capped peaks, our traditional alpine lodge offers the perfect base for both winter and summer adventures. In winter, enjoy world-class skiing and snowboarding with included lift passes and equipment rental. During summer months, explore stunning hiking trails, mountain biking routes, and crystal-clear alpine lakes. After a day of adventure, relax in the lodge's hot tub or sauna before enjoying hearty Swiss cuisine by the fireplace.",
    price: 1499,
    rating: 4.9,
    reviews: 176,
    image: "/placeholder.svg?height=400&width=600",
    gallery: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    type: "adventure",
    duration: 6,
    amenities: [
      "Breakfast & dinner",
      "Ski passes",
      "Equipment rental",
      "Guided hikes",
      "Hot tub",
      "Sauna",
      "Free WiFi",
      "Fireplace",
      "Boot room",
      "Mountain views",
    ],
    discount: 10,
    meals: "Half board",
    transfers: "Included",
    flights: "Included",
    roomType: "Alpine Suite",
    cancellation: "Free cancellation up to 14 days before arrival",
    highlights: [
      "Premium ski passes included",
      "Professional equipment rental",
      "Guided mountain excursions",
      "Traditional Swiss dining experience",
      "Wellness facilities with mountain views",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Equipment Fitting",
        description: "Transfer from airport to lodge, welcome orientation, and equipment fitting for activities.",
      },
      {
        day: 2,
        title: "Ski/Snowboard Day",
        description: "Full day on the slopes with optional group lesson in the morning. Evening fondue dinner.",
      },
      {
        day: 3,
        title: "Mountain Exploration",
        description:
          "Guided snowshoe hike (winter) or mountain hike (summer) with picnic lunch at panoramic viewpoint.",
      },
      {
        day: 4,
        title: "Adventure Day",
        description: "Choice of activities: advanced ski routes, cross-country skiing, or winter zip-lining.",
      },
      {
        day: 5,
        title: "Alpine Culture",
        description:
          "Morning visit to traditional mountain village and cheese factory. Afternoon free for skiing or relaxation.",
      },
      {
        day: 6,
        title: "Final Adventure & Departure",
        description: "Morning activity of your choice, followed by departure transfer to airport.",
      },
    ],
  },
  {
    id: 4,
    title: "Luxury Island Escape",
    location: "Maldives",
    description: "5 nights in an overwater bungalow with private pool and full board meals.",
    longDescription:
      "Indulge in the ultimate luxury experience with our Maldives Island Escape. Stay in a stunning overwater villa with your own private infinity pool overlooking the turquoise lagoon. This exclusive package includes full board dining at the resort's world-class restaurants, a complimentary couples spa treatment, and a selection of water activities. Snorkel among vibrant coral reefs, enjoy sunset cruises, and experience personalized butler service throughout your stay. This is the perfect romantic getaway or honeymoon destination for those seeking privacy, luxury, and natural beauty.",
    price: 2999,
    rating: 5.0,
    reviews: 312,
    image: "/placeholder.svg?height=400&width=600",
    gallery: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    type: "luxury",
    duration: 5,
    amenities: [
      "Full board",
      "Private pool",
      "Spa treatments",
      "Water activities",
      "Butler service",
      "Air conditioning",
      "Premium toiletries",
      "Direct lagoon access",
      "Champagne on arrival",
      "Daily fruit basket",
    ],
    discount: 0,
    meals: "Full board",
    transfers: "Included",
    flights: "Included",
    roomType: "Overwater Villa with Pool",
    cancellation: "Free cancellation up to 30 days before arrival",
    highlights: [
      "Overwater villa with private infinity pool",
      "Personal butler service",
      "Complimentary couples spa treatment",
      "Sunset dolphin cruise",
      "Private beach dinner experience",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival Paradise",
        description: "Seaplane transfer to resort, villa orientation, and welcome champagne. Evening at leisure.",
      },
      {
        day: 2,
        title: "Underwater Discovery",
        description: "Guided snorkeling tour of the house reef followed by lunch on the beach. Afternoon at leisure.",
      },
      {
        day: 3,
        title: "Spa & Relaxation",
        description: "Complimentary couples spa treatment and relaxation time. Sunset cocktail cruise with canapes.",
      },
      {
        day: 4,
        title: "Island Adventure",
        description:
          "Morning water sports activities. Afternoon visit to local island. Private beach dinner under the stars.",
      },
      {
        day: 5,
        title: "Farewell to Paradise",
        description: "Final morning to enjoy your villa before departure transfer.",
      },
    ],
  },
  {
    id: 5,
    title: "Cultural City Break",
    location: "Barcelona, Spain",
    description: "4 nights in a boutique hotel with tapas tour and flamenco show included.",
    longDescription:
      "Discover the vibrant culture of Barcelona with our specially designed city break. Stay in a stylish boutique hotel in the Gothic Quarter, perfectly positioned to explore this dynamic city. Your package includes a guided tapas tour through local neighborhoods, tickets to an authentic flamenco show, and a skip-the-line pass to Gaudí's masterpieces including Sagrada Familia. Explore the colorful markets, stroll along Las Ramblas, and soak up the unique atmosphere of this Mediterranean gem. This package offers the perfect balance of guided experiences and free time to discover Barcelona at your own pace.",
    price: 749,
    rating: 4.5,
    reviews: 203,
    image: "/placeholder.svg?height=400&width=600",
    gallery: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    type: "city",
    duration: 4,
    amenities: [
      "Breakfast included",
      "Tapas tour",
      "Flamenco show",
      "Central location",
      "Free WiFi",
      "Air conditioning",
      "Rooftop terrace",
      "24-hour reception",
    ],
    discount: 5,
    meals: "Breakfast only",
    transfers: "Not included",
    flights: "Included",
    roomType: "Superior Double Room",
    cancellation: "Free cancellation up to 24 hours before arrival",
    highlights: [
      "Boutique hotel in Gothic Quarter",
      "Evening tapas tour with local guide",
      "Authentic flamenco performance",
      "Skip-the-line Sagrada Familia tickets",
      "Guided Gaudí architecture tour",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Gothic Quarter",
        description: "Check-in and orientation walk through the Gothic Quarter. Evening tapas tour with local guide.",
      },
      {
        day: 2,
        title: "Gaudí Masterpieces",
        description:
          "Guided tour of Sagrada Familia and Park Güell with skip-the-line access. Evening flamenco show with dinner.",
      },
      {
        day: 3,
        title: "Barcelona Highlights",
        description: "Morning visit to La Boqueria market. Afternoon Montjuïc and Barcelona beach exploration.",
      },
      {
        day: 4,
        title: "Departure",
        description: "Final morning free for shopping or additional sightseeing before departure.",
      },
    ],
  },
  {
    id: 6,
    title: "Tropical Beach Resort",
    location: "Phuket, Thailand",
    description: "8 nights at a beachfront resort with daily breakfast and airport transfers.",
    longDescription:
      "Relax and rejuvenate at our beautiful beachfront resort in Phuket, Thailand's largest island paradise. This extended 8-night package gives you plenty of time to experience everything this tropical destination has to offer. Your spacious room features a private balcony with garden or sea views, and the resort boasts multiple swimming pools, restaurants, and a spa. Included airport transfers ensure a smooth arrival and departure, while daily breakfast provides the perfect start to each day. Explore nearby beaches, take a boat trip to stunning Phi Phi Islands, or simply unwind by the pool with a cocktail.",
    price: 1099,
    rating: 4.7,
    reviews: 267,
    image: "/placeholder.svg?height=400&width=600",
    gallery: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    type: "beach",
    duration: 8,
    amenities: [
      "Breakfast included",
      "Airport transfers",
      "Pool",
      "Beach access",
      "Free WiFi",
      "Air conditioning",
      "Spa",
      "Fitness center",
      "Multiple restaurants",
      "Room service",
    ],
    discount: 12,
    meals: "Breakfast only",
    transfers: "Included",
    flights: "Included",
    roomType: "Deluxe Garden View",
    cancellation: "Free cancellation up to 3 days before arrival",
    highlights: [
      "Prime beachfront location",
      "Multiple swimming pools",
      "Optional island-hopping excursions",
      "Traditional Thai spa treatments",
      "Variety of dining options",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Paradise",
        description:
          "Airport transfer to resort, check-in, and time to explore the facilities. Welcome drink included.",
      },
      {
        day: 2,
        title: "Resort Relaxation",
        description: "Day at leisure to enjoy the beach and resort facilities. Optional spa treatments available.",
      },
      {
        day: 3,
        title: "Phi Phi Islands",
        description: "Optional full-day speedboat tour to the stunning Phi Phi Islands with lunch included.",
      },
      {
        day: 4,
        title: "Local Culture",
        description:
          "Optional half-day tour to Big Buddha and Chalong Temple. Evening free to explore local night market.",
      },
      {
        day: 5,
        title: "Beach Day",
        description: "Full day to relax on the beach or by the pool. Optional water sports available.",
      },
      {
        day: 6,
        title: "Phang Nga Bay",
        description: "Optional tour to Phang Nga Bay and James Bond Island. Evening Thai cooking class option.",
      },
      {
        day: 7,
        title: "Island Exploration",
        description: "Optional speedboat trip to Coral Island for snorkeling and beach time.",
      },
      {
        day: 8,
        title: "Departure",
        description: "Final day to enjoy the resort before airport transfer for departure.",
      },
    ],
  },
]

export default function PackageDetailPage({ params }: { params: { id: string } }) {
  const { toast } = useToast()
  const [packageData, setPackageData] = useState<any>(null)

  useEffect(() => {
    const id = Number.parseInt(params.id)
    const foundPackage = holidayPackages.find((pkg) => pkg.id === id)
    if (foundPackage) {
      setPackageData(foundPackage)
    }
  }, [params.id])

  if (!packageData) {
    return (
      <div className="container flex flex-col items-center justify-center min-h-[70vh] px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Package not found</h1>
        <p className="text-muted-foreground mb-8">The holiday package you're looking for doesn't exist.</p>
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
      <Button variant="ghost" asChild className="mb-6">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to packages
        </Link>
      </Button>

      <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
        <div>
          <div className="flex flex-col gap-6">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">{packageData.title}</h1>
                <div className="mt-2 flex items-center gap-3">
                  <div className="flex items-center gap-1 text-sm">
                    <MapPin className="h-4 w-4 text-teal-600" />
                    <span>{packageData.location}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{packageData.rating}</span>
                    <span className="text-muted-foreground">({packageData.reviews} reviews)</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full"
                  onClick={() => {
                    toast({
                      title: "Package shared",
                      description: "Link copied to clipboard",
                    })
                  }}
                >
                  <Share className="h-4 w-4" />
                  <span className="sr-only">Share</span>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full"
                  onClick={() => {
                    toast({
                      title: "Added to favorites",
                      description: `${packageData.title} has been added to your favorites.`,
                    })
                  }}
                >
                  <Heart className="h-4 w-4" />
                  <span className="sr-only">Save</span>
                </Button>
              </div>
            </div>

            {/* Enhanced gallery with hover effects */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-4">
              <div className="relative col-span-2 row-span-2 overflow-hidden rounded-xl sm:h-[350px]">
                <Image
                  src={packageData.image || "/placeholder.svg"}
                  alt={packageData.title}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
                {packageData.discount > 0 && (
                  <Badge className="absolute left-3 top-3 bg-green-600 hover:bg-green-700">
                    {packageData.discount}% OFF
                  </Badge>
                )}
              </div>
              {packageData.gallery.slice(0, 3).map((image: string, index: number) => (
                <div key={index} className="relative overflow-hidden rounded-xl">
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${packageData.title} - image ${index + 1}`}
                    width={300}
                    height={200}
                    className="aspect-square h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              ))}
            </div>

            {/* Package highlights cards */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
              <div className="flex flex-col items-center rounded-xl bg-teal-50 p-4 text-center">
                <Calendar className="mb-2 h-6 w-6 text-teal-600" />
                <div className="font-medium">{packageData.duration} Nights</div>
                <div className="text-sm text-muted-foreground">Duration</div>
              </div>
              <div className="flex flex-col items-center rounded-xl bg-blue-50 p-4 text-center">
                <Users className="mb-2 h-6 w-6 text-blue-600" />
                <div className="font-medium">2 Adults</div>
                <div className="text-sm text-muted-foreground">Occupancy</div>
              </div>
              <div className="flex flex-col items-center rounded-xl bg-purple-50 p-4 text-center">
                <Star className="mb-2 h-6 w-6 text-purple-600" />
                <div className="font-medium">{packageData.rating} Rating</div>
                <div className="text-sm text-muted-foreground">From {packageData.reviews} reviews</div>
              </div>
            </div>

            {/* Enhanced tabs with better styling */}
            <Tabs defaultValue="overview" className="mt-2">
              <TabsList className="grid w-full grid-cols-4 rounded-xl p-1">
                <TabsTrigger value="overview" className="rounded-lg">
                  Overview
                </TabsTrigger>
                <TabsTrigger value="itinerary" className="rounded-lg">
                  Itinerary
                </TabsTrigger>
                <TabsTrigger value="amenities" className="rounded-lg">
                  Amenities
                </TabsTrigger>
                <TabsTrigger value="reviews" className="rounded-lg">
                  Reviews
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6 rounded-xl border-none p-0">
                <div className="grid gap-6">
                  <div className="rounded-xl bg-white p-6 shadow-sm">
                    <h2 className="mb-4 text-xl font-semibold">About This Package</h2>
                    <p className="text-muted-foreground leading-relaxed">{packageData.longDescription}</p>
                  </div>

                  <div className="rounded-xl bg-gradient-to-r from-teal-50 to-green-50 p-6">
                    <h3 className="mb-4 text-lg font-semibold">Package Highlights</h3>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {packageData.highlights.map((highlight: string, index: number) => (
                        <div key={index} className="flex items-start gap-3 rounded-lg bg-white p-3 shadow-sm">
                          <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-teal-100">
                            <Check className="h-3.5 w-3.5 text-teal-700" />
                          </div>
                          <span className="text-sm">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="itinerary" className="mt-6 rounded-xl border-none p-0">
                <div className="rounded-xl bg-white p-6 shadow-sm">
                  <h2 className="mb-6 text-xl font-semibold">Your Itinerary</h2>
                  <div className="relative space-y-6 pl-6 before:absolute before:left-2 before:top-2 before:h-[calc(100%-32px)] before:w-0.5 before:bg-teal-200">
                    {packageData.itinerary.map((day: any) => (
                      <div key={day.day} className="relative">
                        <div className="absolute -left-6 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-teal-100 text-xs font-medium text-teal-800">
                          {day.day}
                        </div>
                        <div className="rounded-xl border p-4 shadow-sm">
                          <h3 className="mb-2 font-semibold">{day.title}</h3>
                          <p className="text-sm text-muted-foreground">{day.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="amenities" className="mt-6 rounded-xl border-none p-0">
                <div className="rounded-xl bg-white p-6 shadow-sm">
                  <h2 className="mb-6 text-xl font-semibold">Amenities & Services</h2>

                  <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="rounded-lg bg-green-50 p-4">
                      <h3 className="mb-3 font-medium">Package Includes</h3>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 rounded-md bg-white p-2 text-sm shadow-sm">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100">
                            <Check className="h-3.5 w-3.5 text-green-700" />
                          </div>
                          <span>Accommodation: {packageData.roomType}</span>
                        </div>
                        <div className="flex items-center gap-2 rounded-md bg-white p-2 text-sm shadow-sm">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100">
                            <Check className="h-3.5 w-3.5 text-green-700" />
                          </div>
                          <span>Meals: {packageData.meals}</span>
                        </div>
                        <div className="flex items-center gap-2 rounded-md bg-white p-2 text-sm shadow-sm">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100">
                            <Check className="h-3.5 w-3.5 text-green-700" />
                          </div>
                          <span>Flights: {packageData.flights}</span>
                        </div>
                        <div className="flex items-center gap-2 rounded-md bg-white p-2 text-sm shadow-sm">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100">
                            <Check className="h-3.5 w-3.5 text-green-700" />
                          </div>
                          <span>Transfers: {packageData.transfers}</span>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-lg bg-blue-50 p-4">
                      <h3 className="mb-3 font-medium">Cancellation Policy</h3>
                      <div className="flex items-center gap-2 rounded-md bg-white p-3 text-sm shadow-sm">
                        <Calendar className="h-5 w-5 text-blue-600" />
                        <span>{packageData.cancellation}</span>
                      </div>
                    </div>
                  </div>

                  <h3 className="mb-3 font-medium">Room & Property Amenities</h3>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
                    {packageData.amenities.map((amenity: string, index: number) => (
                      <div key={index} className="flex items-center gap-2 rounded-md border p-2 text-sm">
                        <Check className="h-4 w-4 text-green-600" />
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6 rounded-xl border-none p-0">
                <div className="rounded-xl bg-white p-6 shadow-sm">
                  <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Guest Reviews</h2>
                    <div className="flex items-center gap-2 rounded-full bg-yellow-50 px-3 py-1">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{packageData.rating}</span>
                      <span className="text-sm text-muted-foreground">({packageData.reviews})</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* Mock reviews with enhanced styling */}
                    <div className="rounded-xl border p-4 shadow-sm transition-all hover:shadow-md">
                      <div className="mb-3 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-sm font-medium text-purple-700">
                            SJ
                          </div>
                          <div>
                            <div className="font-medium">Sarah J.</div>
                            <div className="text-xs text-muted-foreground">March 2025</div>
                          </div>
                        </div>
                        <div className="flex">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Absolutely amazing experience! The accommodations were perfect and the staff went above and
                        beyond. Would definitely recommend this package to anyone looking for a memorable vacation.
                      </p>
                    </div>

                    <div className="rounded-xl border p-4 shadow-sm transition-all hover:shadow-md">
                      <div className="mb-3 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-medium text-blue-700">
                            MT
                          </div>
                          <div>
                            <div className="font-medium">Michael T.</div>
                            <div className="text-xs text-muted-foreground">February 2025</div>
                          </div>
                        </div>
                        <div className="flex">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <Star className="h-4 w-4" />
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Great value for money. The location was perfect and the included activities were well organized.
                        Only minor issue was the airport transfer was slightly delayed on arrival.
                      </p>
                    </div>

                    <div className="rounded-xl border p-4 shadow-sm transition-all hover:shadow-md">
                      <div className="mb-3 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-100 text-sm font-medium text-teal-700">
                            EL
                          </div>
                          <div>
                            <div className="font-medium">Emma L.</div>
                            <div className="text-xs text-muted-foreground">January 2025</div>
                          </div>
                        </div>
                        <div className="flex">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        This was the perfect getaway! Everything was as described and the itinerary was well-balanced
                        between activities and relaxation time. Can't wait to book another trip!
                      </p>
                    </div>

                    <Button variant="outline" className="mt-2 w-full">
                      Load more reviews
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Enhanced booking card */}
        <div>
          <Card className="sticky top-24 overflow-hidden rounded-xl shadow-lg">
            <div className="bg-gradient-to-r from-teal-500 to-green-500 p-4 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">Price per person</div>
                  <div className="flex items-end gap-2">
                    {packageData.discount > 0 && (
                      <span className="text-sm line-through opacity-80">
                        ${Math.round(packageData.price / (1 - packageData.discount / 100))}
                      </span>
                    )}
                    <div className="text-3xl font-bold">${packageData.price}</div>
                  </div>
                </div>
                {packageData.discount > 0 && (
                  <Badge className="bg-white text-teal-700 hover:bg-white/90">Save {packageData.discount}%</Badge>
                )}
              </div>
            </div>
            <CardContent className="p-6">
              <div className="grid gap-5">
                <div className="space-y-3 rounded-lg bg-slate-50 p-4">
                  <div className="flex items-center justify-between text-sm">
                    <span>Package price (2 adults)</span>
                    <span className="font-medium">${packageData.price * 2}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Taxes and fees</span>
                    <span className="font-medium">${Math.round(packageData.price * 2 * 0.12)}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between font-medium">
                    <span>Total</span>
                    <span className="text-lg">${packageData.price * 2 + Math.round(packageData.price * 2 * 0.12)}</span>
                  </div>
                </div>

                <div className="grid gap-3">
                  <Button
                    size="lg"
                    className="w-full bg-gradient-to-r from-teal-500 to-green-500 hover:from-teal-600 hover:to-green-600"
                  >
                    Book Now
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Heart className="mr-2 h-4 w-4" /> Add to Wishlist
                  </Button>
                </div>

                <div className="rounded-lg border border-green-100 bg-green-50 p-3 text-center text-sm text-green-800">
                  <p className="font-medium">No payment required today</p>
                  <p className="text-xs">{packageData.cancellation}</p>
                </div>

                <div className="rounded-lg border p-4">
                  <h3 className="mb-3 font-medium">Package Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-teal-600" />
                      <div className="flex items-center justify-between w-full">
                        <span>Duration:</span>
                        <span className="font-medium">{packageData.duration} nights</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-teal-600" />
                      <div className="flex items-center justify-between w-full">
                        <span>Travelers:</span>
                        <span className="font-medium">2 adults</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-teal-600" />
                      <div className="flex items-center justify-between w-full">
                        <span>Destination:</span>
                        <span className="font-medium">{packageData.location}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg bg-blue-50 p-4">
                  <h3 className="flex items-center gap-2 font-medium text-blue-800 mb-2">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-200">
                      <Check className="h-3 w-3 text-blue-700" />
                    </div>
                    Need Help?
                  </h3>
                  <p className="text-sm text-blue-700 mb-3">
                    Our travel experts are here to assist you with your booking.
                  </p>
                  <Button variant="outline" className="w-full border-blue-200 bg-white text-blue-700 hover:bg-blue-100">
                    Contact Us
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
