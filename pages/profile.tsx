import { getSession } from 'next-auth/react';
import { NextPageContext } from 'next';
import useCurrentUser from '@/hooks/useCurrentUser';
import { useRouter } from 'next/router';

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  if(!session){
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
}

const Profile = () => {
  const { data:user } = useCurrentUser();
  const router = useRouter();

  return (
    <div className='text-white flex items-center justify-center h-full'>
      <div className='flex flex-col'>
        <h1 className='text-3xl md:text-6xl text-cen'>Who is watching?</h1>
        <div className='flex items-center justify-center gap-8 mt-10'>
          <div onClick={() => {router.push("/")}}>

            <div className='group flex flex-col w-44  mx-auto'>
              <div className='
                w-44
                h-44
                rounded-md
                flex
                items-center
                justify-center
                border-2
                border-transparent
                group-hover:cursor-pointer
                group-hover:border-white
                overflow-hidden
              '>
                <img className='rounded-md' src='/images/default-blue.png' alt='Profile' /> 
              </div>

              <div className='mt-4 text-gray-400 text-2xl text-center'>
                {user?.name}
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile