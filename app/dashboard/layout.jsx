"use client"
import React, { useState } from 'react'
import SideBar from './_components/SideBar'
import DashboardHeader from './_components/DashboardHeader'
import { CourseCountContext } from '../_context/CourseCountContext'

function DashboardLayout({children}) {
  
  return (
    
    <div>
        <div className='md:w-60 hidden md:block fixed'>
            <SideBar/>
        </div>
        
        <div className='md:ml-60'>
            <DashboardHeader/>
            <div className='p-6'>
                {children}
            </div>
        </div>
    </div>
    
  )
}

export default DashboardLayout