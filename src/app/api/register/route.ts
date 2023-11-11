import { PrismaClient } from "@prisma/client"
import { hash } from "bcrypt"
import { NextResponse } from "next/server"


export async function POST(req:Request) {
    
const {name,email,password}=await req.json()
const hashed= await hash(password,12)
const prisma= new PrismaClient
const role="USER"
const user= prisma.user.create({
     data:{
         name
        ,email
       ,role
        ,password:hashed
    }
})
 return NextResponse.json({
    user:{
        email:(await user).email
    }
 })
}