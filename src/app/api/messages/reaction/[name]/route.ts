import { verifyToken } from "@/lib/jwt";
import prisma from "@/lib/prisma";
import { JwtPayload } from "jsonwebtoken";




export async function GET(request: Request, contax: any) {
    try {

        const payload = verifyToken({ authorization: request.headers.get('authorization'), secretKay: process.env.JWE_SECRET_KY })
        if (!payload || !contax.params.name)
            return new Response(JSON.stringify({ error: "unauthorized1" }), { status: 401 })

        const userid = (payload as JwtPayload).id;
        const reaction = contax.params.name
        const reactionIfExist = ['favorite', 'like', 'dislike', 'register_qs', 'register_rs'].includes(reaction)

        if (!reactionIfExist)
            return new Response(JSON.stringify({ error: "Bad Request" }), { status: 400 })

        let messages: Array<any> = []

        if (reaction == 'favorite')
            messages = await prisma.message.findMany({
                where: {
                    userId: userid,
                    favorite: true,
                }
            })
        else if (reaction == 'like') {
            messages = await prisma.message.findMany({
                where: {
                    userId: userid,
                    like: true,
                }
            })
        }
        else if (reaction == 'dislike')
            messages = await prisma.message.findMany({
                where: {
                    userId: userid,
                    dislike: true,
                }
            })
        else if (reaction == 'register_qs')
            messages = await prisma.message.findMany({
                where: {
                    userId: userid,
                    register: true,
                    role: 'user'
                }
            })
        else if (reaction == 'register_rs')
            messages = await prisma.message.findMany({
                where: {
                    userId: userid,
                    register: true,
                    role: 'assistant'
                }
            })
        return new Response(JSON.stringify({ messages: messages.reverse() }), { status: 201 })
    } catch (error) {
        return new Response(JSON.stringify(null), { status: 500 })

    }
}
