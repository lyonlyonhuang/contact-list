"use client"
import React, { useState, useEffect } from 'react';
import useSWR from "swr";
import Header from '../../../_components/Header';
import { useRouter } from 'next/navigation';
import ConfirmationModal from '../../../_components/ConfirmationModal'


const fetcher  = (url: string) => fetch(url).then((res) => res.json());

interface FormData {
    id:number,
    first_name: string,
    last_name: string,
    job: string,
    description: string
}

const EditColor = {
    cancelButton: 'border-2 border-blue-500 text-blue-500 hover:bg-blue-100',
    confirmButton: 'border-2 border-blue-500 bg-blue-500 hover:bg-blue-400'
  }


export default function EditContact({params} :{params:{id:number}}) {
    let initialFormState:FormData = {
        id: 0,
        first_name: '',
        last_name: '',
        job: '',
        description: ''
}

    const router = useRouter()
    const [formData, setFormData] = useState<FormData>(initialFormState)
    const { data, error, isLoading } = useSWR<any>(process.env.PATH_URL_BACKEND+`/api/contacts/${params.id}`, fetcher );
    const [confirmModalOpen, setConfirmModalOpen] = useState<boolean>(false)

    useEffect(()=>{
        if(data && data.data)
        {
          
          setFormData(data.data)

        }
      },[data,isLoading]);


    const editContact = async (e:any) => {

        const add = await fetch(process.env.PATH_URL_BACKEND+`/api/contacts/${params.id}`, {
            method: 'PATCH',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({info:formData}),
          });
          let content = await add.json();
          if(content.statusCode === 201) {
            router.push('/contact');
          }


    }

    const popupConfirmModal = (e:any) => {
        e.preventDefault();
        setConfirmModalOpen(true);
      };
    
      const handleConfirm = (confirm:boolean, e:any) => {
          if(confirm) {
            editContact(e)
          }
          setConfirmModalOpen(false)
      }

    if(isLoading) return <div><span>Loading...</span></div>
    if (!data) return null;
    return(
        <div>
            <Header />
            <form onSubmit={(e) => popupConfirmModal(e)}>
            <div className='p-1 mx-2 my-1 flex'>
                <div className='flex flex-col grow m-1 pr-1 lg:m-4'>
                    <div className="grow text-center text-4xl font-bold my-4 lg:text-6xl">Edit Contact</div>
                    <label htmlFor="" className='text-sm font-bold lg:text-xl'>First Name</label>
                    <input 
                        type='text' 
                        name='first_name' 
                        placeholder='First Name' 
                        className='w-full border-[1px] border-gray-200 p-2 rounded-sm'
                        value={formData.first_name}
                        onChange={(e:any)=>setFormData({...formData, first_name:e.target.value})}
                    />
                    <label htmlFor="" className='text-sm font-bold lg:text-xl'>Last Name</label>
                    <input 
                        type='text' 
                        name='last_name'
                        placeholder='Last Name' 
                        className='w-full border-[1px] border-gray-200 p-2 rounded-sm'
                        value={formData.last_name}
                        onChange={(e:any)=>setFormData({...formData, last_name:e.target.value})}
                    />
                    <label htmlFor="" className='text-sm font-bold lg:text-xl'>Job</label>
                    <input 
                        type='text' 
                        name='job' 
                        placeholder='Job' 
                        className='w-full border-[1px] border-gray-200 p-2 rounded-sm'
                        value={formData.job}  
                        onChange={(e:any)=>setFormData({...formData, job:e.target.value})}
                    />
                    <label htmlFor="" className='text-sm font-bold lg:text-xl'>Description</label>
                    <textarea 
                        name='description' 
                        placeholder='Description' 
                        className='w-full border-[1px] border-gray-200 p-2 rounded-sm'
                        value={formData.description}  
                        onChange={(e:any)=>setFormData({...formData, description:e.target.value})}
                    />
                    <div className='w-full py-2 text-center'>
                      <button className=" w-full p-2 mt-2 text-white  rounded-md bg-blue-600 hover:bg-blue-500">Edit</button>
                    </div>
                </div>
            </div>
            </form>
            <ConfirmationModal 
                text={'Edit contact'} 
                open={confirmModalOpen} 
                buttonColor={EditColor} 
                uiqID={`${Math.random()}`}
                handleConfirm={handleConfirm}
                setConfirmModalOpen={setConfirmModalOpen}
            />
        </div>
    )
}
