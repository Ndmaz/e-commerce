import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { contactInfo, socialMedia } = body;

        // Validate required fields
        if (!contactInfo?.phone || !contactInfo?.email || !contactInfo?.address) {
            return NextResponse.json(
                { message: "اطلاعات تماس الزامی هستند" },
                { status: 400 }
            );
        }

        // Combine contact info and social media into a single object
        const combinedInfo = {
            contactinfo: contactInfo,
            socialmedia: socialMedia || {}
        };

        // Update or create the general record
        const general = await prisma.general.upsert({
            where: { id: 1 },
            update: {
                contactinfo: JSON.stringify(combinedInfo),
            },
            create: {
                id: 1,
                name: "Default",
                description: "Default description",
                mainpageimage: "",
                logoimage: "",
                productcartonloadimage: "",
                contactinfo: JSON.stringify(combinedInfo),
            },
        });

        // Parse the stored data
        const storedData = JSON.parse(general.contactinfo || '{}');

        return NextResponse.json({
            message: "اطلاعات با موفقیت به‌روزرسانی شد",
            data: {
                contactInfo: storedData.contactinfo || {},
                socialMedia: storedData.socialmedia || {}
            }
        });

    } catch (error) {
        console.error("Error updating footer information:", error);
        return NextResponse.json(
            { message: "خطا در به‌روزرسانی اطلاعات" },
            { status: 500 }
        );
    }
}
