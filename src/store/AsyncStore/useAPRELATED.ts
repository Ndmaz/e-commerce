import { useQueries, useQuery } from "react-query"


export const useAPRELATED=(categoryid,issegment)=>{
    async function queryfunction() {
        try {
            const res=await fetch('http://localhost:3000/api/Relatedproducts',{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({categoryid,issegment})

            })
            if( res.ok){
                const data=await res.json()
               if(issegment){

                 const products=data.productscut
                return products
               }
                const products=data.products
                return products
            }
        } catch (error) {
            return error
        }
    }
    return useQuery(['tods'],queryfunction)
}