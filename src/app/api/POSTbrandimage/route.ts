import prisma from "@/lib/prisma"



export async function POST(req: Request) {
    
    const {brandvalue,brandimageurl} = await req.json()
    const id = parseFloat(brandvalue)
    try {

        const brand = await prisma.brand.update({
            where: {
                id: id
            },
            data: {
                brandimage: brandimageurl
            }
        })
        return Response.json({             brand })

    } catch (error) {
        
        return Response.json({ error },{status:409})
    }
}