import { Shield, Globe, Clock, Award } from "lucide-react"

const features = [
  {
    icon: <Globe className="h-10 w-10 text-teal-600" />,
    title: "Worldwide Destinations",
    description: "Explore thousands of holiday packages to destinations all around the world.",
  },
  {
    icon: <Shield className="h-10 w-10 text-teal-600" />,
    title: "Secure Booking",
    description: "Book with confidence knowing your payments and personal information are secure.",
  },
  {
    icon: <Clock className="h-10 w-10 text-teal-600" />,
    title: "24/7 Support",
    description: "Our customer support team is available around the clock to assist you.",
  },
  {
    icon: <Award className="h-10 w-10 text-teal-600" />,
    title: "Best Price Guarantee",
    description: "We guarantee the best prices for your holiday packages or we'll match it.",
  },
]

export default function WhyChooseUs() {
  return (
    <section className="bg-slate-50 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight">Why Choose Us</h2>
          <p className="mt-4 text-muted-foreground">
            We're dedicated to making your holiday planning experience seamless and enjoyable.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-teal-100 p-4">{feature.icon}</div>
              <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
