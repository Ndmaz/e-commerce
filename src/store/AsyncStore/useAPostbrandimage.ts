import { useMutation } from "react-query"


export const useAPostbrandimage=(brandvalue,brandimageurl)=>{
async function mutatefunction() {
    try {
        
        const res= await fetch('http://localhost:3000/api/POSTbrandimage',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({brandvalue,brandimageurl})
        }
        )
        if(res.ok){
            const data=  await res.json()
            const branddata=data.brand
            return branddata
        }
    } catch (error) {
       
        return error
        
    }
}

    return useMutation(mutatefunction)

}