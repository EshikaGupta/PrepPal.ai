"use client"
import { useParams,useRouter} from 'next/navigation'
import React, { useEffect, useState } from 'react'
import  StepProgress from '../_components/StepProgress';
import axios from 'axios';
import QuizCardItem from './_components/QuizCardItem';
import { Button } from '@/components/ui/button';

function Quiz({userSelectedOption}) {
    const {courseId}=useParams();
    const [quizData,setQuizData]=useState();
    const [stepCount,setStepCount]=useState(0);
    const route=useRouter();
    const [quiz,setQuiz]=useState([]);
    const [isCorrectAnswer,setIsCorrectAnswer]=useState(null);
    const [correctAnswer,setCorrectAnswer]=useState();
    const [userHasAnswered, setUserHasAnswered] = useState(false);

    useEffect(()=>{
        GetQuiz();
    },[courseId])
    
    const GetQuiz=async()=>{  
        const result=await axios.post('/api/study-type',{
            courseId:courseId,
            studyType:'Quiz'
        });
        setQuizData(result.data);
        setQuiz(result.data?.content?.quiz)
        //console.log(result)

    }

    const checkAnswer=(userAnswer,currentQuestion)=>{
        if (userHasAnswered) return; // Prevent multiple answers

        setUserHasAnswered(true);
        if(userAnswer==currentQuestion?.answer){
            setIsCorrectAnswer(true);
            setCorrectAnswer(currentQuestion?.answer);
            return;
        }
        setIsCorrectAnswer(false);
        setCorrectAnswer(currentQuestion?.answer);
    }

    useEffect(()=>{
        setCorrectAnswer(null);
        setIsCorrectAnswer(null);
        setUserHasAnswered(false);
    },[stepCount])

  return (
    <div>
        <h2 className='font-bold mb-5 text-3xl'>Quiz</h2>
        <StepProgress data={quiz} stepCount={stepCount} setStepCount={(v)=>setStepCount(v)} />
        <div>
            {/*{quiz&&quiz.map((item,index)=>(*/}
                <QuizCardItem quiz={quiz[stepCount]} userHasAnswered={userHasAnswered} userSelectedOption={(v)=>checkAnswer(v,quiz[stepCount])}/>        
        </div>

        <div className='mt-5'>
            {isCorrectAnswer==false&&<div>
                <div className='border p-3 border-red-800 bg-red-200 rounded-md'>
                    <h2 className='px-4 font-bold text-lg text-red-800'>Your answer is Incorrect</h2>
                    <p className='px-4 text-md text-red-800'>Correct answer is {correctAnswer}</p>
                </div>
            </div>}
            {isCorrectAnswer==true&&<div>
                <div className='border p-3 border-green-800 bg-green-200 rounded-md'>
                    <h2 className='px-4 font-bold text-lg text-green-800'>Your answer is Correct</h2>
                </div>
            </div>}
            <div className='mt-5'>
                {quiz?.length==stepCount&&<div className='flex items-center gap-10 flex-col justify-center'>
                    <h2>End of quiz</h2>
                    <Button onClick={()=>route.back()}>Go to Course Page</Button></div>}
            </div>
        </div>
    </div>
  )
}

export default Quiz