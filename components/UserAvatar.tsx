import { User } from 'next-auth'
import { FC } from 'react';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Icons } from './Icon';
import { AvatarProps } from '@radix-ui/react-avatar';

interface UserAvatarProps extends AvatarProps {
  user : Pick<User, 'name' | 'image'> //User
}

const UserAvatar: FC<UserAvatarProps> = ({user, ...props}) => {
  return <Avatar {...props}>
    {
      user?.image ? (
        <div className='relative aspect-square h-full w-full'>
          <div className='flex items-center space-x-2 cursor-pointer'>
                          <Image className='rounded-full'
                            referrerPolicy='no-referrer'
                            fill
                            alt="profile picture"
                            src={user.image}
                             />
                        </div>
        </div>
      ) : (
        <AvatarFallback>
          <span className='sr-only'>{user?.name}</span>
          <Icons.user className='h-8 w-8 border-2 border-zinc-200 rounded-full text-center' />
        </AvatarFallback>
      )
    }
</Avatar>
}

export default UserAvatar