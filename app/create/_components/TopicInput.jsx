import { Textarea } from '@/components/ui/textarea'
import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

  
function TopicInput({setTopic,setDifficultyLevel}) {
  return (
    <div className='w-full flex flex-col'>
        <h2 className='mb-2 text-lg pr-64'>Enter the topic or paste the content</h2>
        <Textarea placeholder='Start writing here' className='mt-1 w-full' onChange={(event)=>setTopic(event.target.value)}></Textarea>
        <h2 className='mt-5 mb-2 text-lg'>Select the difficulty level</h2>
        <Select onValueChange={(value)=>setDifficultyLevel(value)}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Difficulty Level" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="Easy">Easy</SelectItem>
                <SelectItem value="Moderate">Moderate</SelectItem>
                <SelectItem value="Hard">Hard</SelectItem>
            </SelectContent>
        </Select>

    </div>
  )
}

export default TopicInput