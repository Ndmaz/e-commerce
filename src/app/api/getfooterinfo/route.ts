import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const general = await prisma.general.findFirst({
      where: { id: 1 },
      select: {
        contactinfo: true,
      }
    });

    if (!general) {
      return NextResponse.json(
        { message: "Footer information not found" },
        { status: 404 }
      );
    }

    // Parse the combined JSON string back to object
    const parsedData = JSON.parse(general.contactinfo || '{}');

    return NextResponse.json({
      contactInfo: parsedData.contactinfo || {},
      socialMedia: parsedData.socialmedia || {}
    });

  } catch (error) {
    console.error("Error fetching footer information:", error);
    return NextResponse.json(
      { message: "Error fetching footer information" },
      { status: 500 }
    );
  }
} 