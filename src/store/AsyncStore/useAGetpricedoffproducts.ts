import { useQuery } from "react-query"

export const useAGetpricedoffproducts=()=>{

    async function queruyfunction() {

        try {
            const res=await fetch('http://localhost:3000/api/Getpricedoffproducts')
            if(res.ok){
                const pricedoffproducts=await res.json()
               const pricedoff=pricedoffproducts.pricedoff
                return pricedoff
            }
        } catch (error) {
            return error
        }
     
        
    }
    return useQuery('pricedoff',queruyfunction)
}