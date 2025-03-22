import prisma from "@/lib/prisma";



export async function GET() {

    try {

        const pricedoff = await prisma.product.findMany(
            {
                take: 6,
                where: {
                    NOT: {
                        priceoff: null
                    }
                }
            })


        return Response.json({ pricedoff })

    } catch (error) {
        return Response.json({ error })
    }


}