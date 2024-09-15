import Image from 'next/image'

import { getServerSession } from 'next-auth'
import authOptions from '@/lib/auth'

export default async function Home() {
  const session=await getServerSession(authOptions)
  return (
     <div>
  <p className='inline-block'> {JSON.stringify(session)}</p>
  
     
    
     
  </div>
  )
}
