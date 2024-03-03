import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/jwt";
import { JwtPayload } from "jsonwebtoken";


export async function POST(request: Request) {
    try {

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
        return new Response(JSON.stringify(null), { status: 201 })
    } catch (error) {
        return new Response(JSON.stringify(null), { status: 500 })
    }

}


export async function GET(request: Request) {
    try {

        const payload = verifyToken({ authorization: request.headers.get('authorization'), secretKay: process.env.JWE_SECRET_KY })
        if (!payload)
            return new Response(JSON.stringify({ error: "unauthorized" }), { status: 403 })

        const userid = (payload as JwtPayload).id;

        const conversation = await prisma.conversation.findMany({
            where: {
                userId: userid,

            }
        })
        return new Response(JSON.stringify(conversation.reverse()), { status: 201 })
    } catch (error) {
        return new Response(JSON.stringify(null), { status: 201 })

    }
}


