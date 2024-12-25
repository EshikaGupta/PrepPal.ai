import { UserButton } from '@clerk/nextjs'
import React from 'react'

function DashboardHeader() {
  return (
    <div className='py-3 px-5 shadow-md flex justify-end'>
      <UserButton/>
    </div>
  )
}

export default DashboardHeader