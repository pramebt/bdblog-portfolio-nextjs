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
    <div className="relative min-h-screen">
      <ContactHeader />

      <section className="px-4 pb-24">
        <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <ContactForm />

          <div className="space-y-12">
            <ContactInfo />
            <ContactSocial />
            <ContactAdditional />
          </div>
        </div>
      </section>
    </div>
  )
}

export default ContactPage
