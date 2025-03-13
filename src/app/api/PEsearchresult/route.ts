import { NextResponse } from "next/server";
import { Product } from "@/types/product";
import prisma from "@/lib/prisma";


interface SearchRequest {
    searchValue: string;
}

export async function POST(request: Request) {
    try {
        const body: SearchRequest = await request.json();
        const { searchValue } = body;

        if (!searchValue?.trim()) {
            return NextResponse.json(
                { message: "لطفا نام محصول را وارد کنید" },
                { status: 400 }
            );
        }

        const products = await prisma.product.findMany({
            where: {
                productname: {
                    contains: searchValue,
                    mode: "insensitive",
                },
            },
            take: 10, // Limit to 10 results
            include: {
                category: true,
                brand: true,
            },
        });

        if (!products || products.length === 0) {
            return NextResponse.json(
                { message: "محصولی با این نام یافت نشد" },
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
        console.error("Product search error:", error);
        return NextResponse.json(
            { message: "خطا در جستجوی محصول" },
            { status: 500 }
        );
    }
}