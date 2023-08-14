'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Image as ImageIcon, Link2 } from 'lucide-react'
import { FC } from 'react'
import type { Session } from 'next-auth'
import { usePathname, useRouter } from 'next/navigation'
import UserAvatar from './UserAvatar'

interface MiniCreatePostProps {
  session: Session | null
}

const MiniCreatePost: FC<MiniCreatePostProps> = ({ session }) => {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <ul>
      <li className='overflow-hidden rounded-md bg-blue-50 shadow'>
      <div className='h-full px-6 py-4 flex justify-between gap-5'>
        <div className='relative'>
          <UserAvatar
            user={{
              name: session?.user.name || null,
              image: session?.user.image || null,
            }}
          />

          <span className='absolute bottom-0 right-0 rounded-full w-3 h-3 bg-green-500 outline outline-2 outline-white cursor-pointer' />
        </div>
        <Input
          onClick={() => router.push(pathname + '/submit' as any)}
          readOnly
          placeholder='Create post'
        />
        <Button
          onClick={() => router.push(pathname + '/submit' as any)}
          variant='ghost'>
          <ImageIcon className='text-zinc-600' />
        </Button>
        <Button
          onClick={() => router.push(pathname + '/submit' as any)}
          variant='ghost'>
          <Link2 className='text-zinc-600' />
        </Button>
      </div>
    </li>
    </ul>
  )
}

export default MiniCreatePost