import { verifyToken } from "@/lib/jwt";
import prisma from "@/lib/prisma";
import { JwtPayload } from "jsonwebtoken";

export async function PUT(request: Request, contax: any) {
    
    try {

        const payload = verifyToken({ authorization: request.headers.get('authorization'), secretKay: process.env.JWE_SECRET_KY })
        if (!payload || !contax.params.id)
            return new Response(JSON.stringify({ error: "unauthorized" }), { status: 401 })
        const userid = (payload as JwtPayload).id;

        const body = await request.json();
        const messageid = Number(contax.params.id)
        const reaction = body.reaction
        const reactionIfExist = ['favorite', 'like', 'dislike', 'register_rs', 'register_qs'].includes(reaction)

        const msg = await prisma.message.findUnique({ where: { id: messageid, userId: userid } })

        if (!reactionIfExist || !msg)
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
        else if (reaction == 'register_qs')
            await prisma.message.update({
                where: { id: messageid },
                data: {
                    register: true,
                    role: 'user'
                }
            })
        else if (reaction == 'register_rs')
            await prisma.message.update({
                where: { id: messageid },
                data: {
                    register: true,
                    role: 'assistant'
                }
            })

        return new Response(JSON.stringify(null), { status: 201 })

    } catch (error) {
        return new Response(JSON.stringify(null), { status: 500 })

    }
}
