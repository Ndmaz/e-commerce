import { NextResponse } from "next/server";
import { Product } from "@/types/product";
import prisma from "@/lib/prisma";




export async function POST(req: Request) {
    try {
        const { searchValue } = await req.json();

        if (!searchValue) {
            return NextResponse.json(
                { message: "Search term is required" },
                { status: 400 }
            );
        }

        const products = await prisma.product.findMany({
            where: {
                OR: [
                    {
                        productname: {
                            contains: searchValue,
                            mode: 'insensitive'
                        }
                    },
                    {
                        productcode: {
                            contains: searchValue,
                            mode: 'insensitive'
                        }
                    },
                    {
                        synopsis: {
                            contains: searchValue,
                            mode: 'insensitive'
                        }
                    }
                ]
            },
            include: {
                category: {
                    select: {
                        name: true
                    }
                },
                brand: {
                    select: {
                        name: true
                    }
                }
            },
            take: 10
        });

        if (!products.length) {
            return NextResponse.json(
                { message: "No products found matching your search" },
                { status: 404 }
            );
        }

        // Parse JSON strings back to objects for each product
        const parsedProducts: Product[] = products.map(product => ({
            ...product,
            id: product.id.toString(),
            productcode: product.productcode || "",
            category: product.category.name,
            brand: product.brand.name,
            price: product.price || 0,
            priceoff: product.priceoff || 0,
            quanity: product.quanity || 0,
            synopsis: product.synopsis || "",
            description: product.description || "",
            details: product.details ? JSON.parse(product.details) : [],
            images: product.images ? JSON.parse(product.images) : {
                pic1: "",
                pic2: "",
                pic3: "",
                pic4: "",
            },
        }));

        return NextResponse.json({ products: parsedProducts });
    } catch (error) {
        console.error("Error searching products:", error);
        return NextResponse.json(
            { message: "Error searching products" },
            { status: 500 }
        );
    }
}