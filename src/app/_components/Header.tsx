import React from 'react';
import Link from 'next/link'

export default function Header () {
  return (
    <div className='text-center py-4 border-gray-400 border-t-2 border-b-2 md:text-start md:pl-5'>
      <Link href={`/contact`} >
            Contact List
      </Link>
    </div>
  );
}
