import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { json } from "node:stream/consumers";
import { stringify } from "querystring";
import prisma from "@/lib/database";


export async function POST(req: Request, res: Response) {



  try {

    const { productname
      , productcode
      , category
      , price
      , quanity
      , synopsis
      , description
      , details
      , permanentLink } = await req.json()

    const detalsinstring: string = JSON.stringify(details)
    const theimageurls: string = JSON.stringify(permanentLink)
    //checking if there is a category
    const CheckCategory = await prisma.category.findUnique({
      where: {
        name: category
      }
    })
    if (CheckCategory) {
      const product = await prisma.product.create({
        data: {
          productname
          , productcode
          , price: parseFloat(price)
          , quanity: parseInt(quanity)
          , synopsis
          , description
          , details: detalsinstring
          , images: theimageurls

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
          , images: theimageurls

          , category: {
            create: {
              name: category
            }
          }
        }
      })

      return Response.json({ product })
    }




  }

  catch (error) {
    console.error(error)
    return new Response(`error fetching: ${error}`, { status: 500 })
  }
}
