'use server'
import { getServerSession } from 'next-auth'
import authOptions from '@/lib/auth'
import Link from 'next/link'


export default async function Adminlayout ({children}:{children:React.ReactNode}){

    const session=await getServerSession(authOptions)
   /* if(session?.user?.role =='USER'){
        return <div className='ml-8 mt-8 font-mono font-bold'> unauthenticated </div>
    }*/
    return<div className="h-full flex flex-row-reverse">

<div className="w-[25vw] bg-slate-400 h-full flex flex-col  space-y-8 font-semibold  rounded-l-lg" dir='rtl'>
<h1 className='mx-auto mt-2'>پنل کاربری</h1>
<div>
      <div className=" my-4 mx-5 " >
          <p>مدیریت محصولات</p>
<div className='flex flex-col font-thin'>
<Link href='/adminpanel/ProductRegestry'>  ثبت محصولات</Link>
<Link href='/adminpanel/ProductEditing'>ویرایش محصولات</Link>
<Link href='/adminpanel/ProductRemoving'>حذف محصولات</Link>
</div>
        </div>
        <div className=" my-4 mx-5">
             <p>  مدیریت سفارشات </p> 
             <div className='flex flex-col font-thin'>
             <Link href='/adminpanel/NewOrder'> سفارشات تازه</Link>
              <Link href='/adminpanel/NewOrder'> سفارشات تازه</Link>
                </div>    
          </div>
          <div className=" my-4 mx-5">
      <p> مدیریت کاربران   </p>     
          </div>
</div> 



  
</div>

<div className='w-full'>
    {children}
</div>
</div>
}
