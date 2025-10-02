import React from 'react'
import { Button } from '@/components/ui/button'
import { Github, Linkedin } from 'lucide-react'

const ContactSocial = () => {
  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com"
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://linkedin.com"
    }
  ]

  return (
    <div className="text-center lg:text-left">
      <h3 className="text-2xl font-semibold mb-4 text-foreground">
        Follow Me
      </h3>
      <p className="text-muted-foreground font-light leading-relaxed mb-6">
        Connect with me on social media for updates and insights.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        {socialLinks.map((social, index) => {
          const IconComponent = social.icon
          return (
            <Button 
              key={index}
              variant="outline" 
              size="lg"
              className="flex-1 rounded-full border-border/50 hover:bg-muted/50 transition-colors"
              asChild
            >
              <a href={social.href} target="_blank" rel="noopener noreferrer">
                <IconComponent className="h-5 w-5 mr-2" />
                {social.label}
              </a>
            </Button>
          )
        })}
      </div>
    </div>
  )
}

export default ContactSocial
