'use client'
import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Send } from 'lucide-react'
import { HoverBorderGradient } from '@/components/ui/hover-border-gradient'
import { toast } from 'sonner'
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
          formDataObj.append("access_key", "20720aa8-5d0e-4355-b66c-a1b5076e21d8")
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
    <div className="space-y-8">
      <div className="text-center lg:text-left">
        <h2 className="text-3xl font-semibold mb-4 text-foreground">
          Send Message
        </h2>
        <p className="text-muted-foreground font-light leading-relaxed">
          Fill out the form below and I'll get back to you within 24 hours.
        </p>
      </div>
      
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-sm font-medium text-foreground">First Name</Label>
            <Input 
              id="firstName" 
              placeholder="John" 
              className="border-border/50 focus:border-primary bg-background/50 ring-0 focus:ring-0 focus-visible:ring-0 "
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName" className="text-sm font-medium text-foreground">Last Name</Label>
            <Input 
              id="lastName" 
              placeholder="Doe" 
              className="border-border/50 focus:border-primary bg-background/50 focus:outline-none ring-0 focus:ring-0 focus-visible:ring-0 "
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium text-foreground">Email</Label>
          <Input 
            id="email" 
            type="email" 
            placeholder="john@example.com" 
            className="border-border/50 focus:border-primary bg-background/50 focus:outline-none ring-0 focus:ring-0 focus-visible:ring-0 "
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="subject" className="text-sm font-medium text-foreground">Subject</Label>
          <Input 
            id="subject" 
            placeholder="Project Inquiry" 
            className="border-border/50 focus:border-primary bg-background/50 focus:outline-none ring-0 focus:ring-0 focus-visible:ring-0 "
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="message" className="text-sm font-medium text-foreground">Message</Label>
          <Textarea 
            id="message" 
            placeholder="Tell me about your project or just say hello..."
            rows={6}
            className="border-border/50 focus:border-primary resize-none bg-background/50 focus:outline-none ring-0 focus:ring-0 focus-visible:ring-0 "
            name="message"
            value={formData.message}
            onChange={handleInputChange}
          />
        </div>
        
        <HoverBorderGradient
          containerClassName="rounded-full"
          as="button"
          type="submit"
          className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2 w-full justify-center"
          disabled={isPending}
        >
          <Send className="h-4 w-4" />
          <span>{isPending ? 'Sending...' : 'Send Message'}</span>
        </HoverBorderGradient>
      </form>
    </div>
  )
}

export default ContactForm
