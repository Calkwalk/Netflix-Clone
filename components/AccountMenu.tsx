import React from 'react'
import { signOut } from 'next-auth/react';
import useCurrentUser from '@/hooks/useCurrentUser';

interface AccountMenuProps{
    visible?: boolean;
}

const AccountMenu:React.FC<AccountMenuProps> = ({visible}) => {
    if(!visible) return null;
    const {data: currentUser} = useCurrentUser();
    return (
        <div className="bg-black w-56 absolute top-14 md:top-20 right-0 py-5 mr-1 flex-col border-2 border-gray-800 flex">
            <div className="flex flex-col gap-4">
                <div className="px-3 group/item flex flex-row gap-3 items-center w-full">
                    <img className='w-8 rounded-md' src='images/default-blue.png' alt="Avatar" />
                    <p className='text-white text-sm group-hover/item:underline decoration-2 underline-offset-4'>
                        {currentUser?.name}
                        <br/>
                        <span className='text-gray-300 text-[10px]'>{currentUser?.email}</span>
                    </p>
                </div>
                <hr className='bg-gray-600 border-0 h-px my-2' />
                <div onClick={()=>{}} className='pl-8 pr-3 py-3 text-left text-white hover:bg-[#555555] hover:text-red-400"'>
                    Settings
                </div>
                <div onClick={()=>signOut()} className='pl-8 pr-3 py-3 text-left text-white hover:bg-[#555555] hover:text-red-400"'>
                    Sign Out of Netflix
                </div>
            </div>
        </div>
    );
}

export default AccountMenu;