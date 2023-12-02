import { PrismaClient } from "@prisma/client"
import { hash } from "bcrypt"
import { NextResponse } from "next/server"
import prisma from "@/lib/database"

export async function POST(req:Request) {
    
const {name,email,password}=await req.json()
const hashed= await hash(password,12)


const user= prisma.user.create({
     data:{
         name
        ,email
       
        ,password:hashed
    }
})
 return NextResponse.json({
    user:{
        email:(await user).email
    }
 })
}