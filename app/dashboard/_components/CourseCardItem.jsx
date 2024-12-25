import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { RefreshCw } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function CourseCardItem({course}) {
  return (
    <div className='border-black p-4 rounded-lg shadow-xl'>
        <div>
            <div className='flex justify-between items-center'>
                <Image src={'/knowledge.png'} alt='other' width={60} height={60}/>
                <h2 className='text-[10px] p-1 px-2 rounded-full bg-blue-800 text-white'>{course.date}</h2>
            </div>
            <h2 className='mt-3 font-medium text-lg capitalize'>{course.topic} 
            <span className={`text-[10px] py-[2px] ml-2 px-2 rounded-full text-white ${
            course.difficultyLevel === 'Hard'
            ? 'bg-red-500'
            : course.difficultyLevel === 'Moderate'
            ? 'bg-orange-500'
            : 'bg-green-500'}`}>{course.difficultyLevel}</span></h2>
            <p className='text-sm  line-clamp-2 text-gray-700'>{course?.courseLayout?.courseSummary}</p>
            <div className='mt-2 flex justify-end items-center gap-4'> 
            
                {course?.status=='Generating'?
                
                <h2 className='text-[14px] p-1 px-3 text-black gap-1 flex justify-end items-center rounded-2xl bg-gray-400'>
                  <RefreshCw className='h-4 w-4 animate-spin'/>Generating ...</h2>:<Link href={'/course/'+course?.courseId}><Button className='px-3 py-2'>View</Button></Link>}
          </div>
             
        </div>
    </div>
  )
}

export default CourseCardItem