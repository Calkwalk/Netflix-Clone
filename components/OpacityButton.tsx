import React from 'react'
import { IconType } from 'react-icons/lib';

interface OpacityButtonProps {
  Icon: IconType;
  title: string;
  onClick: any;
}

const OpacityButton:React.FC<OpacityButtonProps> = ( {Icon, title, onClick}) => {

  return (
    <button onClick={onClick}
      className='text-white 
        bg-white bg-opacity-30 
        rounded-md py-1 md:py-2 px-2 md:px-4
        w-auto text-xs lg:text:lg font-semibold
        flex flex-row items-center hover:bg-opacity-20 transition'>
            <Icon  className='mr-1' size={16}/>
            {title}
    </button>
  )
}

export default OpacityButton