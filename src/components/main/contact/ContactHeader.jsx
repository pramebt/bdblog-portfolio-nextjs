import React from 'react'
import { MessageCircle } from 'lucide-react'

const ContactHeader = () => {
  return (
    <div className="text-center mb-20">
      <div className="w-16 h-16 mx-auto mb-8 rounded-2xl bg-muted/30 flex items-center justify-center">
        <MessageCircle className="h-8 w-8 text-muted-foreground/60" />
      </div>
      <h1 className="text-4xl md:text-6xl font-semibold mb-6 text-foreground">
        Get In Touch
      </h1>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
        Have a question or just want to say hello? I'd love to hear from you. 
        Send me a message and I'll get back to you soon.
      </p>
    </div>
  )
}

export default ContactHeader
