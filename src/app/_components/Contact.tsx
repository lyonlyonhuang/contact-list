import React, { useState, useEffect } from 'react'
import { ContactModel } from '../_types_interface'
import Link from 'next/link'
import Image from "next/image";
import DeleteImg from '../../../public/delete.svg'
import EditImg from '../../../public/edit.svg'
import ConfirmationModal from './ConfirmationModal'

const DeleteColor = {
  cancelButton: 'border-2 border-red-500 text-red-500 hover:bg-red-100',
  confirmButton: 'border-2 border-red-500 bg-red-500 hover:bg-red-400'
}

export default function Contact(params: ContactModel) {
  const [confirmModalOpen, setConfirmModalOpen] = useState<boolean>(false)
 
  const popupConfirmModal = () => {
    setConfirmModalOpen(true);
  };

  const handleConfirm = (confirm:boolean) => {
      if(confirm) {
          params.deleteContact(params.id)
      }
      setConfirmModalOpen(false)
  }

  return (
    <div className='p-1 mx-2 my-1 border-gray-400 border-2 rounded flex bg-slate-50 hover:bg-slate-100'>
	      <div className='flex shrink-0 items-center m-1 lg:m-4'>
            <img className='rounded-full w-16 h-16 lg:w-32 lg:h-32' src="https://i.pravatar.cc/300" alt="mock avatar" />
        </div>
        <div className='flex flex-col grow m-1 pr-1 lg:m-4'>
            <div className='flex items-center'>
              <div className='text-sm font-bold mr-2 lg:text-xl'>{params.first_name} {params.last_name} </div> 
              <>|</>
              <div className='text-sm ml-2 lg:text-xl'>{params.job}</div>
            </div>
            <div className='text-xs lg:text-sm'>{params.description}</div>
        </div>
        <div className='flex shrink-0 items-center'>
            <Link data-testid='contact-edit-link' href={`/contact/edit/${params.id}`} className='right-3'>
                <Image data-testid='contact-edit-button' className='w-6 h-6 m-2 lg:w-9 lg:h-9 lg:m-4' src={EditImg} alt='Edit' />
            </Link>
            <div onClick={() => popupConfirmModal()}>
                <Image data-testid='contact-delete-button' className='w-6 h-6 m-2 lg:w-9 lg:h-9 lg:m-4 cursor-pointer' src={DeleteImg} alt='Delete' />
            </div>
            <ConfirmationModal 
              text={'Delete contact'} 
              open={confirmModalOpen} 
              buttonColor={DeleteColor} 
              uiqID={`${Math.random()}`}
              handleConfirm={handleConfirm}
              setConfirmModalOpen={setConfirmModalOpen}
              />
        </div>
    </div>
  )
}