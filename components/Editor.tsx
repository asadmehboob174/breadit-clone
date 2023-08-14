'use client'

import { FC, useCallback, useEffect, useRef, useState } from 'react';
import TextareaAutosize, { TextareaAutosizeProps } from 'react-textarea-autosize';
import { useForm, SubmitHandler } from "react-hook-form"
import { PostCreationRequest, PostValidator } from '@/lib/validators/post';
import { zodResolver } from '@hookform/resolvers/zod';
import type EditorJS from '@editorjs/editorjs';
import { uploadFiles } from '@/lib/uploadthing';
import { toast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query'
import axios from 'axios';
import { usePathname, useRouter } from 'next/navigation';
import { z } from 'zod';
import useStore from '../lib/zustand/store'

type FormData = z.infer<typeof PostValidator>

interface EditorProps {
  subredditId : string
}
const EDITTOR_HOLDER_ID = 'editorjs';

const Editor: FC<EditorProps> = ({subredditId}) => {

    const ref = useRef<EditorJS>();
    const _titleRef = useRef<HTMLTextAreaElement>(null); 
    const pathname = usePathname();
    const router = useRouter();
    const setLoading = useStore((state : any)  => state.setIsLoading)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<PostCreationRequest>({
        resolver: zodResolver(PostValidator),
        defaultValues : {
          subredditId,
          title : '',
          content: null
        }
    })

    const initializeEditor = async () => {
      const EditorJS = (await import('@editorjs/editorjs')).default 
      const Header = (await import('@editorjs/header')).default
      const Embed = (await import('@editorjs/embed')).default
      const Table = (await import('@editorjs/table')).default
      const List = (await import('@editorjs/list')).default
      const Code = (await import('@editorjs/code')).default
      const LinkTool = (await import('@editorjs/link')).default
      const InlineCode = (await import('@editorjs/inline-code')).default
      const ImageTool = (await import('@editorjs/image')).default

      const editor = new EditorJS({
          holder: EDITTOR_HOLDER_ID,
          onReady() {
            ref.current = editor
          },
          placeholder: 'Type here to write your post...',
          inlineToolbar : true,
          data : { blocks : []},
          tools : {
            header : Header,
            linkTool : {
              class : LinkTool,
              config : {
                endpoint : '/api/link'
              }
            },
            image : {
              class : ImageTool,
              config : {
                uploader : {
                    async uploadByFile(file : File) {
                      const [res] = await uploadFiles({
                        endpoint: "imageUploader",
                        files: [file],
                      });

                      return {
                        success : 1,
                        file : {
                          url : res.url
                        }
                      }
                    }
                }
              }
            },
            list : List,
            code : Code,
            InlineCode : InlineCode,
            table : Table,
            embed : Embed
          }
        })
    }

    useEffect(() => {
      if (!ref.current) {
        initializeEditor();

        setTimeout(() => {
          _titleRef.current?.focus();
        }, 0);
    }
    return () => {
      ref.current?.destroy();
      // @ts-ignore
      ref.current = null;
    }
  }, []);

    useEffect(() => {
      if(Object.keys(errors).length) {
          for(const [key, value] of Object.entries(errors)) {
          toast({
              title : 'something went wrong',
              description: (value as {message : string}).message,
              variant : 'destructive'
            })
          }}
    },[errors])

    const {mutate : createPost, isLoading, isError} = useMutation({
        mutationKey: ['createPost'],
        mutationFn: async ({ title, content, subredditId } : PostCreationRequest) => {
            const payload : PostCreationRequest = {
                title, content, subredditId
            }
            const { data } = await axios.post('/api/subreddit/post/create', payload);
            return data as string
        },
        onError: (error) => {
          setLoading()
          return toast({
                title : 'Something went wrong',
                description: 'Your post was not published, please try again later',
                variant : 'destructive'
              })
        },
        onSuccess: () => {
          setLoading()
          const newPathname = pathname.split('/').slice(0, -1).join('/');
          router.push(newPathname as any);
          router.refresh();
          return toast({
                description  : 'Your post has been published',
                variant : 'default'
              })
        }
    })

    async function onSubmit(data: FormData) {
      const blocks = await ref.current?.save()

      const payload: PostCreationRequest = {
        title: data.title,
        content: blocks,
        subredditId,
      }
    setLoading()
    createPost(payload)
  }


    const {ref : titleRef, ...rest} = register('title')

  return <div className='w-full p-4 bg-zinc-50 rounded-lg border border-zinc-200'>
    <form id='subreddit-post-form' className='w-fit'  onSubmit={handleSubmit(onSubmit)} >
        <div className='prose prose-stone dark:prose-invert'>
            <TextareaAutosize  {...rest} ref={(e) => {
              titleRef(e) 

              // @ts-ignore
              _titleRef.current = e
            }} className='resize-none w-full appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none' placeholder='Title'  />
            <div id={EDITTOR_HOLDER_ID} className='min-h-[300px]' />
            <p className='text-sm text-gray-500'>
              Use{' '}
              <kbd className='rounded-md border bg-muted px-1 text-xs uppercase'>
                Tab
              </kbd>{' '}
              to open the command menu.
          </p>
        </div>
    </form>
  </div>
}

export default Editor