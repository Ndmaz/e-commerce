import prisma from "@/lib/database";
import { NextResponse } from "next/server";





//each page takes 12, inital take runs first then filters get applied
export async function POST(req: Request) {


    const { page, price, category } = await req.json()

    //no filter initial call
    const empty = {}
    const initialpricefilter = (price == empty)
    const initialcategoryfilter = (category == '')
    //transforming the variable into database query ready variables
    const pricerange = {
        price1: parseFloat(price.price1)*1000,
        price2: parseFloat(price.price2)*1000

    }
    const categoryid = parseFloat(category)

    //laterfilter
    const exampleemptyprice = {
        price1: 0, price2: 100000000000000
    }

    const secondarypricefilter = (price.price1 == exampleemptyprice.price1) && (price.price2 == exampleemptyprice.price2)

    const secondarycategoryfilter = (category == '')
    //page pagintaion
    const startrange = page * 12 - 12

    try {
        //initial query with no filters and just changes around pages
        if (initialpricefilter && initialcategoryfilter) {
            const products = await prisma.product.findMany({
                skip: startrange,
                take: 12,
                include: {
                    category: true,
                }
            })

            return NextResponse.json({ products })
        }
        //price only filter when price is sent but the category isnt sent
        if (secondarycategoryfilter) {
            const products = await prisma.product.findMany({
                skip: startrange,
                take: 12,
                where: {
                    AND: [
                        {
                            price: {
                                gt: pricerange.price1

                            }
                        },
                        {
                            price: {
                                lt: pricerange.price2
                            }
                        }
                    ]
                },
                include: {
                    category: true


                }
            })
            return NextResponse.json({ products })
        }
        //only category, when price is not set and sent
        if (secondarypricefilter) {

            const products = await prisma.product.findMany({
                skip: startrange,
                take: 12,
                where: {
                    categoryid: categoryid
                },
                include: {
                    category: true
                }
            })

            return NextResponse.json({ products })
        }
        // default if both category and price is set 
        const products = await prisma.product.findMany({
            skip: startrange,
            take: 12,
            where: {
                AND: [
                    {
                        categoryid: categoryid

                    }
                    ,
                    {
                        AND: [
                            {
                                price: {
                                    gt: pricerange.price1

                                }
                            },
                            {
                                price: {
                                    lt: pricerange.price2
                                }
                            }
                        ]
                    }
                ]


            },
            include: {
                category: true
            }
        })

        return NextResponse.json({ products })


    } catch (error) {

        console.log(error)
        return new Response('error fetching', { status: 500 })
    }

}