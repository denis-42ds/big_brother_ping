import React from 'react'

interface IconProps {
  className?: string
  size?: number
}

const Activity: React.FC<IconProps> = ({ className = "w-6 h-6", size }) => {
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
      <polyline points="22,12 18,12 15,21 9,3 6,12 2,12"/>
    </svg>
  )
}

export default Activity

