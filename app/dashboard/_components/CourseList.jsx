"use client"
import { useUser } from '@clerk/nextjs'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import CourseCardItem from './CourseCardItem';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { CourseCountContext } from '@/app/_context/CourseCountContext';

function CourseList() {
    const {user}=useUser();
    const [courseList,setCourseList]=useState([]);
    const [loading,setLoading]=useState(false);
    const {totalCourse,setTotalCourse}=useContext(CourseCountContext);
    const {totalCredits,setTotalCredits}=useContext(CourseCountContext);

    useEffect(()=>{
        user&&GetCourseList();
    },[user])

    const GetCourseList=async()=>{
        setLoading(true);
        const result=await axios.post('/api/courses',
        {createdBy:user?.primaryEmailAddress?.emailAddress})
        setCourseList(result.data.result);
        setLoading(false);
        setTotalCourse(result.data.result?.length);
        //setTotalCredits(totalCredits-totalCourse);
    }
  return (
    <div className='mt-8'>
        <div className='flex justify-between'>
            <h2 className='font-bold text-2xl'>Your study material</h2>
            <Button variant='outline' className='border-blue-800 text-blue-800 text-md' 
            onClick={GetCourseList}><RefreshCw/>Refresh</Button>
        </div>
        
        <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 mt-2 gap-4'>
            {loading==false? courseList?.map((course,index)=>(
                <CourseCardItem course={course} key={index}/>
            )):[1,2,3,4,5,6].map((item,index)=>(
                <div key={index} className='h-56 w-full bg-slate-200 rounded-lg animate-pulse'>

                </div>
            ))}
        </div>
    </div>
  )
}

export default CourseList