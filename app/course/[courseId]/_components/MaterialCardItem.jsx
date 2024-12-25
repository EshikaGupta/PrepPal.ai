import { Button } from '@/components/ui/button'
import axios from 'axios';
import { RefreshCcw, RefreshCw } from 'lucide-react';
import Image from 'next/image'
import Link from 'next/link';
import React, { useState } from 'react'
import { toast } from 'sonner';

function MaterialCardItem({item,studyTypeContent,course,refreshData}) {
  const [loading,setLoading]=useState(false);

  const GenerateContent=async()=>{
    toast('Your content is being generated!')
    setLoading(true)
    //console.log(course)
    let chapters='';
    course?.courseLayout.chapters.forEach(chapter=>{
      chapters=chapter.chapterTitle+', '+chapters
    });
    //console.log(chapters);
    const result=await axios.post('/api/study-type-content',{
      courseId:course?.courseId,
      type:item.name,
      chapters:chapters
    });

    setLoading(false);
    console.log(result);
    refreshData(true);
    toast('Your content is ready!')
  }
  return (
    //<Link href={'/course/'+course?.courseId+item.path}>
    <div className={`border shadow-md rounded-lg p-4 items-center flex flex-col
      ${studyTypeContent?.[item.type]?.length==0&&'grayscale'}`}>
        
      {studyTypeContent?.[item.type]?.length==0? 
      <h2 className='p-1 px-2 rounded-full text-[10px] mb-2 bg-gray-500'>Not ready</h2>
       : <h2 className='p-1 px-2 rounded-full text-[10px] mb-2 bg-green-500'>Ready</h2>}
        <Image src={item.icon} alt={item.name} width={60} height={60}/>
        <h2 className='font-medium mt-2'>{item.name}</h2>
        <p className='text-gray-500 text-xs text-center'>{item.desc}</p>
        
        {studyTypeContent?.[item.type]?.length==0? 
        <Button className='mt-3 w-full' variant='outline' onClick={()=>GenerateContent()}>
        {loading&& <RefreshCcw className='animate-spin'/>}
        Generate</Button>
        :<Link href={'/course/'+course?.courseId+item.path}>
          <Button className='mt-3 w-full bg-black'>View</Button>
          </Link>
          }
    </div>
    //</Link>
  )
}

export default MaterialCardItem