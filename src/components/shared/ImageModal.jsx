'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { X, ZoomIn, ZoomOut, RotateCw, Download } from 'lucide-react'

const ImageModal = ({ 
  src, 
  alt, 
  title,
  isOpen, 
  onClose,
  showControls = true 
}) => {
  const [scale, setScale] = useState(1)
  const [rotation, setRotation] = useState(0)

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev * 1.2, 3))
  }

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev / 1.2, 0.5))
  }

  const handleRotate = () => {
    setRotation(prev => (prev + 90) % 360)
  }

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = src
    link.download = alt || 'image'
    link.click()
  }

  const handleReset = () => {
    setScale(1)
    setRotation(0)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="image-modal-dialog max-w-[95vw] max-h-[95vh] p-0 bg-black/95 border-none" showCloseButton={false}>
        {/* Accessible Title (hidden but required for screen readers) */}
        <DialogTitle className="sr-only">
          {'Image viewer'}
        </DialogTitle>

        {/* Close Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 z-10 text-white hover:bg-white/20"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>

        {/* Visible Title */}
        {title && (
          <div className="absolute top-4 left-4 z-10 text-white">
            <h3 className="text-lg font-semibold">{'Image viewer'}</h3>
          </div>
        )}

        {/* Image Container */}
        <div className="flex items-center justify-center min-h-[50vh] max-h-[80vh] overflow-hidden relative">
          <img
            src={src}
            alt={alt}
            className="max-w-full max-h-full object-contain transition-all duration-300 ease-out"
            style={{
              transform: `scale(${scale}) rotate(${rotation}deg)`,
            }}
            onDoubleClick={handleReset}
          />
        </div>

        {/* Controls */}
        {showControls && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
            <div className="flex items-center gap-2 bg-black/60 backdrop-blur-sm rounded-lg p-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20"
                onClick={handleZoomOut}
                disabled={scale <= 0.5}
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              
              <span className="text-white text-sm min-w-[60px] text-center">
                {Math.round(scale * 100)}%
              </span>
              
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20"
                onClick={handleZoomIn}
                disabled={scale >= 3}
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
              
              <div className="w-px h-6 bg-white/20 mx-1" />
              
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20"
                onClick={handleRotate}
              >
                <RotateCw className="h-4 w-4" />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20"
                onClick={handleDownload}
              >
                <Download className="h-4 w-4" />
              </Button>
              
              <div className="w-px h-6 bg-white/20 mx-1" />
              
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20"
                onClick={handleReset}
              >
                Reset
              </Button>
            </div>
            
            <p className="text-center text-white/70 text-xs mt-2">
              Double-click to reset • Scroll to zoom
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default ImageModal
