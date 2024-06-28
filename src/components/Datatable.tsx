'use client'
import { useState } from "react"
import { CiEdit } from "react-icons/ci"
import { Input } from "./ui/input"
import { useinputboolean } from "@/lib/store"

function Datatable() {

  const addinput=useinputboolean((state)=>state.flipvalue)
  const products=["اسم محصول","کد محصول","توضیح کوتاه","توضیح کامل","قیمت","تعداد","مشخصات"]
  
  return (
    
    <div className="flex flex-wrap bg-[#e5f9fa]">
   
{products.map((item)=>{
  return(<div className="p-2 bg-[#bee2c1] rounded-sm m-1" key={item}>
        <div>{item}</div>
        <div>info</div>
        <CiEdit onClick={addinput} className="hover:bg-[#6dc1cf]"/>
         </div>)
})}
     
      
    </div>
  )
}

export default Datatable