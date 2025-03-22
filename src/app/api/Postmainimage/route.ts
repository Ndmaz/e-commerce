import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const { imageUrl } = await req.json();

        if (!imageUrl) {
            return NextResponse.json(
                { message: "Image URL is required" },
                { status: 400 }
            );
        }

        // Try to update any existing record, or create a new one
        const general = await prisma.general.create({
            data: {
                mainpageimage: imageUrl,
                description: "",
                logoimage: "",
                contactinfo: "",
                productcartonloadimage: ""
            }
        });

        return NextResponse.json({
            success: true,
            message: "Main page image updated successfully",
            data: {
                id: "main-image",
                imageUrl: general.mainpageimage,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            }
        });

    } catch (error) {
        console.error("Error updating main image:", error);
        return NextResponse.json(
            { message: "Error updating main image" },
            { status: 500 }
        );
    }
}