'use client'

import { FC } from 'react'
import Image from 'next/image';
import { User } from "next-auth";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import UserAvatar from './UserAvatar';
import { AvatarProps } from '@radix-ui/react-avatar';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

interface UserAccountNavProps {
  user : Pick<User, 'name' | 'image' | 'email'>
}

const UserAccountNav: FC<UserAccountNavProps> = ({user}) => {
  return <DropdownMenu>
     <DropdownMenuTrigger>
         <UserAvatar
          className='h-8 w-8'
          user={{
            name : user.name || null,
            image : user.image || null,
          }}  />
     </DropdownMenuTrigger>
     <DropdownMenuContent className='bg-white' align='end'>
         <div className='flex items-center justify-start gap-2 p-2 '>
             <div className='flex flex-col space-y-1 leading-none'>
                 {
                  user.name && <p className='font-medium'>{user.name}</p>
                 }{
                  user.email && <p className='w-[200px] truncate text-sm text-zinc-700'>{user.email}</p>
                 }
             </div>
         </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
            <Link href={"/"} className='hover:bg-zinc-100 cursor-pointer'>Feed</Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
            <Link href="/r/create" className='hover:bg-zinc-100 cursor-pointer'>Create Community</Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
            <Link href="/settings" className='hover:bg-zinc-100 cursor-pointer'>Settings</Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem className='cursor-pointer hover:bg-zinc-100' onSelect={(event) => {
           event.preventDefault();
           signOut({
            callbackUrl : `${window.location.origin}/sign-in`
           });
        }}>
            Sign Out
        </DropdownMenuItem>
     </DropdownMenuContent>

  </DropdownMenu>
}

export default UserAccountNav