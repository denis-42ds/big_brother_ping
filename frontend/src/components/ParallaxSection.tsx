import React from 'react'
import { motion } from 'framer-motion'
import { useParallax } from '../hooks/useScrollAnimation'

interface ParallaxSectionProps {
  children: React.ReactNode
  speed?: number
  className?: string
  direction?: 'up' | 'down'
}

const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  children,
  speed = 0.5,
  className = '',
  direction = 'up'
}) => {
  const { ref, offset } = useParallax(speed)

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        y: direction === 'up' ? offset : -offset,
      }}
    >
      {children}
    </motion.div>
  )
}

export default ParallaxSection

