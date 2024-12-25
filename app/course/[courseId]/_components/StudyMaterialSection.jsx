import React, { useEffect, useState } from 'react'
import MaterialCardItem from './MaterialCardItem'
import axios from 'axios'
import { db } from '@/configs/db';
import Link from 'next/link';

function StudyMaterialSection({courseId,course}) {
    const MaterialList=[
        {
            name:'Notes/Chapters',
            desc:'Read notes to prepare',
            icon:'/notes.png',
            path:'/notes',
            type:'notes'
        },
        {
            name:'Flashcard',
            desc:'Helps remembering concepts',
            icon:'/flashcard.png',
            path:'/flashcards',
            type:'flashcard'
        },
        {
            name:'Quiz',
            desc:'Test your knowledge',
            icon:'/quiz.png',
            path:'/quiz',
            type:'quiz'
        },
        {
            name:'Question/Answer',
            desc:'Helps in practising',
            icon:'/qa.png',
            path:'/qa',
            type:'qa'
        }
    ]
    const [studyTypeContent,setStudyTypeContent]=useState();
    
    useEffect(()=>{
        GetStudyMaterial();
    },[])

    const GetStudyMaterial=async()=>{
        const result=await axios.post('/api/study-type',{
            courseId:courseId,
            studyType:'ALL'
        })
        
        setStudyTypeContent(result.data)
    }
  return (
    <div>
        <h2 className='font-semibold text-2xl mt-4 mb-2'>Study Material</h2>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-5 mt-3 overflow-hidden '>
            {MaterialList.map((item,index)=>(
                //<Link key={index} href={'/course/'+courseId+item.path}>
                <MaterialCardItem className='shadow-lg' item={item} key={index} 
                studyTypeContent={studyTypeContent} 
                course={course} refreshData={GetStudyMaterial}/>
                //</Link>
            ))}
        </div>
    </div>
  )
}

export default StudyMaterialSection