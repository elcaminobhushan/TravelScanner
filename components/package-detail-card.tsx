"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, Star, MapPin, Calendar, Users, Check } from "lucide-react"
import { Separator } from "@/components/ui/separator"

interface PackageDetailCardProps {
  package: any
  onClose: () => void
}

export default function PackageDetailCard({ package: pkg, onClose }: PackageDetailCardProps) {
  if (!pkg) return null

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">{pkg.title}</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <div className="relative h-[200px] w-full overflow-hidden rounded-lg">
            <Image src={pkg.image || "/placeholder.svg"} alt={pkg.title} fill className="object-cover" />
            {pkg.discount > 0 && (
              <Badge className="absolute left-2 top-2 bg-green-600 hover:bg-green-700">{pkg.discount}% OFF</Badge>
            )}
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">{pkg.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{pkg.rating}</span>
              <span className="text-sm text-muted-foreground">({pkg.reviews} reviews)</span>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-muted-foreground">Duration</div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4 text-blue-600" />
                <span>{pkg.duration} nights</span>
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Travelers</div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4 text-purple-600" />
                <span>2 adults</span>
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Room Type</div>
              <div>{pkg.roomType || "Standard Room"}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Meals</div>
              <div>{pkg.meals || "Not included"}</div>
            </div>
          </div>
        </div>

        <div>
          <div className="mb-4 rounded-lg bg-muted/30 p-4">
            <div className="mb-2 text-sm text-muted-foreground">Price per person</div>
            <div className="flex items-baseline gap-2">
              {pkg.discount > 0 && (
                <span className="text-sm line-through text-muted-foreground">
                  ${Math.round(pkg.price / (1 - pkg.discount / 100))}
                </span>
              )}
              <span className="text-3xl font-bold text-green-600">${pkg.price}</span>
            </div>
            {pkg.discount > 0 && (
              <div className="mt-1 text-sm text-green-600">
                You save ${Math.round(pkg.price / (1 - pkg.discount / 100)) - pkg.price}
              </div>
            )}
          </div>

          <div className="mb-4">
            <h3 className="mb-2 font-medium">Description</h3>
            <p className="text-sm text-muted-foreground">{pkg.description}</p>
          </div>

          <div>
            <h3 className="mb-2 font-medium">Package Highlights</h3>
            <ul className="space-y-1">
              {pkg.highlights ? (
                pkg.highlights.map((highlight: string, index: number) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 h-3.5 w-3.5 text-green-600" />
                    <span>{highlight}</span>
                  </li>
                ))
              ) : (
                <li className="text-sm text-muted-foreground">No highlights available</li>
              )}
            </ul>
          </div>

          <div className="mt-6 flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button>Book Now</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
