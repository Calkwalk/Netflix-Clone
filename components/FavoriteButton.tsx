import React, { useCallback, useMemo, useState } from 'react';
import axios from 'axios';

import { AiOutlineHeart, AiTwotoneHeart, AiOutlineLoading3Quarters } from 'react-icons/ai';

import useCurrentUser from '@/hooks/useCurrentUser';
import usefavorites from '@/hooks/useFavorites';

interface FavoriteButtonProps {
    movieId: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({movieId}) => {

    const [isLoading, setIsLoading] = useState(false)

    const {mutate: mutateFavorites} = usefavorites();
    const {data: currentUser, mutate} = useCurrentUser();

    const isFavorite = useMemo(() =>{
        const list = currentUser?.favoriteIds || [];

        return list.includes(movieId);
    }, [currentUser, movieId])

    const toggleFavorite = useCallback( async () => {
        setIsLoading(true)
        let response;
        if(isFavorite){
            response = await axios.delete('/api/favorite', { 
                params: { movieId: movieId }
            });
        } else {
            response = await axios.post('/api/favorite', { movieId });
        }

        const updatedFavoriteIds = response?.data?.favoriteIds;

        mutate({
            ...currentUser,
            favoriteIds: updatedFavoriteIds
        });
        mutateFavorites();

        setIsLoading(false)

    }, [currentUser, movieId, isFavorite, mutate, mutateFavorites])

    const Icon = isFavorite ? AiTwotoneHeart : AiOutlineHeart;
  return (
    <div onClick={toggleFavorite} className=' cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 bg-white
        rounded-full flex justify-center items-center transition hover:bg-neutral-300'>
        { isLoading && <AiOutlineLoading3Quarters className='animate-spin transition' size={16}  /> }    
        { !isLoading && < Icon className='text-red-400 text-sm md:text-2xl' /> }
    </div>
  )
}

export default FavoriteButton