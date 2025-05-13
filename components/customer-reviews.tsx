"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Star, ThumbsUp, MessageSquare } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface CustomerReviewsProps {
  packages: any[]
}

export default function CustomerReviews({ packages }: CustomerReviewsProps) {
  const [activePackage, setActivePackage] = useState<string>(packages[0]?.id || "")

  // Mock reviews data
  const getReviews = (packageId: string) => {
    const pkg = packages.find((p) => p.id === packageId)
    if (!pkg) return []

    // Generate mock reviews based on the package rating
    const reviews = []
    const reviewCount = pkg.reviews > 10 ? 10 : pkg.reviews

    for (let i = 0; i < reviewCount; i++) {
      // Distribute ratings around the package rating
      let rating = pkg.rating
      if (i % 3 === 0) rating = Math.max(1, Math.round(rating - 0.5))
      if (i % 7 === 0) rating = Math.min(5, Math.round(rating + 0.5))

      reviews.push({
        id: `review-${packageId}-${i}`,
        author: `Guest ${i + 1}`,
        date: `${new Date().getMonth() + 1}/${new Date().getDate()}/${new Date().getFullYear()}`,
        rating,
        comment:
          i % 5 === 0
            ? "This was an amazing experience! The accommodations were perfect and the staff went above and beyond. Would definitely recommend this package to anyone looking for a memorable vacation."
            : i % 4 === 0
              ? "Great value for money. The location was perfect and the included activities were well organized. Only minor issue was the airport transfer was slightly delayed on arrival."
              : i % 3 === 0
                ? "This was the perfect getaway! Everything was as described and the itinerary was well-balanced between activities and relaxation time. Can't wait to book another trip!"
                : i % 2 === 0
                  ? "The hotel was beautiful and the food was delicious. The only downside was that some of the activities were weather dependent and we had a couple of rainy days."
                  : "Excellent service from start to finish. The booking process was smooth and the holiday itself exceeded our expectations. Highly recommended!",
        helpful: Math.floor(Math.random() * 20),
      })
    }

    return reviews
  }

  // Calculate rating distribution for a package
  const getRatingDistribution = (packageId: string) => {
    const pkg = packages.find((p) => p.id === packageId)
    if (!pkg) return { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }

    // Mock distribution based on overall rating
    const baseRating = Math.round(pkg.rating)
    const total = pkg.reviews

    const distribution: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }

    // Higher concentration around the base rating
    distribution[baseRating] = Math.round(total * 0.5) // 50% at the base rating

    // Distribute the rest
    if (baseRating < 5) distribution[baseRating + 1] = Math.round(total * 0.2)
    if (baseRating > 1) distribution[baseRating - 1] = Math.round(total * 0.2)

    // Fill in the rest
    let remaining = total - Object.values(distribution).reduce((a, b) => a + b, 0)
    for (let i = 5; i >= 1 && remaining > 0; i--) {
      if (i !== baseRating && i !== baseRating + 1 && i !== baseRating - 1) {
        distribution[i] = Math.min(remaining, Math.round(total * 0.05))
        remaining -= distribution[i]
      }
    }

    // Adjust if there's still remaining
    if (remaining > 0) distribution[baseRating] += remaining

    return distribution
  }

  const selectedPackage = packages.find((p) => p.id === activePackage)
  const reviews = getReviews(activePackage)
  const ratingDistribution = getRatingDistribution(activePackage)

  return (
    <div>
      <Tabs
        defaultValue={packages[0]?.id || ""}
        value={activePackage}
        onValueChange={(value) => {
          if (value !== activePackage) {
            setActivePackage(value)
          }
        }}
        className="w-full"
      >
        <TabsList className="mb-6 grid w-full grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
          {packages.map((pkg) => (
            <TabsTrigger key={pkg.id} value={pkg.id} className="text-xs sm:text-sm">
              {pkg.title.length > 15 ? pkg.title.substring(0, 15) + "..." : pkg.title}
            </TabsTrigger>
          ))}
        </TabsList>

        {packages.map((pkg) => (
          <TabsContent key={pkg.id} value={pkg.id} className="mt-0">
            {selectedPackage && (
              <div className="grid gap-6 md:grid-cols-3">
                <div className="md:col-span-1">
                  <Card>
                    <CardContent className="p-6">
                      <div className="text-center">
                        <div className="mb-2 text-4xl font-bold">{pkg.rating.toFixed(1)}</div>
                        <div className="mb-4 flex justify-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-5 w-5 ${
                                star <= Math.round(pkg.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <div className="text-sm text-muted-foreground">Based on {pkg.reviews} reviews</div>
                      </div>

                      <div className="mt-6 space-y-2">
                        {[5, 4, 3, 2, 1].map((rating) => {
                          const count = ratingDistribution[rating]
                          const percentage = pkg.reviews > 0 ? Math.round((count / pkg.reviews) * 100) : 0

                          return (
                            <div key={rating} className="flex items-center gap-2">
                              <div className="flex w-12 items-center gap-1">
                                <span>{rating}</span>
                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              </div>
                              <Progress value={percentage} className="h-2" />
                              <div className="w-12 text-right text-xs text-muted-foreground">{percentage}%</div>
                            </div>
                          )
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="md:col-span-2">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="mb-4 text-lg font-semibold">Recent Reviews</h3>

                      {reviews.length > 0 ? (
                        <div className="space-y-4">
                          {reviews.slice(0, 5).map((review) => (
                            <div key={review.id} className="border-b pb-4 last:border-0">
                              <div className="flex items-center justify-between">
                                <div className="font-medium">{review.author}</div>
                                <div className="text-sm text-muted-foreground">{review.date}</div>
                              </div>
                              <div className="my-1 flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    className={`h-4 w-4 ${
                                      star <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                              <p className="mt-2 text-sm text-muted-foreground">{review.comment}</p>
                              <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <ThumbsUp className="h-3 w-3" />
                                  <span>{review.helpful} found this helpful</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <MessageSquare className="h-3 w-3" />
                                  <span>Reply</span>
                                </div>
                              </div>
                            </div>
                          ))}

                          {reviews.length > 5 && (
                            <div className="mt-4 text-center">
                              <button className="text-sm font-medium text-teal-600 hover:underline">
                                View all {reviews.length} reviews
                              </button>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="rounded-lg border border-dashed p-6 text-center text-muted-foreground">
                          No reviews available for this package
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
