import React, { Suspense, lazy } from 'react'
import { Header } from '../components/Header'

// Lazy load the heavy SpiralDemo component
const SpiralDemo = lazy(() => import('../components/animationstart').then(module => ({ default: module.SpiralDemo })))

// Loading fallback component
const SpiralLoading = () => (
  <div className="absolute inset-0 w-full h-full overflow-hidden bg-black z-0 flex items-center justify-center">
    <div className="text-white text-lg">Loading animation...</div>
  </div>
)

export const Home = () => {
  return (
    <>
    <div className='header relative h-screen w-full flex flex-col items-center justify-center'>
      <Suspense fallback={<SpiralLoading />}>
        <SpiralDemo/>
      </Suspense>
      <div className='relative w-full flex flex-col items-center justify-center z-10 h-full'>
        <Header/>
      </div>
    </div>
    </>
  )
}


