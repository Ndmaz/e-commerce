'use client'

import Productcard from "@/components/Productcard"
import { useEffect, useState } from "react"
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
    /*const [productss,setproducts]=useState([])
    useEffect( () => {
        
        async function productfetch () {
            try {
                //getting products
                  const res = await fetch('http://localhost:3000/api/gettingproducts')
            if(res.ok){
               
                 const data= await res.json()
                 const producti=data.products
                 console.log(producti)
                   console.log(productss)
               setproducts(producti)
            
            }
          
            } catch (error) {
                     alert(error)
        return{error:error}
        
            }
        
          
         
           
        }
        productfetch()
    
    },[])*/


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