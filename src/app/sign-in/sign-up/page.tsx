"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react";
import Link from "next/link";
import { redirect } from "next/dist/server/api-utils";



export default function Signup(){

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    const handleSubmit =async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
          }

try {
    const res= await fetch('/api/register',{
        method:'POST',
        body:JSON.stringify({
name
,email
,password
        }),
        headers:{
            'Content-Type':'application/json'
        }
    })
    if (res.ok){

    }

} catch (error) {
    console.log(error)
}

      };
  

return(
<div className="flex flex-col grow  bg-white md:w-[60vw] md:max-w-xl md:mx-auto pt-6 px-8 md:pt-3  md:mt-6  md:rounded-xl md:shadow-lg">
   
   <div className="text-right mr-6 space-y-4 p-4">
    
    <p className="font-bold ">ثبت نام </p>
    <p>با وارد کردن اطلاعات خود ثبت نام نمایید</p>
   </div>
   
    <form  onSubmit={handleSubmit} className="p-4 space-y-4 text-right">

    <Button className="w-full " variant="outline" >
           
           با گوگل ثبت نام کنید
         </Button>
         <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" /> 
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              یا ادامه بدهید با
            </span>
          </div>
        </div>
 
        <div className="space-y-4">
        <Label className="" htmlFor="name">نام و نام خانوادگی</Label>
          <Input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)}/>
          <br />
          <Label className="mt-2" htmlFor="email">ایمیل</Label>
          <Input id="email" type="email" placeholder="m@example.com"  value={email} onChange={(e) => setEmail(e.target.value)} />
          <br />
          <Label className="" htmlFor="password">رمز عبور</Label>
          <Input id="password" type="password"   value={password} onChange={(e) => setPassword(e.target.value)}/>
          <br />
          <Label className="ml-auto" htmlFor="password">تایید رمز عبور </Label>
          <Input id="password"  type="password"  value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </div>
          <Button  type="submit" className="w-full">ثبت نام</Button>
       

    </form>
    <div className="mt-4 mb-28 md:mb-4 mx-auto text-right">
        <p className="inline pl-2">اکانت دارید؟</p>
        <Link className="font-bold" href="/sign-in">وارد شوید</Link>
    </div>
    </div>
)
  
}