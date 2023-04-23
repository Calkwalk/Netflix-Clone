import React, { useCallback, useState } from 'react'
import axios from 'axios';
import Input from '@/components/Input'
import Head from 'next/head';
import { signIn, SignInResponse } from 'next-auth/react';
import { useRouter } from 'next/router';

import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';

const Login = () => {

    const router = useRouter();

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const [variant, setVariant] = useState('login');

    const toggleVariant = useCallback(() => {
        setVariant((currentVariant) => currentVariant === 'login' ? 'register' : 'login')
    }, [])

    const login = useCallback(async () => {
        try {
            const resut= await signIn('credentials', {
                email,
                password,
                redirect: false,
                callbackUrl: '/profile'
            }) as SignInResponse ;

            router.push(resut?.url || '/login');

        } catch (error) {
            console.log(error);
        }
    },[email, password, router])

    const register = useCallback(async () => {
        try {
            const res = await axios.post('/api/register', {
                email,
                name,
                password
            });
            setVariant('login');
        } catch (error) {
            console.log(error);
        }
    }, [email, name, password, login])

    return (
        <>
            <Head>
                <title>Login - Netflix Clone</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className='relative h-full w-full bg-[url("/images/hero.jpg")] bg-no-repeat bg-center bg-fixed bg-cover'>
                <div className='bg-black w-full h-full lg:bg-opacity-50'>
                    <nav className='px-12 py-5'>
                        <img src='/images/logo.png' alt='Logo' className='h-12' />
                    </nav>

                    <div className="flex justify-center">
                        <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-12 rounded-md w-full lg:w-2/5 lg:max-w-lg">
                            <h2 className='text-white text-4xl mb-8 font-semibold'>
                                {variant === 'login' ? 'Sign In' : 'Register' }
                            </h2>
                            <div className='flex flex-col gap-4'>
                                {variant === 'register' && (
                                    <Input id='username' 
                                        onChange={(e:any) => setName(e.target.value)} 
                                        label='Name' 
                                        type='text' value={name} />
                                )}
                                
                                <Input id='email' 
                                    onChange={(e:any) => setEmail(e.target.value)} 
                                    label='Email' 
                                    type='email' value={email} />
                                <Input id='password' 
                                    onChange={(e:any) => setPassword(e.target.value)} 
                                    label='Password' 
                                    type='password' value={password} />
                            </div>
                            <button className='bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition'
                                onClick={ variant === 'login' ? login : register }
                            >
                                {variant == 'login' ? 'Login' : 'Sign Up'}
                            </button>
                            
                            <div className='flex flex-row items-center justify-center gap-4 mt-8'>
                                    <div className='w-10 h-10 bg-white rounded-full 
                                        flex items-center justify-center cursor-pointer
                                        hover:opacity-90 transition'
                                        onClick={ async () => signIn('google',{callbackUrl: '/proflie'})}>
                                        <FcGoogle size={28} />
                                    </div>
                                    <div className='w-10 h-10 bg-white rounded-full 
                                        flex items-center justify-center cursor-pointer
                                        hover:opacity-90 transition'
                                        onClick={ async () => signIn('github',{callbackUrl: '/proflie'})}>
                                        <FaGithub size={28} />
                                    </div>
                            </div>

                            <p className='text-neutral-500 mt-12'>
                                {variant === 'login' ? 'First time using Netflix?' : 'Already have an account?'}
                                <span className='text-white ml-1 hover:underlne cursor-pointer' onClick={toggleVariant} >
                                    {variant === 'login' ? 'Create an account' : 'Sign in'}
                                </span>
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </>
        
    )
}

export default Login