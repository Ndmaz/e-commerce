
import prisma from "@/lib/database";



export async function POST(req: Request, res: Response) {
  try {

    const { productname
      , productcode
      , category
      , brand
      , price
      , quanity
      , synopsis
      , description
      , details
      , permanentLink } = await req.json()

    const detalsinstring: string = JSON.stringify(details)
    const theimageurls: string = JSON.stringify(permanentLink)
    //checking if there is an existing category
    const CheckCategory = await prisma.category.findUnique({
      where: {
        name: category
      }
    })
    // checking if there is an existing brand
    const CheckBrand = await prisma.brand.findUnique({
      where: {
        name: brand
      }
    })


    if (CheckCategory) {
      if (CheckBrand) {
        const product = await prisma.product.create({
          data: {
            productname
            , productcode
            , price: parseFloat(price)
            , quanity: parseInt(quanity)
            , synopsis
            , description
            , details: detalsinstring
            , images: theimageurls,
            brand: {
              connect: { id: CheckBrand.id }
            }
            , category: {
              connect: { id: CheckCategory.id }
            }
          }
        })
        return Response.json({ product })
      } else {

        const product = await prisma.product.create({
          data: {
            productname
            , productcode
            , price: parseFloat(price)
            , quanity: parseInt(quanity)
            , synopsis
            , description
            , details: detalsinstring
            , images: theimageurls,
            brand: {
              create: {
                name: brand,
                brandimage: ''
              }
            }
            , category: {
              connect: { id: CheckCategory.id }
            }
          }
        })
        return Response.json({ product })
      }

    } else {
      if (CheckBrand) {
        const product = await prisma.product.create({
          data: {
            productname
            , productcode
            , price: parseFloat(price)
            , quanity: parseInt(quanity)
            , synopsis
            , description
            , details: detalsinstring
            , images: theimageurls,
            brand: {
              connect: { id: CheckBrand.id }
            }
            , category: {
              create: {
                name: category
                , categoryimage: ''

              }
            }
          }
        })

        return Response.json({ product })
      } else {
        const product = await prisma.product.create({
          data: {
            productname
            , productcode
            , price: parseFloat(price)
            , quanity: parseInt(quanity)
            , synopsis
            , description
            , details: detalsinstring
            , images: theimageurls,
            brand: {
              create: {
                name: brand,
                brandimage: ''
              }
            }
            , category: {
              create: {
                name: category
                , categoryimage: ''

              }
            }
          }
        })

        return Response.json({ product })
      }
    }

  } catch (error) {
    console.error(error)
    return new Response(`error fetching: ${error}`, { status: 500 })
  }

}