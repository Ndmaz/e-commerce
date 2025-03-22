import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

// Type definitions for request parameters
interface PriceRange {
    price1: number;  // Minimum price
    price2: number;  // Maximum price
}

interface RequestBody {
    page: number;     // Current page number for pagination
    price: PriceRange;// Price range filter
    category: string; // Category ID filter
    brand: string;    // Brand ID filter
    searchprop?: string; // Optional search term
}

// API endpoint for fetching products with filters and pagination
// Each page contains 12 products
export async function POST(req: Request) {
    try {
        // Parse request body with default values for initial request
        const body = await req.json();
        const {
            page,
            price,
            category,
            brand,
            searchprop
        } = body;
        console.log('this is searchprop',searchprop)
        // Validate page number
        if (page < 1) {
            return NextResponse.json(
                { error: "Invalid page number" },
                { status: 400 }
            );
        }

        // Calculate pagination offset
        const startRange = (page - 1) * 12;

        // Initialize where clause for Prisma query
        const where: Prisma.ProductWhereInput = {};

        // Check which filters are active
        const pricefilterboolean = price && (price.price1 !== 0 || price.price2 !== 1000);
        const categoryfilterboolean = category !== '';
        const brandfilterboolean = brand !== '';
        const searchpropfilterboolean = searchprop!== '';

        // Construct where clause based on active filters
        const wherecunstructor = () => {
            // Add price range filter if active
            // Add search filter if active (case-insensitive)
            if (searchpropfilterboolean) {
                where.productname = {
                    contains: searchprop,
                    mode: 'insensitive'
                };
            }
            if (pricefilterboolean) {
                where.price = {
                    gte: price.price1 * 1000, // Convert to actual price (×1000)
                    lte: price.price2 * 1000
                }
            }
            // Add category filter if active
            if (categoryfilterboolean) {
                where.categoryid = parseFloat(category);
            }
            // Add brand filter if active
            if (brandfilterboolean) {
                where.brandid = parseFloat(brand);
            }

            return where
        }

        const wherecunstructorresult = wherecunstructor()
        console.log(wherecunstructorresult)
        // Execute Prisma query with constructed filters
        const products = await prisma.product.findMany({
            skip: startRange,    // Pagination offset
            take: 12,           // Items per page
            where: wherecunstructorresult, // Applied filters
            include: {          // Include related data
                category: true,
                brand: true
            },
        });

        // Return filtered products
        return NextResponse.json({ products });

    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            { error: "Failed to fetch products" },
            { status: 500 }
        );
    }
}