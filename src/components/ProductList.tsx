'use client'

import Productcard from "@/components/Productcard"

import { useQuery } from "react-query"

export default function ProductList(){

  const{data,error,isLoading}= useQuery({
    queryKey:['datass'],
    queryFn: async()=> {
    
        const res= await fetch('http://localhost:3000/api/gettingproducts')
      if (!res.ok){
     
        
      }
              const datas=await res.json()
      const products=datas.products
      return products
    
      
    }

    
  })
  

    return(

    <div className="flex flex-wrap">

     {data?.map((item)=>{
       return( <Productcard
       key={item.id}
       productname={item.productname}
       price={item.price}
       productid={item.id}
       />)
     }
     )
    }

 </div>
 
 )
        
        
        
    
}