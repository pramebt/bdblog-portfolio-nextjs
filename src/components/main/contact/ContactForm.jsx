import React from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Send } from 'lucide-react'
import { HoverBorderGradient } from '@/components/ui/hover-border-gradient'

const ContactForm = () => {
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
      
      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-sm font-medium text-foreground">First Name</Label>
            <Input 
              id="firstName" 
              placeholder="John" 
              className="border-border/50 focus:border-primary bg-background/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName" className="text-sm font-medium text-foreground">Last Name</Label>
            <Input 
              id="lastName" 
              placeholder="Doe" 
              className="border-border/50 focus:border-primary bg-background/50"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium text-foreground">Email</Label>
          <Input 
            id="email" 
            type="email" 
            placeholder="john@example.com" 
            className="border-border/50 focus:border-primary bg-background/50"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="subject" className="text-sm font-medium text-foreground">Subject</Label>
          <Input 
            id="subject" 
            placeholder="Project Inquiry" 
            className="border-border/50 focus:border-primary bg-background/50"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="message" className="text-sm font-medium text-foreground">Message</Label>
          <Textarea 
            id="message" 
            placeholder="Tell me about your project or just say hello..."
            rows={6}
            className="border-border/50 focus:border-primary resize-none bg-background/50"
          />
        </div>
        
        <HoverBorderGradient
          containerClassName="rounded-full"
          as="button"
          className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2 w-full justify-center"
        >
          <Send className="h-4 w-4" />
          <span>Send Message</span>
        </HoverBorderGradient>
      </form>
    </div>
  )
}

export default ContactForm
