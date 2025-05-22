"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Phone } from "lucide-react"
import { DialogFooter } from "@/components/ui/dialog"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
    bestTimeToCall: "anytime",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      console.log("Form submitted:", formData)
      setIsSubmitting(false)
      setFormData({
        name: "",
        phone: "",
        email: "",
        message: "",
        bestTimeToCall: "anytime",
      })
      alert("Thank you! Our travel expert will call you back shortly.")
    }, 1000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Your Name</Label>
        <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+1 (555) 123-4567"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="john@example.com"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="bestTimeToCall">Best Time to Call</Label>
        <select
          id="bestTimeToCall"
          name="bestTimeToCall"
          value={formData.bestTimeToCall}
          onChange={handleChange}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <option value="anytime">Anytime</option>
          <option value="morning">Morning (9AM - 12PM)</option>
          <option value="afternoon">Afternoon (12PM - 5PM)</option>
          <option value="evening">Evening (5PM - 8PM)</option>
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message (Optional)</Label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us about your travel plans or any specific questions..."
          rows={3}
        />
      </div>

      <DialogFooter>
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            "Submitting..."
          ) : (
            <>
              <Phone className="mr-2 h-4 w-4" /> Request Call Back
            </>
          )}
        </Button>
      </DialogFooter>
    </form>
  )
}
