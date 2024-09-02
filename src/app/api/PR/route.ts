import prisma from "@/lib/database"


export async function DELETE(req:Request) {
    
    const {id}= await req.json()
    const idd=parseFloat(id)
    try {
         const removep= await prisma.product.delete({
            where:{id:idd}
            
         })
         return Response.json('200')
    } catch (error) {
        Response.error()
    }
}