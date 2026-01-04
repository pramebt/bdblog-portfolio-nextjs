'use client'

import { motion, useInView } from 'motion/react'
import { useRef } from 'react'

/**
 * Apple-style scroll reveal animation component
 * Features: Fade in + subtle slide up with smooth easing
 */
export const ScrollReveal = ({ 
  children, 
  className = '',
  delay = 0,
  duration = 0.6,
  yOffset = 20,
  once = true
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { 
    once, 
    margin: '-100px',
    amount: 0.2
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: yOffset }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: yOffset }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1] // Apple's custom easing curve
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/**
 * Stagger container for animating children sequentially
 */
export const StaggerContainer = ({ 
  children, 
  className = '',
  staggerDelay = 0.1,
  duration = 0.6,
  yOffset = 20
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { 
    once: true, 
    margin: '-100px',
    amount: 0.1
  })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: 0.3
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/**
 * Stagger item for use inside StaggerContainer
 */
export const StaggerItem = ({ 
  children, 
  className = '',
  duration = 0.6,
  yOffset = 20
}) => {
  return (
    <motion.div
      variants={{
        hidden: { 
          opacity: 0, 
          y: yOffset 
        },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: {
            duration,
            ease: [0.16, 1, 0.3, 1]
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

