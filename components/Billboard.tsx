import useBillboard from '@/hooks/useBillboard';
import React, { useCallback } from 'react';
import PlayButton from './PlayButton';
import OpaticyButton from './OpacityButton';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import useInfoModal from '@/hooks/useInfoModal';

const Billboard = () => {
    const { data: movie } = useBillboard();
    const { openModal } = useInfoModal();

    const handleOpenModal = useCallback(() => {
        openModal(movie?.id);
    }, [movie, openModal])

    return (
        <div className='relative h-[56.25vw]'>
            <video
                className='w-full h-[56.25vw] object-cover brightness-[60%]'
                autoPlay
                muted
                loop
                poster={movie?.thumbnailUrl} 
                src={movie?.videoUrl}>
            </video>

            <div className='absolute top-[30%] md:top-[40%] ml-4 md:ml-16'>
                <p className='text-white text-1xl md:text-5xl lg:text-6xl font-bold h-full w-[50%] drop-shadow-xl'>
                    {movie?.title}
                </p>
                <p className='text-white text-[8px] md:text-lg mt-3 md:mt-8 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl'>
                  {movie?.description}  
                </p>

                <div className={`flex flex-row items-center mt-3 md:mt-4 gap-3  ${movie ? '' : 'hidden'}`}>
                    <PlayButton movieId={movie?.id} shape='rectange'/>
                    <OpaticyButton Icon={AiOutlineInfoCircle} title='More Info' onClick={handleOpenModal} />
                </div>
            </div>
        </div>
    )
}

export default Billboard