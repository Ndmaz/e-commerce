import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const { imageUrl } = await req.json();
        console.log(imageUrl)
        if (!imageUrl) {
            return NextResponse.json(
                { message: "Image URL is required" },
                { status: 400 }
            );
        }
        if (typeof imageUrl == 'string') {
            console.log('its string')
        } else {
            console.log('its',typeof imageUrl)
        }
        // Try to update any existing record, or create a new one
        const general = await prisma.general.upsert({
            where:{
                id:1
            },
            update:{
                mainpageimage:imageUrl
            },
            create: {
                id:1,
                mainpageimage: imageUrl,
                name:"",
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