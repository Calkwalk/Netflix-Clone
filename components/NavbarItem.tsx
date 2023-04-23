interface NavbarItemProps{
    label: string;
}

const NavbarItem: React.FC<NavbarItemProps> = ({label}) => {
  return (
    <div className='text-white decoration-2 cursor-pointer hover:text-gray-300 hover:underline hover:underline-offset-4  transition'>
        {label}
    </div>
  )
}

export default NavbarItem