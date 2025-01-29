import { useState, useEffect, useRef } from 'react'

interface LazyVideoProps {
  videoId: string
  title: string
}

const LazyVideo = ({ videoId, title }: LazyVideoProps) => {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting)
      },
      {
        rootMargin: '50px',
        threshold: 0.1
      }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current)
      }
    }
  }, [])

  return (
    <div ref={containerRef} className="relative w-full" style={{ paddingBottom: '56.25%' }}>
      {isIntersecting ? (
        <iframe
          className="absolute top-0 left-0 w-full h-full rounded-lg"
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      ) : (
        <div className="absolute top-0 left-0 w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
          <div className="text-gray-500">Loading video...</div>
        </div>
      )}
    </div>
  )
}

export default LazyVideo
