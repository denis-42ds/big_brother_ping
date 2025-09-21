import { useState, useEffect } from 'react'

export const useZoom = () => {
  const [zoomLevel, setZoomLevel] = useState(1)

  // Загружаем сохраненный уровень масштаба
  useEffect(() => {
    const savedZoom = localStorage.getItem('zoomLevel')
    if (savedZoom) {
      setZoomLevel(parseFloat(savedZoom))
    }
  }, [])

  // Сохраняем уровень масштаба
  useEffect(() => {
    localStorage.setItem('zoomLevel', zoomLevel.toString())
  }, [zoomLevel])

  const zoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.1, 1.5))
  }

  const zoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.1, 0.7))
  }

  const resetZoom = () => {
    setZoomLevel(1)
  }

  return {
    zoomLevel,
    zoomIn,
    zoomOut,
    resetZoom
  }
}
