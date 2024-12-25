import React from 'react'
import DashboardHeader from '../dashboard/_components/DashboardHeader'

function CourseViewLayout({children}) {
  return (
    <div>
        <DashboardHeader/>
        <div className='mx-24 max-sm:mx-8 md:mx-20 lg:mx-44 mt-10'>
            {children}
        </div>
    </div>
  )
}

export default CourseViewLayout