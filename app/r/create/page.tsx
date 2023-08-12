"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { useState } from "react";
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { CreateSubredditPayLoad } from "@/lib/validators/subreddits";
import { toast } from "@/hooks/use-toast";
import { useCustomToast } from "@/hooks/use-custum-toast";

const page = () => {
   const [input, setInput] = useState<string>('');
   const router = useRouter();
   const { loginToast} = useCustomToast()

  const { mutate : createCommunity, isLoading, isSuccess } = useMutation({
    mutationFn: async () => {
      const payload : CreateSubredditPayLoad = {
           name : input
      }

      const { data } = await axios.post('/api/subreddit', payload);
      return data as string
    },
    onSuccess : (data) => {
          toast({
              title : 'Subreddit created',
              variant : 'success'
           })
          router.push(`/r/${encodeURIComponent(data)}`)
    },
    onError : (error) => {
      if(error instanceof AxiosError) {
         if(error.response?.status === 409) {
           return toast({
              title : 'Subreddit already exists',
              description : 'Please choose a different subreddit name',
              variant : 'destructive'
           })
         }
         if(error.response?.status === 422) {
           return toast({
              title : 'Invalid subreddit name',
              description : 'Please choose a name between 3 and 21 characters',
              variant : 'destructive'
           })
         }
         if(error.response?.status === 401) {
           return loginToast()
         }
         return toast({
              title : 'Error Ocurred',
              description : 'Please try again',
              variant : 'destructive'
           })
      }
    }
  })

  return (
    <div className="container flex items-center h-full max-w-3xl mx-auto ">
       <div className="relative bg-white/90 w-full h-fit p-4 rounded-lg space-y-6 border border-zinc-100">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold">Create a Community</h1>
          </div>

          <hr className="bg-zinc-500 h-px" />

          <div>
              <p className="text-lg font-md">Name</p>
              <p className="text-xs pb-2 text-gray-600">Community names including capitalization cannot be changed.</p>

              <div className="relative">
                 <p className="absolute text-sm left-0 w-8 inset-y-0 grid place-items-center text-zinc-400">r/</p>
                 <Input value={input} onChange={(e) => setInput(e.target.value)} className="pl-6" />
              </div>
          </div>

          <div className="flex justify-end gap-4">
              <Button variant={"subtle"} onClick={() => {router.back()}}>Cancel</Button>
              <Button isloading={isLoading} disabled={input.length === 0 || isLoading} onClick={() => createCommunity()}>Create Community</Button>
          </div>
       </div>
    </div>
  )
}

export default page