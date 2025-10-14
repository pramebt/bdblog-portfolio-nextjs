import React from 'react'
import { Button } from '@/components/ui/button'
import { Github, Linkedin, Instagram, Facebook } from 'lucide-react'

const ContactSocial = () => {
  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com",
      iconColor: "text-gray-800 dark:text-gray-200"
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://linkedin.com",
      iconColor: "text-blue-600 dark:text-blue-400"
    },
    {
      icon: Instagram,
      label: "Instagram",
      href: "https://instagram.com",
      iconColor: "text-pink-600 dark:text-pink-400"
    },
    {
      icon: Facebook,
      label: "Facebook",
      href: "https://facebook.com",
      iconColor: "text-blue-700 dark:text-blue-300"
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
      <div className="grid grid-cols-2 gap-4">
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
                <IconComponent className={`h-5 w-5 mr-2 ${social.iconColor}`} />
                <span className="text-foreground">{social.label}</span>
              </a>
            </Button>
          )
        })}
      </div>
    </div>
  )
}

export default ContactSocial
