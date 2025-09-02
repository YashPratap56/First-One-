import React from 'react'

export const Payment = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-transparent">
      <div className="relative flex flex-col items-center">
        <span
          className="text-[8rem] animate-bounce"
          role="img"
          aria-label="cooking"
          style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.15))' }}
        >
          🍳
        </span>
        <p className="mt-8 text-center max-w-xl text-lg font-[mooxy]">
          The developer is currently <span className="font-bold">cooking</span> another project!<br/>
          He will add the payment gateway to buy more credits once he finishes all his cooking. Stay tuned!
        </p>
      </div>
    </div>
  )
}
