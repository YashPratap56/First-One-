import { SpiralAnimation } from "./ui/spiral-animation"
import { useState, useEffect, useCallback } from 'react'

const SpiralDemo = () => {
  const [startVisible, setStartVisible] = useState(false)
  const [animationLoaded, setAnimationLoaded] = useState(false)
  
  // Handle navigation to personal site
  const navigateToPersonalSite = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.location.href = "https://xubh.top/"
    }
  }, [])
  
  // Fade in the start button after animation loads
  useEffect(() => {
    const timer = setTimeout(() => {
      setStartVisible(true)
      setAnimationLoaded(true)
    }, 2000)
    
    return () => clearTimeout(timer)
  }, [])
  
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-black z-0 flex items-center justify-center">
      {/* Spiral Animation - Only render when needed */}
      {animationLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <SpiralAnimation />
        </div>
      )}
      
      {/* Simple Elegant Text Button with Pulsing Effect */}
      <div 
        className={`
          absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10
          transition-all duration-1500 ease-out
          ${startVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        `}
      >
        
      </div>
    </div>
  )
}

export { SpiralDemo }