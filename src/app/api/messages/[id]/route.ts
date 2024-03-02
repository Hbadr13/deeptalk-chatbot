import { verifyToken } from "@/lib/jwt";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";




// 400 Bad Request

export async function PUT(request: Request, contax: any) {
    // const id = ctx.params.id
    const payload = verifyToken({ authorization: request.headers.get('authorization'), secretKay: process.env.JWE_SECRET_KY })
    if (!payload || !contax.params.id)
        return new Response(JSON.stringify({ error: "unauthorized" }), { status: 401 })

    const body = await request.json();
    const conversationId = Number(contax.params.id)
    const messageid = body.messageid
    const reaction = body.reaction
    const reactionIfExist = ['favorite', 'like', 'dislike', 'register'].includes(reaction)

    const conversation = await prisma.conversation.findUnique({ where: { id: conversationId } })
    const msg = await prisma.message.findUnique({ where: { id: messageid } })
    if (!conversation || !reactionIfExist || !msg)
        return new Response(JSON.stringify({ error: "Bad Request" }), { status: 400 })

    if (reaction == 'favorite')
        await prisma.message.update({
            where: { id: messageid },
            data: {
                favorite: true,
            }
        })
    else if (reaction == 'like')
        await prisma.message.update({
            where: { id: messageid },
            data: {
                like: true,
            }
        })
    else if (reaction == 'dislike')
        await prisma.message.update({
            where: { id: messageid },
            data: {
                dislike: true,
            }
        })
    else if (reaction == 'register')
        await prisma.message.update({
            where: { id: messageid },
            data: {
                register: true,
            }
        })


    const response = NextResponse.json({ status: 'succes' })
    return response
}
