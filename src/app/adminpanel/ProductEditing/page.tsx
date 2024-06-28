"use client"

import { Input } from '@/components/ui/input'
import { CiSearch } from "react-icons/ci"
import { useState } from 'react'
import { useQuery } from 'react-query'
import SearchFunction from '@/components/SearchFunction'
import Providers from '@/components/Providers'

export default function ProductEditing() {
  const [searchvalue,setsearchvalue]=useState<String|any|undefined>("")
  const[searchClicked,setsearchClicked]=useState<Boolean>(false)
  return (
    <div className='mt-6' dir='rtl'>
      <div className='w-[35vw] flex ml-auto mr-4' >
         
      <input className='bg-white w-full rounded-r-lg pr-2 ' name='search' type='text' placeholder=' جستجو محصول' value={searchvalue} onChange={(e)=>{setsearchvalue(e.target.value)}}/>
    <button onClick={()=>setsearchClicked(true)}><CiSearch strokeWidth='0.5' className='text-3xl rounded-l-xl  bg-white'/></button>
     
      </div>
      <div>
      
       {searchClicked&& <SearchFunction
         searchvalueprop={searchvalue}
         />}
          
      </div>
    </div>
  )
}
