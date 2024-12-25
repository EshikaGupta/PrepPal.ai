"use client"
import React, { useContext, useState } from 'react'
import {v4 as uuidv4} from 'uuid'
import SelectOption from './_components/SelectOption'
import { Button } from '@/components/ui/button';
import TopicInput from './_components/TopicInput';
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import { Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { CourseCountContext } from '../_context/CourseCountContext';
import { USER_TABLE } from '@/configs/schema';
import { db } from '@/configs/db';
import { eq } from 'drizzle-orm';

function Create() {
    const [step,setStep]=useState(0);
    const router=useRouter();
    const {user}=useUser();
    const [loading,setLoading]=useState(false);
    const [formData,setFormData]=useState([]);
    const {totalCredits,setTotalCredits}=useContext(CourseCountContext)
    const handleUserInput=(fieldName,fieldValue)=>{
        setFormData(prev=>({
            ...prev,
            [fieldName]:fieldValue
        }))
        
    }
    const GenerateCourseOutline=async()=>{
        const courseId=uuidv4();
        setLoading(true);
        const result=await axios.post('api/generate-course-outline',{
            courseId:courseId,
            ...formData,
            createdBy:user?.primaryEmailAddress?.emailAddress
        })
        toast("Your course is being generated.")
        setLoading(false);
        await updateCredits();
        router.replace('/dashboard');
        
        
    }
    
    const updateCredits=async()=>{
        console.log(user?.primaryEmailAddress?.emailAddress)
        const result=await axios.post('/api/update-credits',
            {user:user,action:2,creditsToAdd:1})
        //const result=await db.update(USER_TABLE).set({
            //credits:totalCredits-1
        //}).where(eq(USER_TABLE.email,user?.primaryEmailAddress?.emailAddress))
        if(result){
            setTotalCredits(result.data.updatedCredits);
            //setTotalCredits(totalCredits-1)
            //setTotalCredits((prev)=>prev-1)
            console.log('create',result.data.updatedCredits);
            //setTotalCredits(prev=>({
                //...prev,
                //credits:totalCredits-1
            //}))
        }
    }

  return (
    <div className='flex flex-col mt-20 items-center p-5 md:px-25 lg:px-40'> 
        <h2 className='font-bold text-4xl text-primary'>Start building your own study material</h2>
        <p className='text-gray-600 text-lg mt-1'>Fill details to generate!</p>
        <div className='mt-10'>
            {step==0? <SelectOption selectedStudyType={(value)=>handleUserInput('courseType',value)}/>
            :<TopicInput setTopic={(value)=>handleUserInput('topic',value)} setDifficultyLevel={(value)=>handleUserInput('difficultyLevel',value)}/>}
        </div>
        <div className='flex justify-between w-full mt-20'>
            {step!=0? <Button variant='outline' onClick={()=>setStep(step-1)}>Previous</Button>:<div className='bg-white'></div>}
            {step==0? <Button onClick={()=>setStep(step+1)}>Next</Button> :<Button onClick={GenerateCourseOutline} disabled={loading}>
                {loading?<Loader className='animate-spin'/>:'Generate'}</Button>}
        </div>
    </div>
  )
}

export default Create