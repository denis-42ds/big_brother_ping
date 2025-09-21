import React from 'react'

interface IconProps {
  className?: string
  size?: number
}

const ArrowRight: React.FC<IconProps> = ({ className = "w-6 h-6", size }) => {
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
      <line x1="5" y1="12" x2="19" y2="12"/>
      <polyline points="12,5 19,12 12,19"/>
    </svg>
  )
}

export default ArrowRight

