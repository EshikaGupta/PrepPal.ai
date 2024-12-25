"use client"
import { useUser } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

function WelcomeBanner() {
    const {user}=useUser();
  return (
    <div className='px-4 py-3 bg-blue-800 w-full flex gap-6 shadow-xl items-center text-white rounded-lg'>
        <Image src={'/laptop.png'} alt='laptop' width={95} height={100}/>
        <div className='flex-col'>
            <h2 className='font-bold text-3xl'>Hello, {user?.fullName}</h2>
            <p>Welcome, It's time to start learning!</p>
        </div>
    </div>
  )
}

export default WelcomeBanner