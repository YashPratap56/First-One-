"use client";
import { TypewriterEffectSmooth } from "./ui/typewriter-effect";
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'
export function TypewriterEffectSmoothDemo() {
  const {openSignIn}=useClerk();
  const {isSignedIn,user}=useUser();
  const words = [
    {
      text: "No",
    },
    {
      text: "limits.",
    },
    {
      text: "Just",
    },
    {
      text: "art.",
    },
    {
      text: "ArcaneBg.",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-[30rem] -mt-30">
      <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-[10px]  lg:text-[18px] ">
        Snip the noise. Free your pixels.
      </p>
      <TypewriterEffectSmooth words={words} />
      <div
        className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
        
        <button
          className="w-40 h-10 rounded-xl bg-white text-black border border-black  text-sm" onClick={()=>{
            openSignIn({})
          }}>
          Signup
        </button>
        <button
          className="w-40 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm">
          Dont Press
        </button>
      </div>
    </div>
  );
}
