'use client'

import Productcard from "@/components/Productcard"
import { useEffect, useState } from "react"

 

export default  function Products(){


const [productss,setproducts]=useState([])
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

},[])
useEffect(() => {
    console.log('Updated productss:', productss);
  }, [productss])


    return<div className="mb-[6rem]">

        products
        <div className="flex flex-wrap">
     { productss.map((item)=>{
       return( <Productcard
       key={item.id}
       productname={item.productname}
       price={item.price}
       productid={item.id}
       />)
     })
    }
        </div>
    
    </div>
}


//getting product data using a fetch and then giving to props of components to render it,
//it should be an array of objects to map through
//its and object called product that contains an array so it data.product.map that maps through the items and 
//it could be a component structutre that takes props or it could be an array
//first i used fetch,then i used it inside useeffect, i wanna use react query,