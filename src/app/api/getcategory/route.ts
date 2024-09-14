import prisma from "@/lib/database";



export async function GET() {
    
    try {
        
        const categories= await prisma.category.findMany(

        )
       

        return Response.json({categories})

    } catch (error) {
        return Response.json({error})
    }


}