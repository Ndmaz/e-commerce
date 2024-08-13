'use client'
import { usePE } from "@/store/usePE"
import DetailEdit from "./DetailEdit"
import TextareaEdit from "./TextareaEdit"

import { useState } from "react"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { useMutation } from "react-query"
import { CgSpinner } from "react-icons/cg"
import { CheckIcon } from "@radix-ui/react-icons"
import { Button } from "./ui/button"
import DefaultEdit from "./DefaultEdit"
import ImageEdit from "./ImageEdit"


//there is 4 options:
//1. the fieldname is image so it does a radio button and a s3 action
//2. the fieldname is detail and again the array turns into radio button and based on choice there is changing and deleting
//3.the field name is eather description or syntax which just make the input type into textarea
//4. the rest are just a small string and an input gets shown


export default function Editfield(id) {

const fieldname=usePE((state)=>state.fieldname)
const productinfo=usePE((state)=>state.productsinfo)
const [Editinput,setEditinput]=useState('')

async function  mutate(){

  try {
    const res=await fetch('http://localhost:3000/api/PEmodifying',{
      method:'POST'
      ,headers:{'Content-Type':'application/json'}
      ,body:JSON.stringify({Editinput,fieldname,id})
    })
    if(res.ok){
      return res.json()
    }
    
  } catch (error) {
    
  }
}
const mutation=useMutation(mutate)
switch(fieldname){
  case 'عکس':
    return<ImageEdit/>
  case 'مشخصات':
       return<DetailEdit/>
  case   'توضیح کوتاه':  
  return<TextareaEdit/> 
  case   'توضیح کامل':  
  return<TextareaEdit/> 
 
  default:
    break
}
/*if(fieldname=='عکس'){

  

}else if(fieldname=='مشخصات'){

 

}else if(fieldname=='توضیح کوتاه'||fieldname=='توضیح کامل'){

  return<TextareaEdit/>

}
 */

//the default





console.log(productinfo)
  return (
    <div className="flex space-x-4 items-center ">

      
     {productinfo.productname}

<Label className="m-4  ">{fieldname}</Label>
 <Input className="w-50" name={fieldname} type="text" value={Editinput} onChange={(e)=>setEditinput(e.target.value)} />  

  <Button type="button" className=" my-auto" onClick={mutation.mutate}>ثبت تغیر</Button>
{mutation.isLoading&&<CgSpinner strokeWidth='1' className='animate-spin text-5xl' />}
{mutation.isSuccess&&<CheckIcon className='text-green-600 ' />}

    </div>
  )
}