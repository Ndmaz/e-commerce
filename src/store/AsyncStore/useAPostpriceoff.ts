import { useMutation } from "react-query"


export const useAPostpriceoff=(Editinput2,id)=>{
async function mutatefunction() {
    try {
        
        const res= await fetch('http://localhost:3000/api/POSTpriceoff',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({Editinput2,id})
        }
        )
        if(res.ok){
           return await res.json()
    } }catch (error) {
       
        return error
        
    }
}

    return useMutation(mutatefunction)

}