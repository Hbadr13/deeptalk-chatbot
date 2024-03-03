import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/jwt";
import { JwtPayload } from "jsonwebtoken";

export async function GET(request: Request, contax: any) {
    try {
        const payload = verifyToken({ authorization: request.headers.get('authorization'), secretKay: process.env.JWE_SECRET_KY })
        const conversationId = Number(contax.params.id)

        if (!payload || !conversationId)
            return new Response(JSON.stringify({ error: "unauthorized" }), { status: 401 })

        const userid = (payload as JwtPayload).id;

        const conversation = await prisma.conversation.findUnique({ where: { id: conversationId, userId: userid } })
        if (!conversation)
            return new Response(JSON.stringify({ error: "Bad Request" }), { status: 400 })

        const messages = await prisma.message.findMany({
            where: {
                convId: conversationId,
            }
        })
        // const response = NextResponse.json({ messages })
        return new Response(JSON.stringify({ messages }), { status: 201 })
    } catch (error) {
        return new Response(JSON.stringify(null), { status: 500 })

    }
}


export async function POST(request: Request, contax: any) {
    try {

        const payload = verifyToken({ authorization: request.headers.get('authorization'), secretKay: process.env.JWE_SECRET_KY })
        if (!payload || !contax.params.id)
            return new Response(JSON.stringify({ error: "unauthorized" }), { status: 401 })
        const userid = (payload as JwtPayload).id;

        const body = await request.json();

        const role = body.role
        const message = body.message
        const conversationId = Number(contax.params.id)
        const conversation = await prisma.conversation.findUnique({ where: { id: conversationId } })


        if (!conversation || !conversationId || !role || !message)
            return new Response(JSON.stringify({ error: "Bad Request" }), { status: 400 })

        await prisma.message.create({
            data: {
                userId: userid,
                convId: conversationId,
                message: message,
                role: role,
                like: false,
                dislike: false,
                favorite: false,
                register: false
            }
        })
        return new Response(JSON.stringify(null), { status: 201 })
    } catch (error) {
        return new Response(JSON.stringify(null), { status: 500 })
    }
}


export async function DELETE(request: Request, contax: any) {
    try {

        const payload = verifyToken({ authorization: request.headers.get('authorization'), secretKay: process.env.JWE_SECRET_KY })
        if (!payload)
            return new Response(JSON.stringify({ error: "unauthorized" }), { status: 403 })
        const conversationId = Number(contax.params.id)

        const conversation = await prisma.conversation.findUnique({
            where: {
                id: conversationId,
            }
        })
        if (!conversation)
            return new Response(JSON.stringify('no conversation found'), { status: 401 })

        await prisma.message.deleteMany({
            where: {
                convId: conversationId,
            }
        })
        await prisma.conversation.delete({
            where: {
                id: conversationId,
            }
        })
        return new Response(JSON.stringify('succes'), { status: 201 })
    } catch (error) {
        return new Response(JSON.stringify(null), { status: 500 })
    }
}