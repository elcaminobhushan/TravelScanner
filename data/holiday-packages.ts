export const holidayPackages = [
  {
    id: "1",
    destination: "Maldives",
    title: "Maldives Honeymoon Escape",
    description:
      "Experience the ultimate romantic getaway in the pristine islands of the Maldives with luxury overwater accommodations.",
    image: "/placeholder.svg?height=400&width=600&text=Maldives+Package",
    duration: "5 Nights / 6 Days",
    departureCity: "From New York (JFK)",
    packageTypes: ["Honeymoon", "Luxury"],
    included: ["Flights", "Hotels", "Meals", "Transfers", "Activities"],
    totalPrice: 5998,
    priceType: "per couple" as const,
    cancellationPolicy: "Free cancellation",
    rating: 4.8,
    reviews: 230,
    customizable: true,
    bookingType: "Instant Book" as const,
  },
  {
    id: "2",
    destination: "Rome, Italy",
    title: "Italian Cultural Discovery",
    description:
      "Immerse yourself in the rich history and culture of Rome with guided tours of iconic landmarks and authentic Italian experiences.",
    image: "/placeholder.svg?height=400&width=600&text=Rome+Package",
    duration: "7 Nights / 8 Days",
    departureCity: "From Chicago (ORD)",
    packageTypes: ["Cultural", "Family"],
    included: ["Flights", "Hotels", "Breakfast", "Guided Tours"],
    totalPrice: 2499,
    priceType: "per person" as const,
    cancellationPolicy: "Free cancellation",
    rating: 4.6,
    reviews: 189,
    customizable: true,
    bookingType: "On Request" as const,
  },
  {
    id: "3",
    destination: "Swiss Alps",
    title: "Alpine Adventure Expedition",
    description:
      "Embark on an exhilarating adventure in the majestic Swiss Alps with skiing, hiking, and breathtaking mountain views.",
    image: "/placeholder.svg?height=400&width=600&text=Swiss+Alps+Package",
    duration: "6 Nights / 7 Days",
    departureCity: "From Boston (BOS)",
    packageTypes: ["Adventure", "Winter"],
    included: ["Flights", "Mountain Lodge", "Full Board", "Activities", "Equipment"],
    totalPrice: 3299,
    priceType: "per person" as const,
    cancellationPolicy: "Free cancellation",
    rating: 4.9,
    reviews: 176,
    customizable: false,
    bookingType: "Instant Book" as const,
  },
  {
    id: "4",
    destination: "Bali, Indonesia",
    title: "Bali Family Paradise",
    description:
      "Create unforgettable family memories in the tropical paradise of Bali with a perfect blend of adventure, culture, and relaxation.",
    image: "/placeholder.svg?height=400&width=600&text=Bali+Package",
    duration: "8 Nights / 9 Days",
    departureCity: "From Los Angeles (LAX)",
    packageTypes: ["Family", "Beach"],
    included: ["Flights", "Villa", "Breakfast", "Transfers", "Activities"],
    totalPrice: 7999,
    priceType: "total" as const,
    cancellationPolicy: "Free cancellation",
    rating: 4.7,
    reviews: 267,
    customizable: true,
    bookingType: "Instant Book" as const,
  },
  {
    id: "5",
    destination: "Tokyo, Japan",
    title: "Japan Cultural Immersion",
    description:
      "Discover the fascinating blend of ancient traditions and modern innovations in Tokyo with guided cultural experiences.",
    image: "/placeholder.svg?height=400&width=600&text=Tokyo+Package",
    duration: "10 Nights / 11 Days",
    departureCity: "From Seattle (SEA)",
    packageTypes: ["Cultural", "Group"],
    included: ["Flights", "Hotels", "Rail Pass", "Guided Tours"],
    totalPrice: 3899,
    priceType: "per person" as const,
    cancellationPolicy: "Free cancellation",
    rating: 4.8,
    reviews: 154,
    customizable: false,
    bookingType: "On Request" as const,
  },
  {
    id: "6",
    destination: "Safari, Kenya",
    title: "African Safari Adventure",
    description:
      "Experience the ultimate wildlife adventure with guided safari drives through Kenya's most spectacular national parks.",
    image: "/placeholder.svg?height=400&width=600&text=Safari+Package",
    duration: "7 Nights / 8 Days",
    departureCity: "From Atlanta (ATL)",
    packageTypes: ["Adventure", "Wildlife"],
    included: ["Flights", "Lodges", "Full Board", "Safari Drives", "Transfers"],
    totalPrice: 4599,
    priceType: "per person" as const,
    cancellationPolicy: "Free cancellation",
    rating: 4.9,
    reviews: 312,
    customizable: true,
    bookingType: "On Request" as const,
  },
]
