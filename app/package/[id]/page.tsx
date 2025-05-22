"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Star, Plane, Hotel, Utensils, Car, Map, Heart, Share2, Check, X, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { holidayPackages } from "@/data/holiday-packages"

export default function PackageDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [packageData, setPackageData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (params.id) {
      const foundPackage = holidayPackages.find((pkg) => pkg.id === params.id)
      if (foundPackage) {
        setPackageData(foundPackage)
      } else {
        // Package not found, redirect to home
        router.push("/")
      }
      setLoading(false)
    }
  }, [params.id, router])

  if (loading) {
    return (
      <div className="container mx-auto flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p>Loading package details...</p>
        </div>
      </div>
    )
  }

  if (!packageData) {
    return (
      <div className="container mx-auto py-12 text-center">
        <h1 className="mb-4 text-2xl font-bold">Package Not Found</h1>
        <p className="mb-8">The package you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link href="/">Return to Home</Link>
        </Button>
      </div>
    )
  }

  // Sample itinerary data (would come from API in real app)
  const itinerary = [
    {
      day: 1,
      title: "Arrival & Welcome",
      description:
        "Arrive at your destination airport where you'll be greeted and transferred to your accommodation. Enjoy a welcome dinner and briefing about your upcoming adventure.",
      activities: ["Airport pickup", "Hotel check-in", "Welcome dinner"],
      meals: ["Dinner"],
      accommodation: "Luxury Resort",
    },
    {
      day: 2,
      title: "Exploring Local Attractions",
      description:
        "After breakfast, embark on a guided tour of the main local attractions. Enjoy lunch at a local restaurant and free time in the afternoon.",
      activities: ["Guided tour", "Local cuisine experience", "Free time for relaxation"],
      meals: ["Breakfast", "Lunch"],
      accommodation: "Luxury Resort",
    },
    {
      day: 3,
      title: "Adventure Day",
      description:
        "Today is all about adventure! Participate in exciting activities like snorkeling, hiking, or cultural workshops depending on your destination.",
      activities: ["Adventure activities", "Lunch at scenic spot", "Evening entertainment"],
      meals: ["Breakfast", "Lunch", "Dinner"],
      accommodation: "Luxury Resort",
    },
    {
      day: 4,
      title: "Relaxation & Optional Activities",
      description:
        "Enjoy a day of relaxation or choose from optional activities. Perfect for customizing your experience based on your interests.",
      activities: ["Optional excursions", "Spa treatments (optional)", "Free time"],
      meals: ["Breakfast"],
      accommodation: "Luxury Resort",
    },
    {
      day: 5,
      title: "Farewell & Departure",
      description:
        "After breakfast, check out from your accommodation and transfer to the airport for your departure flight.",
      activities: ["Hotel checkout", "Airport transfer", "Departure"],
      meals: ["Breakfast"],
      accommodation: "N/A",
    },
  ]

  // Sample FAQs
  const faqs = [
    {
      question: "Can I customize this package?",
      answer:
        "Yes, most aspects of our packages can be customized to suit your preferences. Contact our travel experts for personalized adjustments.",
    },
    {
      question: "Is travel insurance included?",
      answer:
        "Travel insurance is not included in the package price. We strongly recommend purchasing comprehensive travel insurance separately.",
    },
    {
      question: "Can I add extra nights to this package?",
      answer:
        "Extra nights can be added at the beginning or end of your trip. Additional costs will apply based on your accommodation choice.",
    },
    {
      question: "Are visas included in the package?",
      answer:
        "Visa fees and arrangements are not included. It's the traveler's responsibility to ensure they have the proper documentation for their destination.",
    },
    {
      question: "What happens if I need to cancel my trip?",
      answer:
        "Our packages come with flexible cancellation policies. Refer to the specific terms for this package or contact our support team for details.",
    },
  ]

  // Sample reviews
  const reviews = [
    {
      name: "Sarah Johnson",
      date: "October 2023",
      rating: 5,
      comment:
        "This was the trip of a lifetime! Everything was perfectly organized from start to finish. The activities were amazing and the accommodations exceeded our expectations.",
      tripType: "Family vacation",
    },
    {
      name: "Michael Chen",
      date: "September 2023",
      rating: 4,
      comment:
        "Great experience overall. The itinerary was well-planned and gave us a perfect mix of adventure and relaxation. Would definitely book again!",
      tripType: "Couple getaway",
    },
    {
      name: "Emma Rodriguez",
      date: "August 2023",
      rating: 5,
      comment:
        "Absolutely fantastic! Our guide was knowledgeable and friendly, and the experiences included in this package were truly unique. Highly recommend!",
      tripType: "Solo adventure",
    },
  ]

  return (
    <div className="bg-white">
      {/* Back button */}
      <div className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to all packages
          </Link>
        </Button>
      </div>

      {/* Hero section */}
      <div className="relative h-[50vh] w-full overflow-hidden">
        <Image
          src={packageData.image || "/placeholder.svg"}
          alt={packageData.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="container mx-auto">
            <div className="flex flex-wrap items-center gap-2">
              {packageData.packageTypes?.map((type: string) => (
                <Badge key={type} className="bg-white/20 text-white hover:bg-white/30">
                  {type}
                </Badge>
              ))}
            </div>
            <h1 className="mt-2 text-3xl font-bold sm:text-4xl md:text-5xl">{packageData.title}</h1>
            <p className="mt-2 text-xl">{packageData.destination}</p>

            <div className="mt-4 flex flex-wrap items-center gap-4">
              <div className="flex items-center">
                <Star className="mr-1 h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{packageData.rating}</span>
                <span className="ml-1 text-sm">({packageData.reviews} reviews)</span>
              </div>

              {packageData.customizable && (
                <Badge variant="outline" className="border-white text-white">
                  🛠️ Customizable
                </Badge>
              )}

              <Badge variant="outline" className="border-white text-white">
                ⚡ {packageData.bookingType}
              </Badge>

              {packageData.cancellationPolicy && (
                <Badge variant="outline" className="border-white text-white">
                  ✅ {packageData.cancellationPolicy}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left column - Package details */}
          <div className="lg:col-span-2">
            {/* Quick summary */}
            <Card className="mb-8 overflow-hidden">
              <CardContent className="p-0">
                <div className="grid grid-cols-1 divide-y sm:grid-cols-2 sm:divide-x sm:divide-y-0 md:grid-cols-5">
                  <div className="p-4">
                    <p className="text-sm text-muted-foreground">Duration</p>
                    <p className="font-medium">{packageData.duration}</p>
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-muted-foreground">Departure</p>
                    <p className="font-medium">{packageData.departureCity}</p>
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-muted-foreground">Travel Dates</p>
                    <p className="font-medium">Available year-round</p>
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-muted-foreground">Price Includes</p>
                    <div className="flex flex-wrap gap-1">
                      {packageData.included?.map((item: string) => (
                        <Badge key={item} variant="outline" className="bg-blue-50">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="bg-green-50 p-4">
                    <p className="text-sm text-muted-foreground">Total Price</p>
                    <p className="text-xl font-bold text-green-600">
                      ${packageData.totalPrice}{" "}
                      <span className="text-sm font-normal text-muted-foreground">{packageData.priceType}</span>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Package description */}
            <div className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold">About This Package</h2>
              <p className="text-muted-foreground">{packageData.description}</p>

              <div className="mt-6 flex flex-wrap gap-4">
                <div className="flex items-center">
                  <Plane className="mr-2 h-5 w-5 text-blue-500" />
                  <span>Flights included</span>
                </div>
                <div className="flex items-center">
                  <Hotel className="mr-2 h-5 w-5 text-blue-500" />
                  <span>Quality accommodations</span>
                </div>
                <div className="flex items-center">
                  <Utensils className="mr-2 h-5 w-5 text-blue-500" />
                  <span>Selected meals</span>
                </div>
                <div className="flex items-center">
                  <Car className="mr-2 h-5 w-5 text-blue-500" />
                  <span>Transfers included</span>
                </div>
                <div className="flex items-center">
                  <Map className="mr-2 h-5 w-5 text-blue-500" />
                  <span>Guided experiences</span>
                </div>
              </div>
            </div>

            {/* What's included */}
            <div className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold">What's Included</h2>

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="flights">
                  <AccordionTrigger>
                    <div className="flex items-center">
                      <Plane className="mr-2 h-5 w-5" />
                      <span>Flights</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="ml-7 list-disc space-y-2 text-muted-foreground">
                      <li>Round-trip economy class flights from {packageData.departureCity.replace("From ", "")}</li>
                      <li>All taxes and surcharges included</li>
                      <li>23kg checked baggage allowance</li>
                      <li>Option to upgrade to premium economy or business class (additional cost)</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="accommodation">
                  <AccordionTrigger>
                    <div className="flex items-center">
                      <Hotel className="mr-2 h-5 w-5" />
                      <span>Accommodation</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="ml-7 list-disc space-y-2 text-muted-foreground">
                      <li>{packageData.duration.split("/")[0]} in handpicked quality accommodations</li>
                      <li>All accommodation taxes and service charges</li>
                      <li>Options for room upgrades available (additional cost)</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="meals">
                  <AccordionTrigger>
                    <div className="flex items-center">
                      <Utensils className="mr-2 h-5 w-5" />
                      <span>Meals</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="ml-7 list-disc space-y-2 text-muted-foreground">
                      <li>Daily breakfast at your accommodation</li>
                      <li>3 lunches at local restaurants</li>
                      <li>2 special dinners including welcome and farewell meals</li>
                      <li>Bottled water during excursions</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="transfers">
                  <AccordionTrigger>
                    <div className="flex items-center">
                      <Car className="mr-2 h-5 w-5" />
                      <span>Transfers</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="ml-7 list-disc space-y-2 text-muted-foreground">
                      <li>Private airport transfers on arrival and departure</li>
                      <li>All transportation between destinations</li>
                      <li>Air-conditioned vehicles with professional drivers</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="activities">
                  <AccordionTrigger>
                    <div className="flex items-center">
                      <Map className="mr-2 h-5 w-5" />
                      <span>Activities & Experiences</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="ml-7 list-disc space-y-2 text-muted-foreground">
                      <li>All sightseeing as per itinerary</li>
                      <li>Professional English-speaking guides</li>
                      <li>Entrance fees to all attractions in the itinerary</li>
                      <li>Special cultural experiences and activities</li>
                      <li>Optional activities available (additional cost)</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Itinerary */}
            <div className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold">Your Itinerary</h2>

              <div className="space-y-6">
                {itinerary.map((day) => (
                  <Card key={day.day} className="overflow-hidden">
                    <div className="flex items-center justify-between border-b bg-muted/30 p-4">
                      <div className="flex items-center">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
                          {day.day}
                        </div>
                        <h3 className="ml-3 text-lg font-medium">{day.title}</h3>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <p className="mb-4 text-muted-foreground">{day.description}</p>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <div>
                          <h4 className="mb-2 font-medium">Activities</h4>
                          <ul className="space-y-1 text-sm text-muted-foreground">
                            {day.activities.map((activity, index) => (
                              <li key={index} className="flex items-center">
                                <Check className="mr-2 h-4 w-4 text-green-500" />
                                {activity}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="mb-2 font-medium">Meals</h4>
                          <ul className="space-y-1 text-sm text-muted-foreground">
                            {day.meals.map((meal, index) => (
                              <li key={index} className="flex items-center">
                                <Utensils className="mr-2 h-4 w-4 text-blue-500" />
                                {meal}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="mb-2 font-medium">Accommodation</h4>
                          <p className="text-sm text-muted-foreground">
                            {day.accommodation === "N/A" ? (
                              <span className="flex items-center">
                                <X className="mr-2 h-4 w-4 text-muted-foreground" />
                                Not included
                              </span>
                            ) : (
                              <span className="flex items-center">
                                <Hotel className="mr-2 h-4 w-4 text-blue-500" />
                                {day.accommodation}
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Cancellation policy */}
            <div className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold">Cancellation Policy</h2>
              <Card>
                <CardContent className="p-4">
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start">
                      <Check className="mr-2 mt-1 h-4 w-4 text-green-500 flex-shrink-0" />
                      <span>Free cancellation up to 30 days before departure</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="mr-2 mt-1 h-4 w-4 text-green-500 flex-shrink-0" />
                      <span>75% refund for cancellations 15-29 days before departure</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="mr-2 mt-1 h-4 w-4 text-green-500 flex-shrink-0" />
                      <span>50% refund for cancellations 7-14 days before departure</span>
                    </li>
                    <li className="flex items-start">
                      <X className="mr-2 mt-1 h-4 w-4 text-red-500 flex-shrink-0" />
                      <span>No refund for cancellations less than 7 days before departure</span>
                    </li>
                  </ul>

                  <div className="mt-4 rounded-lg bg-blue-50 p-3 text-sm">
                    <p className="font-medium text-blue-800">Payment Terms</p>
                    <p className="mt-1 text-blue-700">
                      20% deposit required at booking, with the remaining balance due 45 days before departure. Flexible
                      payment plans available upon request.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Reviews */}
            <div className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold">Traveler Reviews</h2>

              <div className="space-y-4">
                {reviews.map((review, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium">{review.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {review.date} • {review.tripType}
                          </p>
                        </div>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="mt-3 text-muted-foreground">{review.comment}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Button variant="outline" className="mt-4 w-full">
                View All Reviews ({packageData.reviews})
              </Button>
            </div>

            {/* FAQs */}
            <div className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold">Frequently Asked Questions</h2>

              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`faq-${index}`}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>

          {/* Right column - Booking sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <Card className="overflow-hidden">
                <div className="bg-primary p-4 text-white">
                  <h3 className="text-xl font-semibold">Book This Package</h3>
                  <p className="text-primary-foreground">Secure your dream vacation today</p>
                </div>

                <CardContent className="p-4">
                  <div className="mb-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Package price</span>
                      <span className="font-medium">${packageData.totalPrice}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Taxes & fees</span>
                      <span className="font-medium">Included</span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between">
                        <span className="font-medium">Total price</span>
                        <span className="text-xl font-bold text-green-600">${packageData.totalPrice}</span>
                      </div>
                      <p className="text-right text-sm text-muted-foreground">{packageData.priceType}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button className="w-full">Book Now</Button>
                    <Button variant="outline" className="w-full">
                      Enquire
                    </Button>
                    <Button variant="ghost" className="w-full" onClick={() => setSaved(!saved)}>
                      <Heart className={`mr-2 h-4 w-4 ${saved ? "fill-red-500 text-red-500" : ""}`} />
                      {saved ? "Saved" : "Save for Later"}
                    </Button>
                  </div>

                  <div className="mt-6 rounded-lg bg-blue-50 p-3 text-sm">
                    <p className="font-medium text-blue-800">Secure your spot!</p>
                    <p className="mt-1 text-blue-700">
                      Only 20% deposit required today, with flexible payment options available.
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-center">
                    <Button variant="link" className="text-sm">
                      <Share2 className="mr-1 h-4 w-4" />
                      Share this package
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-4 overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-center">
                    <MessageCircle className="mr-3 h-10 w-10 text-primary" />
                    <div>
                      <h3 className="font-medium">Need help?</h3>
                      <p className="text-sm text-muted-foreground">Our travel experts are here for you</p>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2">
                    <Button variant="outline" className="w-full">
                      Chat with an Expert
                    </Button>
                    <Button variant="outline" className="w-full">
                      Request a Call Back
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
