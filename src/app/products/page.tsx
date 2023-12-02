import Productcard from "@/components/Productcard"
import { Item } from "@radix-ui/react-select"
import { useEffect } from "react"

 

export default async function Products(){

const data= await productfetch()
const products =await data.products

  
    return<div >
        products
        <div className="flex">
     { products.map((item)=>{
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

async function productfetch () {
    try {
        //getting products
          const res = await fetch('http://localhost:3000/api/gettingproducts',{
        method:'GET'
    })
    if(res.ok){
       
         const products= await res.json()
         console.log(products)
         return products
    }
    return res.headers
    } catch (error) {
              console.log(error)
return{error:error}

    }

  
 
   
}
//getting product data using a fetch and then giving to props of components to render it,
//it should be an array of objects to map through
//its and object called product that contains an array so it data.product.map that maps through the items and 
//it couls be a component structutre that takes props or it could be an array