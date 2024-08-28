'use client'

import { CiEdit } from "react-icons/ci"


import { usePE } from "@/store/usePE"
import { IoIosInformationCircleOutline } from "react-icons/io";
import { useAPE } from "@/store/AsyncStore/useAPE";


function Datatable() {
  const fieldnamechange= usePE((state)=>(state.fieldnamechange))

  const products=["اسم محصول","کد محصول","توضیح کوتاه","توضیح کامل","قیمت","تعداد","مشخصات","عکس"]
  
  return (
    
    <table className="flex flex-wrap bg-[#e5f9fa]">
   
{products.map((item)=>{
  return(<tr className="p-2 bg-[#bee2c1] rounded-sm m-1" key={item}>
    
<th>{item}</th>
 <th><CiEdit onClick = {()=>fieldnamechange(item)} className="hover:bg-[#6dc1cf]"/></th>
        
    
      
       
         </tr>)
})}
     
      
    </table>
  )
}

export default Datatable
//productname= اسم محصول