'use client'

import { FC } from 'react'
import { Button } from './ui/button'
import useStore from '@/lib/zustand/store'

interface SubmitButtonProps {
  
}

const SubmitButton: FC<SubmitButtonProps> = ({}) => {
  const isLoading = useStore((state : any) => state.isLoading)
  return (
    <div className='w-full flex justify-end'>
        <Button isloading={isLoading} disabled={isLoading} type='submit' className='w-full' form='subreddit-post-form'>Post</Button>
     </div>
  )
}

export default SubmitButton