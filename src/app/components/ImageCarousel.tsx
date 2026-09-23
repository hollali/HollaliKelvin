'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { sanityImageUrl } from '@/lib/image'

interface ImageCarouselProps {
  images: string[]
  alt: string
  className?: string
  autoPlayInterval?: number
  width?: number
  sizes?: string
}

export default function ImageCarousel({
  images,
  alt,
  className = '',
  autoPlayInterval = 3000,
  width = 520,
  sizes = '(max-width: 768px) 200px, 260px',
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }, [images.length])

  useEffect(() => {
    if (isHovered || images.length <= 1) return

    const timer = setInterval(goToNext, autoPlayInterval)
    return () => clearInterval(timer)
  }, [isHovered, images.length, autoPlayInterval, goToNext])

  if (images.length <= 1) {
    return (
      <div className={`relative w-full h-full ${className}`}>
        <Image
          src={sanityImageUrl(images[0], width)}
          alt={alt}
          fill
          unoptimized
          className="object-cover"
          sizes={sizes}
        />
      </div>
    )
  }

  return (
    <div 
      className={`relative w-full h-full overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Images */}
      <div 
        className="flex h-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((src, index) => (
          <div key={index} className="relative w-full h-full flex-shrink-0">
            <Image
              src={sanityImageUrl(src, width)}
              alt={`${alt} - Image ${index + 1}`}
              fill
              unoptimized
              className="object-cover"
              sizes={sizes}
            />
          </div>
        ))}
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.stopPropagation()
              setCurrentIndex(index)
            }}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-white scale-125' 
                : 'bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}