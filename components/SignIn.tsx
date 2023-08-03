import { FC } from 'react'
import { Icons } from './Icon'
import Link from 'next/link'
import UserAuthForm from './UserAuthForm'

interface SignInProps {
  
}

const SignIn: FC<SignInProps> = ({}) => {
  return <div className='
               container 
               mx-auto 
               flex flex-col 
               w-full justify-center space-x-6 
               sm:w-[400px]
               max-w-2xl
               bg-zinc-100
               border-[1px]
               border-gray-200 
               shadow-sm
               rounded-lg
               h-80
               '>
                <div className='flex flex-col space-y-2 text-center'>
                    <Icons.logo className='mx-auto h-6 w-6'  />
                    <h1 className='text-2xl font-bold tracking-tight'>Welcome back</h1>
                    <p className='text-sm max-w-xs mx-auto'>
                      By continuing, you are setting up a Breadit accout and
                      agree to our User Agreement and Privacy Policy. 
                    </p>

                    {/* SingInForm */}
                    <UserAuthForm className='' />

                    <p className='px-8 text-center text-sm text-zinc-700 '>
                       New to Breadit?{" "}
                       <Link href={"/sign-up"} className='hover:text-zinc-800 text-sm hover:underline-offset-4 hover:underline font-medium' >Sign Up</Link>
                    </p>
                </div>
               </div>
}

export default SignIn