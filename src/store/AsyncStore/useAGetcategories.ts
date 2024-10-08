import {  useQuery } from "react-query"

export const useAGetcategories=()=>{

    async function queryfunction() {

        try {
            const res=await fetch('http://localhost:3000/api/getcategory')
            if(res.ok){
                const categories=await res.json()
               const data= categories.categories
                return data
            }
        } catch (error) {
            return error
        }
     
        
    }
    return useQuery('key',queryfunction)
}