import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { json } from "node:stream/consumers";
import { stringify } from "querystring";
import prisma from "@/lib/database";


export  async function POST(req:Request,res:Response){



try {
    

    
   const {productname
    
    ,price
    ,img
    ,synopsis,
    category} = await req.json()
  
       const product = await prisma.product.create({
        data:{
          productname
          ,price:parseFloat(price)
          ,img
          ,synopsis,
          category:{
            create:{
              name:category
            }
          }
        }
     })


  return Response.json(JSON.stringify({product}))
    }

   catch (error) {
     console.error(error)
     return Response.json(error)
   } 
}
