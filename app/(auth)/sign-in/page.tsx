import SignIn from '@/components/SignIn'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { FC } from 'react'

interface pageProps {
  
}

const page: FC<pageProps> = ({}) => {
  return <div className='absolute inset-0'>
     <div className='h-full max-w-7xl mx-auto flex flex-col items-center justify-start gap-10 pt-20 '>
        <div className='pl-10 self-start'>
         <Link href="/" className={cn(buttonVariants({ variant : 'ghost' }), 'bg-zinc-200 hover:bg-zinc-300')}>Home</Link>
        </div>
         <div className='pt-20'>
           <SignIn />
         </div>
     </div>
  </div>
}

export default page