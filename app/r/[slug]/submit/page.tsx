
import Editor from '@/components/Editor'
import SubmitButton from '@/components/SubmitButton'
import { db } from '@/lib/db'
import { notFound } from 'next/navigation'

type pageProps = {
  params: {
    slug : string
  }
}

const page = async ({params} : pageProps) => {
  const { slug } = params;
  const subreddit = await db.subreddit.findFirst({
    where : { 
      name : decodeURIComponent(slug),
    }
  }
  )

  if(!subreddit) return notFound();



  return <div className='flex flex-col items-start gap-6'>
     <div className='border-b border-gray-200 pb-5'>
        <div className='-mb-2 -mt-2 flex flex-wrap items-baseline'>
            <h3 className='ml-2 mt-2 text-base font-semibold leading-6 text-gray-900'>Create Post</h3>
            <p className='ml-2 mt-1 truncate text-sm text-gray-500'>in r/{decodeURIComponent(slug)}</p>
        </div>
     </div>

     {/* form */}
     <Editor subredditId={subreddit.id} />

     <SubmitButton />
  </div>
}

export default page