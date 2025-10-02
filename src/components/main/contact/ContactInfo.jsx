import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Mail, Phone, MapPin } from 'lucide-react'

const ContactInfo = () => {
  const contactItems = [
    {
      icon: Mail,
      title: "Email",
      value: "bdforwk@gmail.com",
      badge: "I'll respond within 24 hours"
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+66 (0) XX XXX XXXX",
      badge: "Available Mon-Fri, 9AM-6PM"
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Phayao, Thailand",
      badge: "Open to remote work"
    }
  ]

  return (
    <div className="space-y-8">
      <div className="text-center lg:text-left">
        <h2 className="text-3xl font-semibold mb-4 text-foreground">
          Contact Information
        </h2>
        <p className="text-muted-foreground font-light leading-relaxed">
          Here are some ways to reach me directly.
        </p>
      </div>

      <div className="space-y-6">
        {contactItems.map((item, index) => {
          const IconComponent = item.icon
          return (
            <div key={index} className="flex items-start space-x-4 p-6 rounded-2xl bg-muted/20 border border-border/30">
              <div className="w-12 h-12 rounded-xl bg-muted/30 flex items-center justify-center">
                <IconComponent className="h-6 w-6 text-muted-foreground/60" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                <p className="text-muted-foreground font-light">{item.value}</p>
                <Badge variant="secondary" className="mt-2 text-xs bg-muted/30">
                  {item.badge}
                </Badge>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ContactInfo
