import ContactForm from "@/components/contact-form"
import { Mail, MapPin, Phone } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Contact Us</h1>
          <p className="mt-4 text-muted-foreground">
            Have questions about our holiday packages or need assistance with your booking? Get in touch with our team.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center rounded-lg border bg-card p-6 text-center shadow-sm">
            <div className="mb-4 rounded-full bg-teal-100 p-3">
              <Phone className="h-6 w-6 text-teal-600" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">Phone</h3>
            <p className="text-muted-foreground">Mon-Fri from 8am to 8pm</p>
            <a href="tel:+1234567890" className="mt-2 font-medium text-teal-600 hover:underline">
              +1 (234) 567-890
            </a>
          </div>

          <div className="flex flex-col items-center rounded-lg border bg-card p-6 text-center shadow-sm">
            <div className="mb-4 rounded-full bg-teal-100 p-3">
              <Mail className="h-6 w-6 text-teal-600" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">Email</h3>
            <p className="text-muted-foreground">We'll respond as soon as possible</p>
            <a href="mailto:info@holidaycompare.com" className="mt-2 font-medium text-teal-600 hover:underline">
              info@holidaycompare.com
            </a>
          </div>

          <div className="flex flex-col items-center rounded-lg border bg-card p-6 text-center shadow-sm">
            <div className="mb-4 rounded-full bg-teal-100 p-3">
              <MapPin className="h-6 w-6 text-teal-600" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">Office</h3>
            <p className="text-muted-foreground">123 Travel Street</p>
            <p className="text-muted-foreground">New York, NY 10001</p>
          </div>
        </div>

        <div className="mt-12 rounded-xl border bg-card p-6 shadow-sm md:p-8">
          <h2 className="mb-6 text-2xl font-bold">Send Us a Message</h2>
          <ContactForm />
        </div>
      </div>
    </div>
  )
}
