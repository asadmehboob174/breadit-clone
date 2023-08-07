
import Link from 'next/link'
import { FC } from 'react'
import { Icons } from './Icon'
import { buttonVariants } from './ui/button'
import { getAuthSession } from '@/lib/auth'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import UserAccountNav from './UserAccountNav'

interface NavbarProps {
}

const Navbar: FC<NavbarProps> = async ({}) => {

   const session = await getAuthSession();

  return <div className='
              fixed top-0 inset-x-0
              h-fit               
              bg-zinc-100 
              border-b border-zinc-300
              shadow-sm
               shadow-zinc-200
              z-[10]
              py-3
              '>

                <div className='
                     container
                     h-full
                     max-w-7xl
                     mx-auto
                     flex items-center justify-between gap-2
                     '>
                    {/* logo */}
                    
                    <Link href={"/"} className='flex gap-2 items-center'>
                        <Icons.logo className='w-8 h-8 sm:h-7 sm:w-7' />
                        <p className='
                            hidden 
                            text-zinc-700 text-sm font-medium
                            md:block
                            '>
                           Breadit
                        </p>
                    </Link>

                    {/* search bar */}
                    {
                      session?.user?.name ? (
                        <div className='translate-y-1'>
                          <UserAccountNav user={session?.user} />
                        </div>
                      ) :
                      (
                         <Link href={"/sign-in"} className={buttonVariants()}>Sign In</Link>
                      )
                    }
                    
                </div>
              </div>
}

export default Navbar