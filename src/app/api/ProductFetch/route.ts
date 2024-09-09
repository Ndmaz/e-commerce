import prisma from "@/lib/database"

export  async function POST(req:Request){

    const {id}=await req.json()
    const idd=parseFloat(id)
    try {
         const product =await prisma.product.findUnique({
            where:{
                id:idd
            },
            include:{
                category:true
            }
         })
         return Response.json({product})
    } catch (error) {
        Response.error
    }
}