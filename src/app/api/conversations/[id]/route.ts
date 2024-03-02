import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/jwt";
import { JwtPayload } from "jsonwebtoken";

export async function GET(request: Request, contax: any) {
    // const id = ctx.params.id
    const payload = verifyToken({ authorization: request.headers.get('authorization'), secretKay: process.env.JWE_SECRET_KY })
    if (!payload || !contax.params.id)
        return new Response(JSON.stringify({ error: "unauthorized" }), { status: 401 })

    const conversationId = Number(contax.params.id)
    const conversation = await prisma.conversation.findUnique({ where: { id: conversationId } })
    if (!conversation)
        return new Response(JSON.stringify({ error: "Bad Request" }), { status: 400 })

    const messages = await prisma.message.findMany({
        where: {
            convId: conversationId
        }
    })
    const response = NextResponse.json({ messages })
    return response
}


export async function POST(request: Request, contax: any) {
    // const id = ctx.params.id
    const payload = verifyToken({ authorization: request.headers.get('authorization'), secretKay: process.env.JWE_SECRET_KY })
    if (!payload || !contax.params.id)
        return new Response(JSON.stringify({ error: "unauthorized" }), { status: 401 })

    const body = await request.json();
    const conversationId = Number(contax.params.id)

    const message = body.message
    const role = body.role
    const conversation = await prisma.conversation.findUnique({ where: { id: conversationId } })
    if (!conversation)
        return new Response(JSON.stringify({ error: "Bad Request" }), { status: 400 })

    await prisma.message.create({
        data: {
            convId: conversationId,
            message: message,
            role: role,
            like: false,
            dislike: false,
            favorite: false,
            register: false
        }
    })
    const response = NextResponse.json({ status: 'succes' })
    return response
}


export async function DELETE(request: Request, contax: any) {
    const payload = verifyToken({ authorization: request.headers.get('authorization'), secretKay: process.env.JWE_SECRET_KY })
    if (!payload)
        return new Response(JSON.stringify({ error: "unauthorized" }), { status: 403 })
    const conversationId = Number(contax.params.id)
    await prisma.message.deleteMany({
        where: {
            convId: conversationId,
        }
    })
    const conversation = await prisma.conversation.findUnique({
        where: {
            id: conversationId,
        }
    })
    if (!conversation)
        return new Response(JSON.stringify('no conversation found'), { status: 200 })
    await prisma.conversation.delete({
        where: {
            id: conversationId,
        }
    })
    return new Response(JSON.stringify('succes'), { status: 200 })
}