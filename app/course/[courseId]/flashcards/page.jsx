"use client"
import axios from 'axios';
import { useParams,useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import FlashcardItem from './_components/FlashcardItem';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
import { Button } from '@/components/ui/button';
import StepProgress from '../_components/StepProgress';
  
function Flashcards() {
    const {courseId}=useParams();
    const route=useRouter();
    const [flashCards,setFlashCards]=useState([]);
    const [isFlipped,setIsFlipped]=useState();
    const [api,setApi]=useState();
    const [stepCount,setStepCount]=useState(0);
    useEffect(()=>{
        GetFlashCards();
    },[])

    useEffect(()=>{
        if(!api){
            return;
        }
       
        //setStepCount(api.selectedScrollSnap() + 1);
        api.on('select',()=>{
            setIsFlipped(false);
            //setStepCount(api.selectedScrollSnap() + 1);
        })
    },[api])

    const GetFlashCards=async()=>{
        const result=await axios.post('/api/study-type',{
            courseId:courseId,
            studyType:'Flashcard'
        })
        setFlashCards(result?.data)
       
    }

    const handleClick=()=>{
        setIsFlipped(!isFlipped)
    }
    const handleNext = () => {
        if (api) {
            api.scrollNext(); // Scroll to the next slide
            setStepCount(api.selectedScrollSnap() ); // Update current slide
        }
    };
    
    const handlePrevious = () => {
        if (api) {
            api.scrollPrev(); // Scroll to the previous slide
            setStepCount(api.selectedScrollSnap() ); // Update current slide
        }
    };
    
   
    return (
        <div> 
            <div className='flex gap-5 items-center mb-5'>
                {flashCards.content?.map((item,index)=>(
                    <div key={index} className={`w-full h-2 rounded-full ${index<stepCount?'bg-primary':'bg-gray-200'}`}>
                    </div>
                    ))
                }
                
            </div>
        

            <h2 className='font-bold text-2xl'>Flashcards</h2>
            <p>Helps you remember concepts</p>
        
            <div>
                <Carousel setApi={setApi}>
                    <CarouselContent>
                        {flashCards?.content&&flashCards.content?.map((flashcard,index)=>(
                        <CarouselItem key={index} className='flex items-center justify-center mt-10'>
                            <FlashcardItem handleClick={handleClick} isFlipped={isFlipped} flashcard={flashcard}/>
                        </CarouselItem>))}
                    </CarouselContent>
                    <CarouselPrevious onClick={handlePrevious}/>
                <CarouselNext onClick={handleNext}/>
                </Carousel>
            
            
            </div>
            <div className='mt-5'>
                {flashCards.content?.length==stepCount&&<div className='flex items-center gap-10 flex-col justify-center'>
                    <h2>End of flashcards</h2>
                    <Button onClick={()=>route.back()}>Go to Course Page</Button></div>}
            </div>
        
        </div>
    )
}

export default Flashcards