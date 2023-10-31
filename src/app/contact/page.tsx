"use client";
import React,{useEffect, useState} from "react";
import useSWR from "swr";
import { ContactModel, AddContactModel } from "../_types_interface";
import Header from '../_components/Header';
import Contact from "../_components/Contact";
import Image from "next/image";
import SortA2Z from '../../../public/sortA2Z.svg'
import SortZ2A from '../../../public/sortZ2A.svg'
import Link from 'next/link'
import AddImg from '../../../public/add.svg'

const fetcher  = (url: string) => fetch(url).then((res) => res.json());


interface SortItems {
  first_name: string
} 

const Directions = {
  ASCENDING: 'ASCENDING',
  DESCENDING: 'DESCENDING'
} 

export default function Contacts() {
  const [contacts,setContacts] = useState<ContactModel[]>([]);
  const [sortFrom, setsortFrom] = useState<string>(Directions.ASCENDING);
  const { data, error, isLoading } = useSWR<any>(`/api/contacts`, fetcher );
  useEffect(()=>{
    if(data && data.result.data)
    {
      let dataArray = [...data.result.data]
      dataArray = dataArray.sort((curr: SortItems, next: SortItems) => {
          return curr.first_name.localeCompare(next.first_name)
      })
      if(sortFrom === Directions.DESCENDING){
        dataArray = dataArray.reverse()
      }
      console.log("Directions",sortFrom);
      console.log("sortcontacts",dataArray);
      setContacts(dataArray);
      
    }
  },[data,isLoading]);

  useEffect(() => {
    let dataArray = [...contacts]
    dataArray = dataArray.sort((curr: SortItems, next: SortItems) => {
      return curr.first_name.localeCompare(next.first_name)
    })
    if(sortFrom === Directions.DESCENDING){
      dataArray = dataArray.reverse()
    }
    setContacts(dataArray);
  }, [sortFrom]);

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;
  if (!data) return null;

  let delete_Contact : ContactModel['deleteContact']= async (id:number) => {
    const res = await fetch(process.env.PATH_URL_BACKEND+`/api/contacts/${id}`, {
      method: 'DELETE',
      headers: {
        'accept': 'application/json',
      },
    });
    const content = await res.json();
    if(content.statusCode>0)
    {
      setContacts(contacts?.filter((contact:ContactModel)=>{  return contact.id !== id  }));
    }
  }

  return (
    <div>
      <div>
        <Header />
      </div>
      <div className="flex items-center">
        <Link href={`/contact/add/`} className='flex basis-1/5 md:basis-1/12 justify-center'>
            <Image className='w-6 h-6 m-2 lg:w-9 lg:h-9 lg:m-4 bg-yellow-400 rounded' src={AddImg} alt='add' />
        </Link>
        <div className="grow text-center text-4xl font-bold my-4 lg:text-6xl">Contacts</div>
        <div className="flex basis-1/5 md:basis-1/12 justify-center">
          {
            sortFrom === Directions.ASCENDING 
              ? <Image className='w-6 h-6 m-2 lg:w-9 lg:h-9 lg:m-4 cursor-pointer' src={SortA2Z} alt='Edit' onClick={() => setsortFrom(Directions.DESCENDING)} />
              : <Image className='w-6 h-6 m-2 lg:w-9 lg:h-9 lg:m-4 cursor-pointer' src={SortZ2A} alt='Edit' onClick={() => setsortFrom(Directions.ASCENDING)} />
          }
        </div>
        <>{console.log("contacts", contacts)}</>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 mx-1">
        {
           contacts && contacts.map((contact : ContactModel)=>
              <Contact key={contact.id + contact.first_name} {...contact} deleteContact = {delete_Contact} />
           )
        }
      </div>
    </div>
  );
}