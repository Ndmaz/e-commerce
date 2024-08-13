
import { useQuery } from 'react-query'
import { CgSpinner } from "react-icons/cg";
import Datatable from './Datatable'


import Editfield from './Editfield';
import { usePE } from '@/store/usePE';
import { useAPE } from '@/store/AsyncStore/useAPE';

//datafetched is displaied in the infofield and edited in the editfield, the feilds to be determined to be taken action on ...
// ... get selected in the datatable 

export default function SearchFunction(searchvalueprop:string) {
  const fieldname=usePE((state)=>state.fieldname)
  const profuctsinfochange=usePE((state)=>state.productsinfochange)
    type productdata={}
const {data,isLoading,isError,error}=useAPE(searchvalueprop)
if (isLoading){
  return <CgSpinner strokeWidth='1' className='animate-spin text-5xl' />
}
if(data==null){
  return <div  >محصولی با این اسم وجود ندارد</div>
}
profuctsinfochange(data)
  return (
    <div>

{isError&& `error:${error}`}
<div className='w-full bg-white rounded-sm '>{data?.productname}:{data?.productcode}:{data?.id}</div>
<Datatable
/>
{fieldname&&<Editfield id={data?.id} />  }  
{/*info field*/}
    </div>
  )
}


//luliul