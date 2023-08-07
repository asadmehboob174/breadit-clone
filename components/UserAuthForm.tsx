'use client'

import { FC } from 'react'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import React from 'react';
import { signIn} from 'next-auth/react'
import { Icons } from './Icon';
import { useToast } from '@/hooks/use-toast';

interface UserAuthFormProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
}

const UserAuthForm: FC<UserAuthFormProps> = ({className, ...props}) => {

  const [isloading, setIsLoading] = React.useState<boolean>(false);
  const {toast} = useToast();

  const loginWithGoogle = async () => {
    setIsLoading(true);

    try {
      await signIn('google');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'There was an error signing in with Google',
        variant: 'destructive',
        duration: 5000,
      })
    }
    finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={cn('flex justify-center', className)} {...props}>
      <Button onClick={loginWithGoogle} isloading={isloading} size='sm' className='w-full'>
        {isloading ? null : <Icons.google className='h-4 w-4 mr-2' />}
        Google
      </Button> 
    </div>
  )
}

export default UserAuthForm