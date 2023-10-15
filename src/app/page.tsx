import Image from 'next/image'
import Carousel from '@/components/Carousel'
import { getServerSession } from 'next-auth'
import authOptions from '@/lib/auth'

export default async function Home() {
  const session=await getServerSession(authOptions)
  return (
    <main className=' mt-[5rem]'>
      {JSON.stringify(session)}
     <Carousel/>
     
  </main>
  )
}
