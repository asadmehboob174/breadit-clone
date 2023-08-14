'use client'

import { FC, startTransition } from 'react'
import { Button, buttonVariants } from './ui/button';
import { useMutation } from '@tanstack/react-query';
import { SubscribeToSubredditPayload } from '@/lib/validators/subreddits';
import axios, { AxiosError } from 'axios';
import { error } from 'console';
import { useCustomToast } from '@/hooks/use-custum-toast';
import { toast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

interface SubscribeLeaveToggleProps {
  subredditId : string,
  subredditName : string,
  isSubscribed : boolean
}

const SubscribeLeaveToggle: FC<SubscribeLeaveToggleProps> = ({subredditId, subredditName, isSubscribed}) => {

  const { loginToast } = useCustomToast();
  const router = useRouter();

  const { mutate : subscribe, isLoading : isSubLoading} = useMutation({
    mutationFn : async () => {
       const payload : SubscribeToSubredditPayload = {
           subredditId 
       }

       const {data} = await axios.post('/api/subreddit/subscribe', payload);
       return data as string;
      },
      onError : (error) => {
        if(error instanceof AxiosError) {
          if(error.response?.status === 401) {
            return loginToast()
          }
        }

        return toast({
          title : 'There was a problem,',
          description : 'Something went wrong, please try again',
          variant : 'destructive'
        }) 
        
      },
      onSuccess : () => {
         startTransition(() => {
            router.refresh();
         })

         toast({
           title : 'Subscribed',
           description : `You are now subscribed to r/${subredditName}`,
           variant : 'default'
         })
      }
    }
  )

  const { mutate : unsubscribe, isLoading : isUnSubLoading} = useMutation({
    mutationFn : async () => {
       const payload : SubscribeToSubredditPayload = {
           subredditId 
       }

       const {data} = await axios.post('/api/subreddit/unsubscribe', payload);
       return data as string;
      },
      onError : (error) => {
        if(error instanceof AxiosError) {
          if(error.response?.status === 401) {
            return loginToast()
          }
        }

        return toast({
          title : 'There was a problem,',
          description : 'Something went wrong, please try again',
          variant : 'destructive'
        }) 
        
      },
      onSuccess : () => {
         startTransition(() => {
            router.refresh();
         })

         toast({
           title : 'UnSubscribed',
           description : `You are now unsubscribed to r/${subredditName}`,
           variant : 'default'
         })
      }
    }
  )

  return isSubscribed ? (
    <Button onClick={() => unsubscribe()} isloading={isUnSubLoading} disabled={isUnSubLoading} className={cn(buttonVariants({variant : 'destructive'}), 'w-full mt-1 mb-4')}>Leave Community</Button>
  ) : (
    <Button isloading={isSubLoading} disabled={isSubLoading} onClick={() => {subscribe()}} className='w-full mt-1 mb-4'>Join to Post</Button>
  )
}

export default SubscribeLeaveToggle