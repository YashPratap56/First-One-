import React, { Suspense, lazy } from 'react'

// Lazy load the TypewriterEffectSmoothDemo component
const TypewriterEffectSmoothDemo = lazy(() => import('./Homemsg').then(module => ({ default: module.TypewriterEffectSmoothDemo })))

// Loading fallback component
const HeaderLoading = () => (
  <div className="flex flex-col items-center justify-center h-[30rem] -mt-30">
    <div className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-[10px] lg:text-[18px]">
      Snip the noise. Free your pixels.
    </div>
    <div className="text-base sm:text-xl md:text-3xl lg:text-5xl font-bold text-center">
      Loading...
    </div>
  </div>
)

export const Header = () => {
  return (
    <>
      <Suspense fallback={<HeaderLoading />}>
        <TypewriterEffectSmoothDemo />
      </Suspense>
    </>
  )
}
