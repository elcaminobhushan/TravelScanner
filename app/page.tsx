import { Search } from "lucide-react"
import Link from "next/link"
import HolidayPackages from "@/components/holiday-packages"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex gap-6 md:gap-10">
            <Link href="/" className="flex items-center space-x-2">
              <span className="inline-block font-bold">HolidayCompare</span>
            </Link>
            <nav className="hidden gap-6 md:flex">
              <Link
                href="#"
                className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Destinations
              </Link>
              <Link
                href="#"
                className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Deals
              </Link>
              <Link
                href="#"
                className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                About
              </Link>
              <Link
                href="#"
                className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Contact
              </Link>
            </nav>
          </div>
          <div className="flex flex-1 items-center space-x-4 sm:justify-end">
            <div className="flex-1 sm:grow-0 sm:w-72">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search destinations..."
                  className="w-full rounded-md pl-8 md:w-[200px] lg:w-[300px]"
                />
              </div>
            </div>
            <nav className="hidden sm:flex">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
              <Button size="sm">Sign Up</Button>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-green-50 to-teal-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Find Your Perfect Holiday
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Compare thousands of holiday packages to find the best deals for your dream vacation.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <div className="flex space-x-2">
                  <Input type="text" placeholder="Where do you want to go?" />
                  <Button type="submit">Search</Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="container px-4 py-12 md:px-6">
          <Tabs defaultValue="all" className="w-full">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="all">All Packages</TabsTrigger>
                <TabsTrigger value="beach">Beach</TabsTrigger>
                <TabsTrigger value="city">City Break</TabsTrigger>
                <TabsTrigger value="adventure">Adventure</TabsTrigger>
                <TabsTrigger value="luxury">Luxury</TabsTrigger>
              </TabsList>
              <Link href="/compare" className="text-sm font-medium text-primary hover:underline">
                Compare Selected
              </Link>
            </div>
            <TabsContent value="all" className="mt-6">
              <HolidayPackages />
            </TabsContent>
            <TabsContent value="beach" className="mt-6">
              <HolidayPackages filter="beach" />
            </TabsContent>
            <TabsContent value="city" className="mt-6">
              <HolidayPackages filter="city" />
            </TabsContent>
            <TabsContent value="adventure" className="mt-6">
              <HolidayPackages filter="adventure" />
            </TabsContent>
            <TabsContent value="luxury" className="mt-6">
              <HolidayPackages filter="luxury" />
            </TabsContent>
          </Tabs>
        </section>
      </main>
      <footer className="border-t bg-muted/40">
        <div className="container flex flex-col gap-4 py-10 md:h-24 md:flex-row md:items-center md:gap-8 md:py-0">
          <div className="flex flex-1 items-center justify-center gap-4 md:justify-start">
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              © 2025 HolidayCompare. All rights reserved.
            </p>
          </div>
          <div className="flex items-center justify-center gap-4">
            <Link href="#" className="text-sm font-medium hover:underline">
              Terms
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline">
              Privacy
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
