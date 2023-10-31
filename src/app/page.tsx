import Contacts from './contact/page'
import Header from './_components/Header'
import Link from 'next/link'


export default function Home() {
  return (
    <main >
      <div >
        <Header />
        <Contacts />
      </div>
    </main>
  )
}
