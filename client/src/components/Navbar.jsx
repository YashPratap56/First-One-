import React, { useContext, useEffect } from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'
import { AppContext } from '../context/AppContext'


export const Navbar = () => {
  const {openSignIn}=useClerk();
  const {isSignedIn,user}=useUser();
  const {credit,loadCreditsData}=useContext(AppContext);

useEffect(()=>{
  if(isSignedIn){
    loadCreditsData();
  }
  
},[isSignedIn])



  return (
    <>
        <div className='relative navbar w-[99%] h-[60px] m-2 rounded-2xl flex justify-between items-center font-[mooxy]'>
           <Link to={'/'}>
           <div className='relative logo flex items-center left-5 md:left-27 opacity-85 hover:opacity-100 transition-all duration-200'>
                <h1 className='text-xl sitename sm:text-3xl'>ArcaneBg</h1>

            </div>
           </Link> 
           {
            isSignedIn
            ?
            <div className='auth relative flex items-center right-5 md:right-30 gap-5 '>
              <div className='flex justify-center items-center border-1 border-dashed rounded-2xl h-10'>
              {/* <img src={assets.credits} alt="Credits" className='size-10 mx-2'/> */}
              <p className='font-[mooxy] mx-2'>Credits:-{credit}</p>

              
              </div>
              <div>
                <p className='hidden sm:block'>{user.fullName}</p>
              </div>
              <UserButton/>
              </div>
            :<div className='auth relative flex items-center right-5 md:right-30 '>
            <button className='text-xl opacity-85 hover:opacity-100 transition-all duration-200' onClick={()=>{
              openSignIn({})
            }}>Get Started</button>

        </div>
           }
            
            

        </div>
    </>
  )
}
