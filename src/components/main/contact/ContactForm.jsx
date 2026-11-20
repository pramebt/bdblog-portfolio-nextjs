'use client'
import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { PaperPlaneTilt, CircleNotch } from '@phosphor-icons/react/dist/ssr'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { toast } from 'sonner'

const labelClass = 'font-mono text-[11px] font-normal uppercase tracking-[0.16em] text-muted-foreground'
const fieldClass =
  'h-11 rounded-xl border-border/70 bg-background/70 px-4 placeholder:text-muted-foreground/60 transition-colors focus:border-foreground/25 focus:bg-background'

const ContactForm = () => {
    const [isPending, setIsPending] = useState(false)
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: ''
    })
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
          ...prev,
          [name]: value
        }))
    }
      const handleSubmit = async (event) => {
        event.preventDefault()
        setIsPending(true)
    
        try {
          const form = event.currentTarget
          const formDataObj = new FormData(form)
    
          // Validate required fields
          const firstName = formDataObj.get("firstName")?.toString().trim() || ""
          const lastName = formDataObj.get("lastName")?.toString().trim() || ""
          const email = formDataObj.get("email")?.toString().trim() || ""
          const subject = formDataObj.get("subject")?.toString().trim() || ""
          const message = formDataObj.get("message")?.toString().trim() || ""
    
          const errors = {
            firstName: firstName === "",
            lastName: lastName === "",
            email: !/\S+@\S+\.\S+/.test(email),
            subject: subject === "",
            message: message === "",
          }
    
          if (Object.values(errors).includes(true)) {
            toast.error("Please fill in all fields correctly")
            return
          }
    
          // Add Web3Forms access key and additional fields
          const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY
          if (process.env.NODE_ENV === 'development' && !process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY) {
            console.warn('Warning: Using fallback Web3Forms access key. Please set NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY in your .env file.')
          }
          formDataObj.append("access_key", accessKey)
          formDataObj.append("from_name", `${firstName} ${lastName}`)
          formDataObj.append("reply_to", email)
    
          const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formDataObj,
          })
    
          const data = await response.json()
    
          if (data.success) {
            toast.success("Message sent successfully! BD will get back to you within 24 hours")
            form.reset()
            setFormData({
              firstName: '',
              lastName: '',
              email: '',
              subject: '',
              message: ''
            })
          } else {
            toast.error("An error occurred, please try again")
          }
        } catch (error) {
          toast.error("An error occurred, please try again")
        } finally {
          setIsPending(false)
        }
      }
  return (
    <ScrollReveal>
      <div className="soft-card p-6 md:p-8">
        <p className="section-label">Message</p>
        <h2 className="mb-2 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
          Send a message
        </h2>
        <p className="mb-8 font-light leading-relaxed text-muted-foreground">
          Fill out the form below and I&apos;ll get back to you within 24 hours.
        </p>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName" className={labelClass}>First name</Label>
              <Input
                id="firstName"
                placeholder="John"
                variant="noRing"
                className={fieldClass}
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName" className={labelClass}>Last name</Label>
              <Input
                id="lastName"
                placeholder="Doe"
                variant="noRing"
                className={fieldClass}
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className={labelClass}>Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              variant="noRing"
              className={fieldClass}
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject" className={labelClass}>Subject</Label>
            <Input
              id="subject"
              placeholder="Hello, I'd like to chat"
              variant="noRing"
              className={fieldClass}
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className={labelClass}>Message</Label>
            <Textarea
              id="message"
              placeholder="Tell me what's on your mind or just say hello..."
              rows={6}
              className={`${fieldClass} h-auto resize-none py-3 focus-visible:ring-0 focus-visible:ring-offset-0`}
              name="message"
              value={formData.message}
              onChange={handleInputChange}
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {isPending ? (
              <CircleNotch size={18} weight="bold" className="animate-spin" />
            ) : (
              <PaperPlaneTilt size={18} weight="duotone" />
            )}
            {isPending ? 'Sending…' : 'Send message'}
          </button>
        </form>
      </div>
    </ScrollReveal>
  )
}

export default ContactForm
