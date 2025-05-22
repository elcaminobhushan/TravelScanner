"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"

interface Destination {
  name: string
  image: string
  packages: number
}

interface DestinationsCarouselProps {
  destinations: Destination[]
}

export default function DestinationsCarousel({ destinations }: DestinationsCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    // Clone the first few items and append them to the end for seamless looping
    const scrollWidth = scrollContainer.scrollWidth
    const clientWidth = scrollContainer.clientWidth

    let scrollPos = 0
    const scrollSpeed = 0.5 // pixels per frame
    let animationFrameId: number

    const scroll = () => {
      if (!scrollContainer) return

      scrollPos += scrollSpeed
      // Reset position when we've scrolled through the original items
      if (scrollPos >= scrollWidth / 2) {
        scrollPos = 0
      }

      scrollContainer.scrollLeft = scrollPos
      animationFrameId = requestAnimationFrame(scroll)
    }

    // Start the animation
    animationFrameId = requestAnimationFrame(scroll)

    // Pause animation on hover or touch
    const pauseAnimation = () => cancelAnimationFrame(animationFrameId)
    const resumeAnimation = () => {
      animationFrameId = requestAnimationFrame(scroll)
    }

    scrollContainer.addEventListener("mouseenter", pauseAnimation)
    scrollContainer.addEventListener("mouseleave", resumeAnimation)
    scrollContainer.addEventListener("touchstart", pauseAnimation)
    scrollContainer.addEventListener("touchend", resumeAnimation)

    return () => {
      cancelAnimationFrame(animationFrameId)
      scrollContainer.removeEventListener("mouseenter", pauseAnimation)
      scrollContainer.removeEventListener("mouseleave", resumeAnimation)
      scrollContainer.removeEventListener("touchstart", pauseAnimation)
      scrollContainer.removeEventListener("touchend", resumeAnimation)
    }
  }, [])

  // Double the destinations array to create a seamless loop
  const extendedDestinations = [...destinations, ...destinations]

  return (
    <div className="relative overflow-hidden">
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {extendedDestinations.map((destination, index) => (
          <Link
            key={`${destination.name}-${index}`}
            href={`/destinations/${destination.name.toLowerCase()}`}
            className="group flex-shrink-0"
          >
            <div className="relative h-64 w-96 overflow-hidden rounded-lg">
              <Image
                src={destination.image || "/placeholder.svg"}
                alt={destination.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl font-medium text-white">{destination.name}</h3>
                <p className="mt-1 text-sm text-white/80">{destination.packages} packages</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
