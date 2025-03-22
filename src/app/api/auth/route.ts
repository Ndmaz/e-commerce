import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { compare } from "bcrypt";

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json(
                { message: "Email and password are required" },
                { status: 400 }
            );
        }

        // Find user by email
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return NextResponse.json(
                { message: "Invalid email or password" },
                { status: 401 }
            );
        }

        // Compare passwords
        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            return NextResponse.json(
                { message: "Invalid email or password" },
                { status: 401 }
            );
        }

        // Return user data (excluding password)
        const { password: _, ...userData } = user;

        return NextResponse.json({
            success: true,
            message: "Authentication successful",
            user: userData
        });

    } catch (error) {
        console.error("Authentication error:", error);
        return NextResponse.json(
            { message: "Authentication failed" },
            { status: 500 }
        );
    }
} 