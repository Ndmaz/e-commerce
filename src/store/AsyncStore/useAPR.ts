import { useQuery } from "react-query"

//the fetch and the data to fetch

export const useAPR=(searchvalueprop:string)=>{
    async function queryfunction(){

        try {
            const res=await fetch('http://localhost:3000/api/PEsearchresult',{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                     body:JSON.stringify({searchvalueprop})
                     
                   })
                   if (res.ok){
                    const datacapsole= await res.json()
                  
               console.log(datacapsole.product)
                      return datacapsole.product }
        } catch (error) {
            return error
        }

    }
return useQuery(
    ['d'],
  queryfunction
)

}