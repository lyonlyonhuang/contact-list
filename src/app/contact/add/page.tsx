"use client"
import React, { useState } from 'react';
import Header from '../../_components/Header';
import { useRouter } from 'next/navigation';
import ConfirmationModal from '../../_components/ConfirmationModal'

interface FormData {
    first_name: string,
    last_name: string,
    job: string,
    description: string
}


const AddColor = {
    cancelButton: 'border-2 border-green-500 text-green-500 hover:bg-green-100',
    confirmButton: 'border-2 border-green-500 bg-green-500 hover:bg-green-400'
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
    const [confirmModalOpen, setConfirmModalOpen] = useState<boolean>(false)


    const addContact = async (e:any) => {
        const add = await fetch(process.env.PATH_URL_BACKEND+'/api/contacts', {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({contact:formData}),
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
                addContact(e)
          }
          setConfirmModalOpen(false)
      }

    return(
        <div>
            <Header />
            <form onSubmit={(e) => popupConfirmModal(e)}>
            <div className='p-1 mx-2 my-1 flex'>
                <div className='flex flex-col grow m-1 pr-1 lg:m-4'>
                    <div className="grow text-center text-4xl font-bold my-4 lg:text-6xl"> Add Contact</div>
                    <label htmlFor="" className='text-sm font-bold lg:text-xl'>First Name</label>
                    <input type='text' name='first_name' placeholder='First Name' className='w-full border-[1px] border-gray-200 p-2 rounded-sm'  onChange={(e:any)=>setFormData({...formData, first_name:e.target.value})}/>
                    <label htmlFor="" className='text-sm font-bold lg:text-xl'>Last Name</label>
                    <input type='text' name='last_name' placeholder='Last Name' className='w-full border-[1px] border-gray-200 p-2 rounded-sm'  onChange={(e:any)=>setFormData({...formData, last_name:e.target.value})}/>
                    <label htmlFor="" className='text-sm font-bold lg:text-xl'>Job</label>
                    <input type='text' name='job' placeholder='Job' className='w-full border-[1px] border-gray-200 p-2 rounded-sm'  onChange={(e:any)=>setFormData({...formData, job:e.target.value})}/>
                    <label htmlFor="" className='text-sm font-bold lg:text-xl'>Description</label>
                    <textarea name='description' placeholder='Description' className='w-full border-[1px] border-gray-200 p-2 rounded-sm'  onChange={(e:any)=>setFormData({...formData, description:e.target.value})}/>
                    <div className='w-full py-2 text-center'>
                      <button className=" w-full p-2 mt-2 text-white  rounded-md bg-green-600 hover:bg-green-500">ADD</button>
                    </div>
                </div>
            </div>
            </form>
            <ConfirmationModal 
                text={'Add contact'} 
                open={confirmModalOpen} 
                buttonColor={AddColor} 
                uiqID={`${Math.random()}`}
                handleConfirm={handleConfirm}
                setConfirmModalOpen={setConfirmModalOpen}
            />
        </div>
    )
}
