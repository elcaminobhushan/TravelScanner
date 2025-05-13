import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">About HolidayCompare</h1>
          <p className="mt-4 text-muted-foreground">
            We're on a mission to help travelers find the perfect holiday packages at the best prices.
          </p>
        </div>

        <div className="grid gap-12">
          <section className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="mb-4 text-2xl font-bold">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  HolidayCompare was founded in 2020 by a group of travel enthusiasts who were frustrated with the
                  complexity of finding and comparing holiday packages across multiple websites.
                </p>
                <p>
                  We set out to create a platform that simplifies the process of finding the perfect holiday package by
                  bringing together offers from hundreds of travel providers in one place, with transparent pricing and
                  detailed information.
                </p>
                <p>
                  Today, we help thousands of travelers every month find their dream vacations at the best possible
                  prices, saving them both time and money.
                </p>
              </div>
            </div>
            <div className="relative h-[300px] overflow-hidden rounded-xl">
              <Image src="/placeholder.svg?height=600&width=800" alt="Our team" fill className="object-cover" />
            </div>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-center">Our Values</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div className="mb-4 rounded-full bg-teal-100 p-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6 text-teal-600"
                    >
                      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                      <path d="M12 9v4" />
                      <path d="M12 17h.01" />
                    </svg>
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">Transparency</h3>
                  <p className="text-muted-foreground">
                    We believe in complete transparency in pricing and package details, with no hidden fees or
                    surprises.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div className="mb-4 rounded-full bg-teal-100 p-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6 text-teal-600"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">Trust</h3>
                  <p className="text-muted-foreground">
                    We build trust through honest reviews, secure booking processes, and exceptional customer service.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div className="mb-4 rounded-full bg-teal-100 p-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6 text-teal-600"
                    >
                      <path d="M12 2v8" />
                      <path d="m4.93 10.93 1.41 1.41" />
                      <path d="M2 18h2" />
                      <path d="M20 18h2" />
                      <path d="m19.07 10.93-1.41 1.41" />
                      <path d="M22 22H2" />
                      <path d="m16 6-4 4-4-4" />
                      <path d="M16 18a4 4 0 0 0-8 0" />
                    </svg>
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">Innovation</h3>
                  <p className="text-muted-foreground">
                    We continuously innovate to provide the best tools and features to help you find your perfect
                    holiday.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-center">Our Team</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex flex-col items-center text-center">
                  <div className="mb-4 h-32 w-32 overflow-hidden rounded-full">
                    <Image
                      src={`/placeholder.svg?height=200&width=200&text=Team Member ${i}`}
                      alt={`Team member ${i}`}
                      width={128}
                      height={128}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-semibold">Team Member {i}</h3>
                  <p className="text-sm text-muted-foreground">Position Title</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-bold text-center">Photo Gallery</h2>
            <Tabs defaultValue="office" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="office">Our Office</TabsTrigger>
                <TabsTrigger value="team">Team Events</TabsTrigger>
                <TabsTrigger value="travel">Travel Moments</TabsTrigger>
              </TabsList>
              <TabsContent value="office" className="mt-6">
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="relative aspect-square overflow-hidden rounded-lg">
                      <Image
                        src={`/placeholder.svg?height=300&width=300&text=Office ${i}`}
                        alt={`Office photo ${i}`}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="team" className="mt-6">
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="relative aspect-square overflow-hidden rounded-lg">
                      <Image
                        src={`/placeholder.svg?height=300&width=300&text=Team ${i}`}
                        alt={`Team event photo ${i}`}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="travel" className="mt-6">
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="relative aspect-square overflow-hidden rounded-lg">
                      <Image
                        src={`/placeholder.svg?height=300&width=300&text=Travel ${i}`}
                        alt={`Travel photo ${i}`}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </section>
        </div>
      </div>
    </div>
  )
}
