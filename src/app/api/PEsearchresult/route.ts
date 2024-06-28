import prisma from "@/lib/database"
import { NextResponse } from "next/server"

export async function POST(req:Request){

try {

   const {searchvalueprop}=await req.json()
   console.log(searchvalueprop)
   const product=await prisma.product.findFirst({
    where:{
        productname:searchvalueprop.searchvalueprop
    },
    include:{
        category:true
    }
})
console.log(product)
return NextResponse.json({product}) 
} catch (error) {
    return new Response('error',{status:500})
}


}