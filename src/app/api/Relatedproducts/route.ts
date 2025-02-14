import prisma from "@/lib/database"



export async function POST(req: Request) {

    const { categoryid, issegment } = await req.json()
    const categoryidd = parseFloat(categoryid)
    try {

        const products = await prisma.product.findMany({
            where: {
                categoryid: categoryidd
            },
            include: {
                category: true,
                reviews: true
            }
        })
        console.log(products)
        if (issegment) {
            const productscut = products.toSpliced(6, products.length - 6)
            return Response.json({ productscut })
        }

        return Response.json({ products })
    } catch (error) {
        return Response.json({ error })
    }
}