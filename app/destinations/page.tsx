import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

const destinations = [
  {
    id: 1,
    name: "Bali, Indonesia",
    description: "Tropical paradise with beautiful beaches, lush rice terraces, and vibrant culture.",
    image: "/placeholder.svg?height=400&width=600",
    packages: 24,
    type: "Beach",
  },
  {
    id: 2,
    name: "Rome, Italy",
    description: "Ancient city with historic landmarks, world-class museums, and delicious cuisine.",
    image: "/placeholder.svg?height=400&width=600",
    packages: 18,
    type: "City",
  },
  {
    id: 3,
    name: "Maldives",
    description: "Stunning island paradise with crystal clear waters, white sand beaches, and luxury resorts.",
    image: "/placeholder.svg?height=400&width=600",
    packages: 15,
    type: "Luxury",
  },
  {
    id: 4,
    name: "Swiss Alps, Switzerland",
    description: "Breathtaking mountain scenery with world-class skiing, hiking, and charming villages.",
    image: "/placeholder.svg?height=400&width=600",
    packages: 12,
    type: "Adventure",
  },
  {
    id: 5,
    name: "Barcelona, Spain",
    description: "Vibrant city with unique architecture, beautiful beaches, and lively atmosphere.",
    image: "/placeholder.svg?height=400&width=600",
    packages: 20,
    type: "City",
  },
  {
    id: 6,
    name: "Phuket, Thailand",
    description: "Popular island destination with stunning beaches, clear waters, and vibrant nightlife.",
    image: "/placeholder.svg?height=400&width=600",
    packages: 22,
    type: "Beach",
  },
  {
    id: 7,
    name: "Paris, France",
    description: "Romantic city known for its iconic landmarks, art museums, and charming neighborhoods.",
    image: "/placeholder.svg?height=400&width=600",
    packages: 19,
    type: "City",
  },
  {
    id: 8,
    name: "Santorini, Greece",
    description: "Stunning island with white-washed buildings, blue domes, and breathtaking sunsets.",
    image: "/placeholder.svg?height=400&width=600",
    packages: 14,
    type: "Beach",
  },
  {
    id: 9,
    name: "Tokyo, Japan",
    description: "Vibrant metropolis blending ultramodern and traditional, with amazing food and culture.",
    image: "/placeholder.svg?height=400&width=600",
    packages: 16,
    type: "City",
  },
  {
    id: 10,
    name: "Queenstown, New Zealand",
    description: "Adventure capital with stunning landscapes, outdoor activities, and adrenaline sports.",
    image: "/placeholder.svg?height=400&width=600",
    packages: 10,
    type: "Adventure",
  },
  {
    id: 11,
    name: "Machu Picchu, Peru",
    description: "Ancient Incan citadel set high in the Andes Mountains, offering incredible views and history.",
    image: "/placeholder.svg?height=400&width=600",
    packages: 8,
    type: "Adventure",
  },
  {
    id: 12,
    name: "Dubai, UAE",
    description: "Modern city with futuristic architecture, luxury shopping, and desert adventures.",
    image: "/placeholder.svg?height=400&width=600",
    packages: 17,
    type: "Luxury",
  },
]

export default function DestinationsPage() {
  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Explore Destinations</h1>
        <p className="mt-4 text-muted-foreground">
          Discover amazing destinations around the world and find the perfect holiday package.
        </p>
      </div>

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input type="search" placeholder="Search destinations..." className="pl-9" />
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/destinations?type=all"
            className="rounded-full bg-teal-100 px-4 py-1 text-sm font-medium text-teal-800 hover:bg-teal-200"
          >
            All
          </Link>
          <Link
            href="/destinations?type=beach"
            className="rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-800 hover:bg-blue-200"
          >
            Beach
          </Link>
          <Link
            href="/destinations?type=city"
            className="rounded-full bg-purple-100 px-4 py-1 text-sm font-medium text-purple-800 hover:bg-purple-200"
          >
            City
          </Link>
          <Link
            href="/destinations?type=adventure"
            className="rounded-full bg-orange-100 px-4 py-1 text-sm font-medium text-orange-800 hover:bg-orange-200"
          >
            Adventure
          </Link>
          <Link
            href="/destinations?type=luxury"
            className="rounded-full bg-rose-100 px-4 py-1 text-sm font-medium text-rose-800 hover:bg-rose-200"
          >
            Luxury
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {destinations.map((destination) => (
          <Link key={destination.id} href={`/destinations/${destination.id}`}>
            <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-md">
              <div className="relative h-48">
                <Image
                  src={destination.image || "/placeholder.svg"}
                  alt={destination.name}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 pt-8">
                  <div className="text-white">
                    <h3 className="font-semibold">{destination.name}</h3>
                  </div>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="rounded-full bg-teal-100 px-2 py-0.5 text-xs font-medium text-teal-800">
                    {destination.type}
                  </span>
                  <span className="text-sm text-muted-foreground">{destination.packages} packages</span>
                </div>
                <p className="line-clamp-2 text-sm text-muted-foreground">{destination.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
