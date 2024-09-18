import { useMutation } from "react-query"


export const useAPostcategoryimage=(categoryvalue,categoryimageurl)=>{
async function mutatefunction() {
    try {
        
        const res= await fetch('http://localhost:3000/api/POSTcategoryimage',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({categoryvalue,categoryimageurl})
        }
        )
        if(res.ok){
            const data=  await res.json()
            const categorydata=data.category
            return categorydata
        }
    } catch (error) {
       
        return error
        
    }
}

    return useMutation(mutatefunction)

}