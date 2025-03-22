import prisma from "@/lib/prisma"



export async function POST(req: Request) {




    try {

        const { Editinput, fieldname, id } = await req.json()
        const idd = parseFloat(id)

        switch (fieldname) {
            case 'اسم محصول':
                try {

                    const pn = await prisma.product.update({
                        where: { id: idd }
                        , data: { productname: Editinput }
                    })

                    return Response.json({ pn })
                } catch (error) {

                    return Response.json({ error })
                }

                break;
            case 'کد محصول':
                try {

                    const pn = await prisma.product.update({
                        where: { id: idd }
                        , data: { productcode: Editinput }
                    })

                    return Response.json({ pn })
                } catch (error) {

                    return Response.json({ error })
                }
                break;
            case 'قیمت':

                try {
                    const pricenum = parseFloat(Editinput)
                    const pn = await prisma.product.update({
                        where: { id: idd }
                        , data: { price: pricenum }
                    })

                    return Response.json({ pn })
                } catch (error) {

                    return Response.json({ error })
                }
                break;
            case 'تعداد':
                try {
                    const quanitynum = parseFloat(Editinput)
                    const pn = await prisma.product.update({
                        where: { id: idd }
                        , data: { quanity: quanitynum }
                    })

                    return Response.json({ pn })
                } catch (error) {

                    return Response.json({ error })
                }
                break;
            case 'توضیح کامل':
                try {

                    const pn = await prisma.product.update({
                        where: { id: idd }
                        , data: { description: Editinput }
                    })

                    return Response.json({ pn })
                } catch (error) {

                    return Response.json({ error })
                }
                break;
            case 'توضیح کوتاه':
                try {

                    const pn = await prisma.product.update({
                        where: { id: idd }
                        , data: {
                            synopsis: Editinput

                        }
                    })

                    return Response.json({ pn })
                } catch (error) {

                    return Response.json({ error })
                }
                break;
                case 'مشخصات':
                    try {
                        const thedetails: string = JSON.stringify(Editinput)
                        const pn = await prisma.product.update({
                            where: { id: idd }
                            , data: { details:thedetails }
                        })
    
                        return Response.json({ pn })
                    } catch (error) {
    
                        return Response.json({ error })
                    }
                    break;
            case 'عکس':
                try {
                    const theimageurls: string = JSON.stringify(Editinput)
                    const pn = await prisma.product.update({
                        where: { id: idd }
                        , data: { images: theimageurls }
                    })

                    return Response.json({ pn })
                } catch (error) {

                    return Response.json({ error })
                }
                break;
        }

    } catch (error) {
                return Response.json(            { status: 500 })
    }
}