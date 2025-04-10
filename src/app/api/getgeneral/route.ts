import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const general = await prisma.general.findFirst({
      where: { id: 1 },
      select: {
        id: true,
        name: true,
        description: true,
        mainpageimage: true,
        logoimage: true,
        productcartonloadimage: true,
        contactinfo: true,
      }
    });

    if (!general) {
      return NextResponse.json(
        { message: "اطلاعات عمومی یافت نشد" },
        { status: 404 }
      );
    }

    // Parse the contactinfo JSON string
    const contactInfo = JSON.parse(general.contactinfo || '{}');

    return NextResponse.json({
      ...general,
      contactInfo: contactInfo.contactinfo || {},
      socialMedia: contactInfo.socialmedia || {}
    });

  } catch (error) {
    console.error("Error fetching general data:", error);
    return NextResponse.json(
      { message: "خطا در دریافت اطلاعات عمومی" },
      { status: 500 }
    );
  }
}