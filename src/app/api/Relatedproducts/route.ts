import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";

// Input validation schema
const requestSchema = z.object({
    categoryid: z.string().or(z.number()),
    issegment: z.boolean()
});

export async function POST(req: Request) {
    try {
        // Validate request body
        const body = await req.json();
        const { categoryid, issegment } = requestSchema.parse(body);

        // Convert categoryid to number if it's a string
        const categoryIdNumber = typeof categoryid === 'string'
            ? parseFloat(categoryid)
            : categoryid;

        if (isNaN(categoryIdNumber)) {
            return NextResponse.json(
                { error: "Invalid category ID format" },
                { status: 400 }
            );
        }

        // Fetch products with related data
        const products = await prisma.product.findMany({
            where: {
                categoryid: categoryIdNumber,
            },
            select: {
                id: true,
                productname: true,
                price: true,
                priceoff: true,
                images: true,
                category: {
                    select: {
                        id: true,
                        name: true,
                    }
                }
            },
           
            take: issegment ? 6 : undefined
        });

        if (!products.length) {
            return NextResponse.json(
                { message: "No related products found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            products,
            total: products.length,
        }, { status: 200 });

    } catch (error) {
        console.error('Related products error:', error);

        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: "Invalid request data", details: error.errors },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { error: "Failed to fetch related products" },
            { status: 500 }
        );
    }
}