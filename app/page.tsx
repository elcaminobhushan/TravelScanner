import HolidayPackages from "@/components/holiday-packages"
import SearchHero from "@/components/search-hero"
import FeaturedDestinations from "@/components/featured-destinations"
import WhyChooseUs from "@/components/why-choose-us"
import Newsletter from "@/components/newsletter"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <SearchHero />
      <section className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <FeaturedDestinations />
        <div className="mt-16">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight">Explore Holiday Packages</h2>
            <p className="mt-2 text-muted-foreground">
              Compare thousands of holiday packages to find the best deals for your dream vacation.
            </p>
          </div>
          <HolidayPackages />
        </div>
      </section>
      <WhyChooseUs />
      <Newsletter />
    </div>
  )
}
