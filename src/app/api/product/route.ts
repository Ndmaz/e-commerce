import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { json } from "node:stream/consumers";
import { stringify } from "querystring";
import prisma from "@/lib/database";


export  async function POST(req:Request,res:Response){



try {
    

    
   const {productname
    ,category
    ,price
    ,img
    ,synopsis} = await req.json()
  
       const product = await prisma.product.create({
        data:{
          productname
         
          ,price:parseFloat(price)
          ,img
          ,synopsis
        }
     })

console.log(product)
  return Response.json(product)
    }

   catch (error) {
     console.error(error)
     return NextResponse.json(JSON.stringify(error))
   } 
}
