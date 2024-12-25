import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'

function QuizCardItem({quiz,userSelectedOption, userHasAnswered }) {
    const [selectedOption,setSelectedOption]=useState(null)
    const handleOptionClick = (option) => {
      if (userHasAnswered || selectedOption) return; // Prevent further clicks
      setSelectedOption(option);
      userSelectedOption(option);
  };

  useEffect(() => {
    setSelectedOption(null);
}, [quiz]);

  return quiz&&(
    <div className='mt-8 p-5'>
        <h2 className='font-medium mb-7 text-2xl text-center'>
            {quiz?.question}
        </h2>
        <div className='grid grid-cols-2 gap-5'>
            {quiz?.options.map((option,index)=>(
                <h2 
                onClick={() => handleOptionClick(option)} key={index} variant='outline' 
                className={`hover:bg-gray-200 cursor-pointer border rounded-full px-2 mt-1 text-lg w-full py-3 text-center 
                  ${
                      option === selectedOption
                          ? 'bg-slate-200 border-black hover:text-black'
                          : ''
                  }
                  ${selectedOption ? 'cursor-not-allowed opacity-50' : ''}`}
              style={{ pointerEvents: selectedOption ? 'none' : 'auto' }}>{option}</h2>
            ))}
            
        </div>
    </div>
  )
}

export default QuizCardItem

