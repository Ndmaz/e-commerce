import prisma from "@/lib/database"

export async function POST(req: Request) {
    const{Editinput2, id}=await req.json()
    const pricenum = parseFloat(Editinput2)
        const idd = parseFloat(id)
    try {
        
const priceoffaction=await prisma.product.update({
    where:{
        id:idd
    },
    data:{
        priceoff:pricenum
    }
})
return Response.json({priceoffaction},{status:200})
    } catch (error) {
        return Response.json({error},{status:500})
    }
}