import React from 'react'

function ChapterList({course}) {
    const CHAPTERS=course?.courseLayout?.chapters;
    return (
        <div className='mt-5'>
            <h2 className='font-semibold text-2xl'>Chapters</h2>
            <div className='my-3'>
                {CHAPTERS?.map((chapter,index)=>(
                    <div key={index} className='shadow-md cursor-pointer border rounded-lg mb-2  items-center px-7 p-4'>
                        
                        
                            <h2 className='text-lg font-semibold'>{index+1}.  {chapter?.chapterTitle}</h2>
                            <p className='text-gray-500 text-sm overflow-hidden'>{chapter?.chapterSummary}</p>
                        
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ChapterList