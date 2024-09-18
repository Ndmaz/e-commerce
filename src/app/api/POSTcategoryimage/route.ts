import prisma from "@/lib/database"



export async function POST(req: Request) {

    const { categoryvalue, categoryimageurl } = await req.json()
    const id = parseFloat(categoryvalue)
    try {

        const category = await prisma.category.update({
            where: {
                id: id
            },
            data: {
                categoryimage: categoryimageurl
            }
        })
        return Response.json({ category })

    } catch (error) {
        
        return Response.json({ error },{status:409})
    }
}