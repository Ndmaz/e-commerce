'use client'

import { CiEdit } from "react-icons/ci"


import { usePE } from "@/store/usePE"
import { IoIosInformationCircleOutline } from "react-icons/io";


function Datatable() {
  const fieldnamechange= usePE((state)=>(state.fieldnamechange))
 
  const products=["اسم محصول","کد محصول","توضیح کوتاه","توضیح کامل","قیمت","تعداد","مشخصات","عکس"]
  
  return (
    
    <div className="flex flex-wrap bg-[#e5f9fa]">
   
{products.map((item)=>{
  return(<div className="p-2 bg-[#bee2c1] rounded-sm m-1" key={item}>
        <div>{item}</div>
        <IoIosInformationCircleOutline  />
        <CiEdit onClick = {()=>fieldnamechange(item)} className="hover:bg-[#6dc1cf]"/>
         </div>)
})}
     
      
    </div>
  )
}

export default Datatable
//productname= اسم محصول