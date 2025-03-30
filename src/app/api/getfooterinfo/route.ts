import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const general = await prisma.general.findFirst({
      where: { id: 1 },
      select: {
        description: true,
        logoimage: true,
        contactinfo: true,
        socialmedia: true,
        footerlinks: true
      }
    });

    if (!general) {
      return NextResponse.json(
        { message: "Footer information not found" },
        { status: 404 }
      );
    }

    // Parse the JSON strings back to objects
    const contactInfo = JSON.parse(general.contactinfo || '{}');
    const socialMedia = JSON.parse(general.socialmedia || '{}');
    const footerLinks = JSON.parse(general.footerlinks || '{}');

    return NextResponse.json({
      description: general.description,
      logoImage: general.logoimage,
      contactInfo,
      socialMedia,
      footerLinks
    });

  } catch (error) {
    console.error("Error fetching footer information:", error);
    return NextResponse.json(
      { message: "Error fetching footer information" },
      { status: 500 }
    );
  }
} 