"use client"
import React, { useState } from 'react';
import Header from '../../_components/Header';
import { useRouter } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server'


interface FormData {
    first_name: string,
    last_name: string,
    job: string,
    description: string
}


export default function AddContact() {

    let initialFormState:FormData = {
            first_name: '',
            last_name: '',
            job: '',
            description: ''
    }
    const router = useRouter()
    const [formData, setFormData] = useState<FormData>(initialFormState)


    const addcontact = async (e:any) => {
        e.preventDefault();

        const add = await fetch(process.env.PATH_URL_BACKEND+'/api/contacts', {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({contact:formData}),
          });
          let content = await add.json();
          console.log("content", content)
          if(content.statusCode === 201) {
            router.push('/contact');
          }


    }

    return(
        <div>
            <Header />
            <form onSubmit={(e) => addcontact(e)}>
            <div className='p-1 mx-2 my-1 border-gray-400 border-2 rounded flex'>
                <div className='flex flex-col grow m-1 pr-1 lg:m-4'>
                        <label htmlFor="" className='text-sm font-bold lg:text-xl'>First Name</label>
                        <input type='text' name='first_name' placeholder='First Name' className='w-full border-[1px] border-gray-200 p-2 rounded-sm'  onChange={(e:any)=>setFormData({...formData, first_name:e.target.value})}/>
                        <label htmlFor="" className='text-sm font-bold lg:text-xl'>Last Name</label>
                        <input type='text' name='last_name' placeholder='Last Name' className='w-full border-[1px] border-gray-200 p-2 rounded-sm'  onChange={(e:any)=>setFormData({...formData, last_name:e.target.value})}/>
                        <label htmlFor="" className='text-sm font-bold lg:text-xl'>Job</label>
                        <input type='text' name='job' placeholder='Job' className='w-full border-[1px] border-gray-200 p-2 rounded-sm'  onChange={(e:any)=>setFormData({...formData, job:e.target.value})}/>
                        <label htmlFor="" className='text-sm font-bold lg:text-xl'>Description</label>
                        <textarea name='description' placeholder='Description' className='w-full border-[1px] border-gray-200 p-2 rounded-sm'  onChange={(e:any)=>setFormData({...formData, description:e.target.value})}/>
                        <div className='w-full py-2 text-center'>
                          <button className=" w-36 p-2 text-white  rounded-md bg-blue-600 hover:bg-blue-500">Submit</button>
                        </div>
                </div>
            </div>
            </form>
        </div>
    )
}
