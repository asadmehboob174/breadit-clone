import SignIn from '@/components/SignIn'
import SignUp from '@/components/SignUp'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { FC } from 'react'

interface pageProps {
  
}

const page: FC<pageProps> = ({}) => {
  return <div className='absolute inset-0'>
     <div className='h-full max-w-7xl mx-auto flex flex-col items-center justify-start gap-10 pt-20 '>
        <div className='pl-10 self-start'>
         <Link href="/" className={cn(buttonVariants({ variant : 'ghost' }), 'bg-zinc-200 hover:bg-zinc-300')}>
          <ChevronLeft className='mr-2 h-4 w-4' />Home
         </Link>
        </div>
         <div className='pt-20'>
           <SignUp />
         </div>
     </div>
  </div>
}

export default page