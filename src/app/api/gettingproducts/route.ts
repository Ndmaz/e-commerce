import prisma from "@/lib/database";
import { NextResponse } from "next/server";

export async function GET(){

    try {


         const products= await prisma.product.findMany()
         console.log(products)
         return NextResponse.json({products})  
    } catch (error) {
        console.log(error)
        return new Response('error fetching',{status:500})
    }
 
}