import React from 'react'

interface IconProps {
  className?: string
  size?: number
}

const Clock: React.FC<IconProps> = ({ className = "w-6 h-6", size }) => {
  return (
    <svg
      width={size || 24}
      height={size || 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12,6 12,12 16,14"/>
    </svg>
  )
}

export default Clock

