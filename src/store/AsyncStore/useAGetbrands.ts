import {  useQuery } from "react-query"

export const useAGetbrands=()=>{

    async function queryfunction() {

        try {
            const res=await fetch('http://localhost:3000/api/getbrand')
            if(res.ok){
                const brands=await res.json()
               const data= brands.brands
                return data
            }
        } catch (error) {
            return error
        }
     
        
    }
    return useQuery('brandkey',queryfunction)
}