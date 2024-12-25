import React from 'react'
import ReactCardFlip from 'react-card-flip'

function FlashcardItem({isFlipped,handleClick,flashcard}) {
  return (
    <div className='flex items-center justify-center'>
        <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
            <div className='p-4 bg-primary h-[350px] w-[250px] shadow-lg text-white flex cursor-pointer items-center justify-center rounded-lg md:h-[400px] md:w-[300px]' onClick={handleClick}>
                <h2 className='text-2xl text-center'>{flashcard?.front}</h2>
            </div>

            <div className='px-5 bg-white shadow-lg h-[350px] w-[250px] text-black flex cursor-pointer items-center justify-center rounded-lg md:h-[400px] md:w-[300px] border' onClick={handleClick}>
                <h2 className='text-xl text-center'>{flashcard?.back}</h2>
            </div>
        </ReactCardFlip>
        </div>
  )
}

export default FlashcardItem