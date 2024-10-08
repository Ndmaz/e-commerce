import prisma from "@/lib/database";



export async function GET() {
    
    try {
        
        const brands= await prisma.brand.findMany(

        )
       

        return Response.json({brands})

    } catch (error) {
        return Response.json({error})
    }


}