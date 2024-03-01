import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { Twilio } from "twilio";
export async function GET(request: NextApiRequest, response: NextApiResponse) {
    const users = await prisma.user.findMany()
    console.log('users-->',users)
    return new Response()

    return response.json({ hello: 'work' })
}
export async function POST(request: NextApiRequest) {
    console.log(process.env.AccountSID)
    console.log(process.env.AuthToken)
    console.log(process.env.MyTwilioPhoneNumber)
    const client = require('twilio')(process.env.AccountSID, process.env.AuthToken)
    const { phone, number } = { phone: 'huawei', number: '+212693768664' }
    // const { phone, number } = { phone: 'huawei', number: '+212708029985' }
    const resutl = await client.messages.create({
        body: 'hello ,are you fine',
        from: process.env.MyTwilioPhoneNumber,
        to: number
    })
    console.log('result:',resutl)
    // const { phone, number } = {phone:'',number:'0708029985'}
    console.log(phone, number)
    return new Response('Hello, Next.js!')
}
