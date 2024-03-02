import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/jwt";
import { JwtPayload } from "jsonwebtoken";

// creat new conversation
export async function POST(request: Request) {
    const body = await request.json();
    const payload = verifyToken({ authorization: request.headers.get('authorization'), secretKay: process.env.JWE_SECRET_KY })
    if (!payload)
        return new Response(JSON.stringify({ error: "unauthorized" }), { status: 403 })
    const userid = (payload as JwtPayload).id;

    await prisma.conversation.create({
        data: {
            userId: userid,
            name: body.name
        }
    })
    const response = NextResponse.json({ hello: 'word' })
    return response
}


export async function GET(request: Request) {
    const payload = verifyToken({ authorization: request.headers.get('authorization'), secretKay: process.env.JWE_SECRET_KY })
    if (!payload)
        return new Response(JSON.stringify({ error: "unauthorized" }), { status: 403 })
    const userid = (payload as JwtPayload).id;

    console.log(payload)
    const conversation = await prisma.conversation.findMany({
        where: {
            userId: userid,

        }
    })
    // conversation = conversation.reverse()
    return new Response(JSON.stringify(conversation.reverse()), { status: 200 })
}


