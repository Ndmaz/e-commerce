"use client"


import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";


export default function Productmanagement(){


  const [productname,setProductname]=useState('')
  // const [productcode,setProductcode]=useState('')
   const [category,setcategory]=useState('')
   const [price,setprice]=useState('')
   const [img,setimg]=useState('')
   const [synopsis,setSynopsis]=useState('')
  // const [discripstion,setDiscription]=useState('')
 // const [details,setditals]=useState('')
const [returnvalue,setreturnvalue]=useState<Boolean>()
const [datasback,setdatasback]=useState({data:{}})

   const handlesubmit= async(event: React.FormEvent<HTMLFormElement>)=>{
    event.preventDefault()
/*const data={  productname
  ,category
  ,price
  ,img
  ,synopsis

 }*/ 
    try {
      const res= await fetch('/api/product',{
        method: 'POST'
         ,headers:{  'Content-Type':'application/json'}
        ,body:JSON.stringify({
          productname
  ,category
  ,price
  ,img
  ,synopsis
        })
       

      })
      const datas= await res.json
     
      if (res.ok) {
        alert('Product created successfully!');
        setreturnvalue(true)
        setdatasback({data:{...datas}}) 
        
      } else {
        alert('Failed to create product!'+datas);
        
      }

    } catch (error) {
      console.log(error)
    }

   }

   // returned datas of the products, how can i 
    return (
    <div className="flex flex-col grow  bg-white md:w-[60vw] md:max-w-xl md:mx-auto pt-6 px-8 md:pt-3  md:mt-6  md:rounded-xl md:shadow-lg">

    <div className="text-right mr-6 space-y-4 p-4">
     
     <p className="font-bold ">ثبت محصول </p>
     <p>با وارد کردن اطلاعات محصول آنرا ثبت نمایید</p>
    </div>
    
     <form  onSubmit={handlesubmit} className="p-4 space-y-4 text-right">
 {returnvalue?`'datasent' ${datasback}`:'not sent' }
   


         <div className="space-y-4">
         <Label className="" htmlFor="name">نام محصول </Label>
           <Input name="name" type="text"  value={productname} onChange={(e)=>setProductname(e.target.value)} />
           <br />
           <Label className="" htmlFor="category">نوع محصول</Label>
           <Input name="category" type="text"  value={category} onChange={(e)=>setcategory(e.target.value)} />
           <br />
           <Label className="" htmlFor="price">قیمت</Label>
           <Input name="price" type="text"  value={price} onChange={(e)=>setprice(e.target.value)} />
           <br />
           <Label className="ml-auto" htmlFor="image">عکس محصول</Label>
           <Input name="image"  type="file"  value={img} onChange={(e)=>setimg(e.target.value)}/>
           <br />
           <Label className="" htmlFor="synopsis">توضیح کوتاه</Label>
           <Textarea name="synopsis"  value={synopsis} onChange={(e)=>setSynopsis(e.target.value)}  />
           
           </div>
           <Button  type="submit" className="w-full">ثبت محصول</Button>
        
 
     </form>
     <div className="mt-4 mb-28 md:mb-4 mx-auto text-right">
         
     </div>
     </div>
 )
} 

/*   value={productname} onChange={(e)=>setProductname(e.target.value)}
   value={productcode} onChange={(e)=>setProductcode(e.target.value)}
value={category} onChange={(e)=>setcategory(e.target.value)}
value={price} onChange={(e)=>setprice(e.target.value)}
 value={img} onChange={(e)=>setimg(e.target.value)}
 value={synopsis} onChange={(e)=>setSynopsis(e.target.value)}
 value={discripstion} onChange={(e)=>setDiscription(e.target.value)}
value={details} onChange={(e)=>setditals(e.target.value)}
 */