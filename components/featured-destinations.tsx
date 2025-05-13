import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

const featuredDestinations = [
  {
    id: 1,
    name: "Bali, Indonesia",
    image: "/placeholder.svg?height=400&width=600",
    packages: 24,
  },
  {
    id: 2,
    name: "Rome, Italy",
    image: "/placeholder.svg?height=400&width=600",
    packages: 18,
  },
  {
    id: 3,
    name: "Maldives",
    image: "/placeholder.svg?height=400&width=600",
    packages: 15,
  },
  {
    id: 4,
    name: "Swiss Alps",
    image: "/placeholder.svg?height=400&width=600",
    packages: 12,
  },
]

export default function FeaturedDestinations() {
  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Featured Destinations</h2>
        <Link href="/destinations" className="text-sm font-medium text-teal-600 hover:underline">
          View all destinations
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {featuredDestinations.map((destination) => (
          <Link key={destination.id} href={`/destinations/${destination.id}`}>
            <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
              <div className="relative h-48">
                <Image
                  src={destination.image || "/placeholder.svg"}
                  alt={destination.name}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold">{destination.name}</h3>
                <p className="text-sm text-muted-foreground">{destination.packages} packages</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
