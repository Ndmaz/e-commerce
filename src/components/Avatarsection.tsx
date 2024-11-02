'use client'


import { LogOutButton, LoginButton } from "./SignAuth";

import { RxAvatar } from "react-icons/rx";
import { useSession } from "next-auth/react";
import { useState } from "react";
export default  function Avatarsection() {
  const [avatartoggle,setavatartoggle]=useState(false)
    const {data:session}=useSession()
    const signed=session?.user.role == "USER" ? (
      <div className="hidden opacity-95 bg-white md:block shadow-md rounded-lg z-10  absolute md:mt-2 md:space-x-2 -top-2 -left-[4rem] w-[10rem] min-h-[6rem] p-2">
      <div className="flex h-10  opacity-20 ">
       <div className="w-1/3 rounded-br-xl bg-slate-300"></div>
       <div className="w-1/3 rounded-t-xl bg-white"></div>
       <div className="w-1/3  rounded-bl-xl bg-slate-300 "></div>
      </div>
      <div className="bg-white rounded-sm">
        <p dir="rtl" className="border-b-2 border-slate-600">نام کاربری:{session.user.name}</p>
        <p dir="rtl" className="border-b-2 border-slate-600 mb-4">ایمیل:{session.user.email}</p>
       <LogOutButton />
      </div>
     
     </div>
    ) : (
      <div className="hidden opacity-95 bg-white md:block shadow-md rounded-lg z-10  absolute md:mt-2 md:space-x-2 -top-2 -left-[4rem] w-[10rem] min-h-[6rem] p-2">
       <div className="flex h-10  opacity-20 ">
        <div className="w-1/3 rounded-br-xl bg-slate-300"></div>
        <div className="w-1/3 rounded-t-xl bg-white"></div>
        <div className="w-1/3  rounded-bl-xl bg-slate-300 "></div>
       </div>
       <div className="bg-white rounded-sm">
         <p dir="rtl" className="">شما وارد نشدید:</p>
        <LoginButton />
       </div>
      
      </div>
    )
   
  return (
    <div className="relative hidden md:block" onMouseOver={()=>setavatartoggle(true)} onMouseLeave={()=> setavatartoggle(false)}>
        <RxAvatar className="text-2xl"  />
         {avatartoggle&&signed}
    </div>
  )
}
