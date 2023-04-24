import React from 'react';
import Image from 'next/image';

import FavoriteButton from './FavoriteButton';
import PlayButton from './PlayButton';
import useInfoModal from '@/hooks/useInfoModal';

import { FcGallery } from 'react-icons/fc';

interface MovieCardProps {
    data: Record<string,any>;
}

const MovieCard: React.FC<MovieCardProps> = ({data}) => {

    const {openModal} = useInfoModal();

    return (
        <div className='group bg-zinc-900 roundend-md relative h-[60vw] sm:h[30vh] md:h-[18vh] lg:h-[12vw]'>

            {/* thumbnail origin */}
            <Image 
                className='cursor-pointer 
                    object-cover 
                    transition 
                    duration 
                    shadow-xl 
                    rounded-md 
                    group-hover:opacity-90 
                    sm:group-hover:opacity-0 
                    delay-300 
                    border border-zinc-500 
                    w-full 
                    h-[60vw] sm:h[30vh] md:h-[18vh] lg:h-[12vw]'
                src={data?.thumbnailUrl} alt='Thumbnail' />

            <div className='opacity-0 
                    absolute 
                    top-0 
                    transition 
                    duration-200 
                    z-10 
                    invisible 
                    sm:visible 
                    delay-300 
                    w-full 
                    scale-0 
                    group-hover:scale-110 
                    group-hover:-translate-y-[6vw] 
                    group-hover:translate-x-[2vw] 
                    group-hover:opacity-100'
                >
                    {/* thumbnial hero */}
                    <Image className='cursor-pointer object-cover transition duration shadow-xl rounded-t-md w-full h-[60vw] sm:h[30vh] md:h-[18vh] lg:h-[12vw]' 
                        src={data?.thumbnailUrl} alt='Thumbnail' />
                    
                    {/* movie info */}
                    <div className='z-10 bg-zinc-800 p-2 lg:p-4 absolute w-full transition shadow-md rounded-b-md'>
                        <div className='flex flex-row items-center gap-3'>
                            <PlayButton movieId={data?.id} />
                            <FavoriteButton movieId={data?.id} />

                            <div onClick={() => openModal(data?.id)} 
                                className='cursor-pointer ml-auto group/item w-6 h-6 lg:w-10 lg:h-10 rounded-full border-2 flex justify-center items-center'>
                                <FcGallery className='group-hover/item:text-neutral-300' size={20} />
                            </div>
                        </div>
                        <p className='text-green-400 font-semibold font-sm mt-4'>
                                    New <span className='text-white'>2023</span>
                                </p>
                        <div className='flex flex-row justify-between items-center'>
                            <div className='flex flex-row mt-4 gap-2 items-center'>
                                
                                <p className='text-white text-[10px] lg:text-sm'>{data?.duration}</p>
                            </div>
                            <div className='flex flex-row mt-4 gap-2 items-center'>
                                <p className='text-white text-[10px] lg:text-sm'>{data?.genre}</p>
                            </div>
                        </div>

                        
                    </div>
                    
                </div>
                
        </div>
    )
}

export default MovieCard