import React from 'react'
import { ContactModel } from '../_types_interface'
import Link from 'next/link'
import Image from "next/image";
import DeleteImg from '../../../public/delete.svg'
import EditImg from '../../../public/edit.svg'


export default function Contact(params: ContactModel) {
  return (
    <div className='p-1 mx-2 my-1 border-gray-400 border-2 rounded flex'>
	      <div className='flex shrink-0 items-center m-1 lg:m-4'>
            <img className='rounded-full w-16 h-16 lg:w-32 lg:h-32' src="https://i.pravatar.cc/300" alt="mock avatar" />
        </div>
        <div className='flex flex-col grow m-1 pr-1 lg:m-4'>
            <div className='flex items-center'>
              <div className='text-sm font-bold mr-2 lg:text-xl'>{params.first_name} {params.last_name} </div> 
              <>|</>
              <div className='text-sm ml-2 lg:text-xl'>{params.job}</div>
            </div>
            <div className='text-xs lg:text-sm text-ellipsis overflow-hidden'>{params.description}</div>
        </div>
        <div className='flex shrink-0 items-center'>
            <Link href={`/contact/edit/${params.id}`} className='right-3'>
                <Image className='w-6 h-6 m-2 lg:w-9 lg:h-9 lg:m-4' src={EditImg} alt='Edit' />
            </Link>
            <div onClick={()=>params.deleteContact(params.id)}>
                <Image className='w-6 h-6 m-2 lg:w-9 lg:h-9 lg:m-4 cursor-pointer' src={DeleteImg} alt='Delete' />
            </div>
        </div>
        
    </div>
  )
}