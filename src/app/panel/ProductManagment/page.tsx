"use client"


import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState}  from "react";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";


export default function Productmanagement(){

   const [productname,setProductname]=useState('')
   const [productcode,setProductcode]=useState('')
   const [category,setcategory]=useState('')
   const [price,setprice]=useState('')
   const [img,setimg]=useState('')
   const [synopsis,setSynopsis]=useState('')
   const [discripstion,setDiscription]=useState('')
   const [details,setditals]=useState('')

   const handlesubmit= async(event: React.FormEvent<HTMLFormElement>)=>{
    event.preventDefault()
const data={  productname
  ,productcode
  ,category
  ,price
  ,img
  ,synopsis
  ,discripstion
  ,details}
    try {
      const res= await fetch('/api/product',{
        method: 'POST'
         ,headers:{  'Content-Type':'application/json'}
        ,body:JSON.stringify(data)
       

      })
      if (res.ok) {
        alert('Product created successfully!'+res.body);
        alert
      } else {
        alert('Failed to create product!');
      }

    } catch (error) {
      console.log(error)
    }

   }
    return (
    <div className="flex flex-col grow  bg-white md:w-[60vw] md:max-w-xl md:mx-auto pt-6 px-8 md:pt-3  md:mt-6  md:rounded-xl md:shadow-lg">

    <div className="text-right mr-6 space-y-4 p-4">
     
     <p className="font-bold ">ثبت محصول </p>
     <p>با وارد کردن اطلاعات محصول آنرا ثبت نمایید</p>
    </div>
    
     <form  onSubmit={handlesubmit} className="p-4 space-y-4 text-right">
 
       
  
         <div className="space-y-4">
         <Label className="" htmlFor="name">نام محصول </Label>
           <Input id="name" type="text" value={productname} onChange={(e)=>setProductname(e.target.value)}/>
           <br />
           <Label className="mt-2" htmlFor="code">کد محصول</Label>
           <Input id="code" type="text" value={productcode} onChange={(e)=>setProductcode(e.target.value)}  />
           <br />
           <Label className="" htmlFor="category">نوع محصول</Label>
           <Input id="category" type="text" value={category} onChange={(e)=>setcategory(e.target.value)}  />
           <br />
           <Label className="" htmlFor="price">قیمت</Label>
           <Input id="price" type="text" value={price} onChange={(e)=>setprice(e.target.value)}  />
           <br />
           <Label className="ml-auto" htmlFor="image">عکس محصول</Label>
           <Input id="image"  type="text" value={img} onChange={(e)=>setimg(e.target.value)} />
           <br />
           <Label className="" htmlFor="synopsis">توضیح کوتاه</Label>
           <Textarea id="synopsis" value={synopsis} onChange={(e)=>setSynopsis(e.target.value)}/>
           <br />
           <Label className="" htmlFor="discription">بررسی محصول</Label>
           <Textarea id="discription" value={discripstion} onChange={(e)=>setDiscription(e.target.value)}/>
           <br />
           <Label className="" htmlFor="details">مشخصات محصول</Label>
           <Textarea id="details" value={details} onChange={(e)=>setditals(e.target.value)}/>
           
           </div>
           <Button  type="submit" className="w-full">ثبت محصول</Button>
        
 
     </form>
     <div className="mt-4 mb-28 md:mb-4 mx-auto text-right">
         
     </div>
     </div>
 )
}