import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const general = await prisma.general.findFirst({
            select: {
                mainpageimage: true
            }
        });

        if (!general?.mainpageimage) {
            return NextResponse.json(
                { message: "No main image found" },
                { status: 404 }
            );
        }

        // Format the response to match the MainImage interface
        return NextResponse.json({
            id: "main-image", // Since we're using a single record
            imageUrl: general.mainpageimage,
            createdAt: new Date().toISOString(), // Using current date since we don't have a timestamp
            updatedAt: new Date().toISOString()  // Using current date since we don't have a timestamp
        });
    } catch (error) {
        console.error("Error fetching main image:", error);
        return NextResponse.json(
            { message: "Error fetching main image" },
            { status: 500 }
        );
    }
}
