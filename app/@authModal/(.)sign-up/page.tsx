import CloseModal from '@/components/CloseModal'
import SignUp from '@/components/SignUp'
import { FC } from 'react'

interface pageProps {
  
}

const page: FC<pageProps> = ({}) => <div className='fixed inset-0 bg-zinc-900/60 z-10 h-full'>
  <div className='container flex items-center max-w-[457px] mx-auto h-[840px] lg:h-[846px] lg:-translate-x-1'>
    <div className='relative w-full h-[385px] rounded-lg pt-[12px] lg:pt-[9px]'>
      <div className='absolute top-5 right-[7px]'>
        <CloseModal />
      </div>
      <SignUp />
    </div>
  </div>
</div>

export default page