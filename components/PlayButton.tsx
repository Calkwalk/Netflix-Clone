import { useRouter } from 'next/router';
import React, { useState } from 'react';

import { BsFillPlayFill } from 'react-icons/bs';
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

interface PlayButtonProps {
    movieId: string;
    shape?: string;
}

const PlayButton: React.FC<PlayButtonProps> = ({movieId, shape ='circle'}) => {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false)

    if(shape == 'rectange') {
        return (
            <button 
                onClick={()=>router.push(`/watch/${movieId}`)}
                className='bg-white 
                rounded-md py-1 md:py-2 px-2 md:px-4
                w-auto text-xs lg:text:lg font-semibold
                flex flex-row items-center hover:bg-neutral-300 transition'>
                    <BsFillPlayFill  className='mr-1'/>
                    Play
            </button>
        );        
     } else {
        return (
            <div 
                onClick={()=>{
                    setIsLoading(true);
                    setTimeout(() => {
                        router.push(`/watch/${movieId}`);
                        setIsLoading(false)
                    }, 300);
                    
                    
                }}
                className='cursor-pointer w-6 h-6 lg:w-10 lg:h-10
                    bg-white rounded-full flex justify-center items-center transition hover:bg-neutral-300' 
            >
                { isLoading && <AiOutlineLoading3Quarters className='animate-spin transition' size={16}  /> }
                { !isLoading && <BsFillPlayFill className='ml-1' size={30}/> }
            </div>
        );
     }
    
}

export default PlayButton