import React from 'react'
import { motion } from 'framer-motion'
import { ZoomIn, ZoomOut, RotateCcw } from '../assets/icons'

interface ZoomControlsProps {
  zoomLevel: number
  onZoomIn: () => void
  onZoomOut: () => void
  onResetZoom: () => void
}

const ZoomControls: React.FC<ZoomControlsProps> = ({
  zoomLevel,
  onZoomIn,
  onZoomOut,
  onResetZoom
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed top-4 right-4 z-50 flex items-center space-x-2 p-3 rounded-2xl"
      style={{
        background: 'rgba(0,0,0,0.8)',
        backdropFilter: 'blur(20px) saturate(180%)',
        border: '1px solid rgba(255,255,255,0.15)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)'
      }}
    >
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onZoomOut}
        className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
        title="Уменьшить масштаб"
      >
        <ZoomOut className="w-5 h-5" />
      </motion.button>

      <div className="px-3 py-1 bg-white/10 rounded-lg text-white text-sm font-medium min-w-[60px] text-center">
        {Math.round(zoomLevel * 100)}%
      </div>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onZoomIn}
        className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
        title="Увеличить масштаб"
      >
        <ZoomIn className="w-5 h-5" />
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onResetZoom}
        className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
        title="Сбросить масштаб"
      >
        <RotateCcw className="w-5 h-5" />
      </motion.button>
    </motion.div>
  )
}

export default ZoomControls
