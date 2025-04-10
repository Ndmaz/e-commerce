import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { logoUrl } = await req.json();

    if (!logoUrl) {
      return NextResponse.json(
        { message: "URL لوگو الزامی است" },
        { status: 400 }
      );
    }

    // Update the general record
    const general = await prisma.general.upsert({
      where: { id: 1 },
      update: {
        logoimage: logoUrl,
      },
      create: {
        id: 1,
        name: "Default",
        description: "Default description",
        mainpageimage: "",
        logoimage: logoUrl,
        productcartonloadimage: "",
        contactinfo: JSON.stringify({
          contactinfo: {},
          socialmedia: {}
        }),
      },
    });

    return NextResponse.json({
      message: "لوگو با موفقیت به‌روزرسانی شد",
      data: {
        logoUrl: general.logoimage
      }
    });

  } catch (error) {
    console.error("Error updating logo:", error);
    return NextResponse.json(
      { message: "خطا در به‌روزرسانی لوگو" },
      { status: 500 }
    );
  }
}