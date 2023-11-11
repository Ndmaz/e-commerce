import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";


 const prisma=new PrismaClient
 async function handler(req:Request, res:Response){
try {
    

    if(req.method==='POST'){
   const {data} = await req.json()
      
       const product = prisma.product.create({
        data:{
         ...data,
       categoryname: data.category,
       price: parseFloat(data.price),
       description:data.discripstion, 
        }
     })

   NextResponse.json(product)
    }

   } catch (error) {
     console.error(error)
   } 
}
export {handler as GET,handler as POST}