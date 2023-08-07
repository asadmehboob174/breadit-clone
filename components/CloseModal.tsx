'use client'

import { FC } from 'react'
import { Button } from './ui/button'
import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'


const CloseModal = ({}) => {
  const router = useRouter();

  return <Button variant="subtle" className='h-7 w-7 p-0 rounded-md bg-zinc-200' aria-label='close modal' 
  onClick={() => router.back()}
  >
    <X className='h-4 w-4' />
  </Button>
}

export default CloseModal