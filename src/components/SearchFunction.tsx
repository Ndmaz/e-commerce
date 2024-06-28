
import { useQuery } from 'react-query'
import { CgSpinner } from "react-icons/cg";
import Datatable from './Datatable'
import { Input } from './ui/input';
import { useinputboolean } from '@/lib/store';
import Editfield from './Editfield';


export default function SearchFunction(searchvalueprop: any) {
  const inputbolean=useinputboolean((state)=>state.inputboolean)
  
    type productdata={}

  async function queryfetchfunction() {
     
    try {
      const res=await fetch('http://localhost:3000/api/PEsearchresult',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
         body:JSON.stringify({searchvalueprop})
       })
       if (res.ok){
        const datacapsole= await res.json()
       
   console.log(datacapsole.product)
          return datacapsole.product
      
        
       }
      } catch (error) {
       return error
      }
  }

    const {data,isLoading,error,isError}= useQuery({
        queryKey:['f']
        ,queryFn:queryfetchfunction
        
  
        }
      )

  return (
    <div>
{isLoading&&<CgSpinner strokeWidth='1' className='animate-spin text-5xl' />}
{isError&& `error:${error}`}
<div className='w-full bg-white rounded-sm '>{data?.productname}:{data?.productcode}:{data?.id}</div>
<Datatable
name={data?.productname}
code={data?.productcode}

/>
{inputbolean&&<Editfield />  }  

    </div>
  )
}


//luliul