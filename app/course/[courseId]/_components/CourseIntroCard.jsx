import { Progress } from '@/components/ui/progress'
import Image from 'next/image'
import React from 'react'

function CourseIntroCard({course}) {
  return (
      <div className='flex flex-wrap gap-5 items-center border shadow-md py-7 px-10 rounded-lg max-sm:py-4 max-sm:px-8'>
        <Image src={'/knowledge.png'} alt='other' width={70} height={70} className="flex-shrink-0"/>
        <div className='flex-1 min-w-0'>
          <h2 className='font-bold text-2xl overflow-hidden capitalize'>{course?.topic}
          <span className={`text-sm py-[2.1px] ml-2 px-2 rounded-full text-white ${
            course?.difficultyLevel === 'Hard'
            ? 'bg-red-500'
            : course?.difficultyLevel === 'Moderate'
            ? 'bg-orange-500'
            : 'bg-green-500'}`}>{course?.difficultyLevel}</span></h2>
          <p className='overflow-hidden'>{course?.courseLayout?.courseSummary}</p>
          <Progress className='mt-3'/>
          <h2 className='mt-2 text-md'>Total Chapters: {course?.courseLayout?.chapters.length}</h2>
        </div>
      </div>
  )
}

export default CourseIntroCard
