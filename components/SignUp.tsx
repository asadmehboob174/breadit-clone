import { FC } from 'react'
import { Icons } from './Icon'
import Link from 'next/link'
import UserAuthForm from './UserAuthForm'

interface SignUpProps {
  
}

const SignUp: FC<SignUpProps> = ({}) => {
  return <div className='
               container 
               mx-auto 
               flex flex-col 
               w-full justify-center space-x-6 
               sm:w-[400px]
               max-w-4xl
               bg-zinc-100
               border-[1px]
               border-zinc-300 
               rounded-lg
               h-[350px]
               '>
                <div className='flex flex-col space-y-3 text-center'>
                    <Icons.logo className='mx-auto h-6 w-6'  />
                    <h1 className='text-2xl font-bold tracking-tight'>Sign Up</h1>
                    <p className='text-sm max-w-xs mx-auto'>
                      By continuing, you are setting up a Breadit accout and
                      agree to our User Agreement and Privacy Policy. 
                    </p>

                    {/* SingInForm */}
                    <UserAuthForm className='' />

                    <p className='px-8 text-center text-sm text-zinc-700 '>
                       Already a Breaditter?{" "}
                       <Link href={"/sign-in"} className='hover:text-zinc-800 text-sm hover:underline-offset-4 hover:underline font-medium' >Sign In</Link>
                    </p>
                </div>
               </div>
}

export default SignUp