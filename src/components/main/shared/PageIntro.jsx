'use client'

import { motion } from 'motion/react'

const ease = [0.16, 1, 0.3, 1]

const PageIntro = ({ label, title, description, children, className = '' }) => {
  return (
    <section className={`relative px-4 pb-10 pt-16 md:pb-14 md:pt-24 ${className}`}>
      <div aria-hidden className="page-ambient" />
      <div className="mx-auto max-w-5xl">
        {label && (
          <motion.p
            className="section-label"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
          >
            {label}
          </motion.p>
        )}
        <motion.h1
          className="mb-4 text-4xl font-semibold tracking-tight text-foreground text-balance md:text-6xl"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.08, ease }}
        >
          {title}
        </motion.h1>
        {description && (
          <motion.p
            className="max-w-2xl text-lg font-light leading-relaxed text-muted-foreground"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.16, ease }}
          >
            {description}
          </motion.p>
        )}
        {children && (
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.24, ease }}
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default PageIntro
