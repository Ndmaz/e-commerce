
import { getServerSession } from 'next-auth'
import authOptions from '@/lib/auth'
import Link from 'next/link'


export default async function Panellayout ({children}:{children:React.ReactNode}){

    const session=await getServerSession(authOptions)
   if(/*session?.user.role==='ADMIN'*/ true){
    return <div className='flex justify-center ' >
        <Link href='/adminpanel' className='font-bold text-lg bg-white inline-block mt-6 p-4 rounded-md'>برای رفتن به پنل ادمین کلیک کنید</Link>
    </div>
   }
    return<div className="h-full flex flex-row-reverse">

<div className="w-[25vw] bg-slate-400 h-full flex flex-col  space-y-8 font-semibold  " dir='rtl'>
<h1 className='mx-auto mt-2'>پنل کاربری</h1>


<div>

      <div className=" my-4 mx-5">
            مدیریت اطلاعات کاربر
        </div>  
       <div className="  mx-5">
                  مدیریت سفارشات   
          </div>
   </div>

  
</div>

<div className='w-full'>
    {children}
</div>
</div>
}
