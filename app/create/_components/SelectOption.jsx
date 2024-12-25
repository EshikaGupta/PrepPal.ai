import Image from 'next/image'
import React, { useState } from 'react'

function SelectOption({selectedStudyType}) {
    const [selectedOption,setSelectedOption]=useState();
    const Options=[
    {
        name:'Exam',
        icon:'/exam_1.png'
    },
    {
        name:'Job Interview',
        icon:'/job.png'
    },
    {
        name:'Practice',
        icon:'/practice.png'
    },{
        name:'Coding Preparation',
        icon:'/code.png'
    },{
        name:'Other',
        icon:'/knowledge.png'
    }
]
  return (
    <div>
        <h2 className='text-center mb-2 text-lg'>For which you want to create your study material?</h2>
        <div className='grid grid-cols-2 mt-5 md:grid-cols-3 lg:grid-cols-5 gap-8'>
            {Options.map((option,index)=>(
                <div key={index} className={`p-5 hover:border-blue-800 cursor-pointer border rounded-xl items-center flex flex-col justify-center ${option?.name==selectedOption&&'border-blue-800'}`} 
                onClick={()=>{setSelectedOption(option.name);selectedStudyType(option.name)}}>
                    <Image src={option.icon} alt={option.name} width={70} height={70}/>
                    <h2 className='text-md mt-2'>{option.name}</h2>
                </div>
            ))}
        </div>
    </div>
  )
}

export default SelectOption