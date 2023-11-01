import React from 'react';
import Link from 'next/link'


export default function Header () {
  return (
    <div className='text-center py-4 bg-yellow-400  md:text-start md:pl-5'>
      <Link href={`/contact`} >
            <div id='header' className={`text-slate-50 text-xl font-black w-fit inline-block md:block`}>Contact List</div>
      </Link>
    </div>
  );
}
