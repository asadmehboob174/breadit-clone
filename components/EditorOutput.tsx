'use client'

import dynamic from 'next/dynamic'
import { FC } from 'react';
import Image from 'next/image'

const Output = dynamic(
  async () => (await import('editorjs-react-renderer')).default,
   { 
    ssr: false,
   }
)

interface EditorOutputProps {
  content : any
}

const style = {
   paragraph : {
     fontSize : '0.875rem',
     lineHeight : '1.25rem',
   }
}

const renderers = {
  image : CustumImageRenderer,
  // code : CustumCodeRenderer
}

const EditorOutput: FC<EditorOutputProps> = ({content}) => {
  return <Output style={style} renderers={renderers} className="text-sm" data={content} />;
}

function CustumImageRenderer(data : any) {
   const src = data.data.file.url;

   return (
     <div className='relative w-full min-h-[15rem]'>
        <Image src={src} alt="image" fill className='object-contain' />
     </div>
   )
}

export default EditorOutput