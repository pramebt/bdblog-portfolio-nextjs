import React from 'react'
import { 
  ContactHeader, 
  ContactForm, 
  ContactInfo, 
  ContactSocial, 
  ContactAdditional 
} from '@/components/main/contact'

const ContactPage = () => {
  return (
    <div className="min-h-screen py-24 md:py-32 px-4">
      <div className="max-w-6xl mx-auto">
        <ContactHeader />
        
        <div className="grid lg:grid-cols-2 gap-12">
          <ContactForm />
          
          <div className="space-y-8">
            <ContactInfo />
            <ContactSocial />
            <ContactAdditional />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage