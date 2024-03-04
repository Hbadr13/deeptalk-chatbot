import { OpenAIClient, AzureKeyCredential } from '@azure/openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { PrismaClient } from '@prisma/client'

// Create an OpenAI API client (that's edge friendly!)
const client = new OpenAIClient(
    'https://deepleaflang.openai.azure.com/',
    new AzureKeyCredential('a56d96992f9948f189b578d5fae3ffac'),
);

// IMPORTANT! Set the runtime to edge
export const runtime = 'edge';
import prisma from '@/lib/prisma';
export async function POST(req: Request) {
    const { messages, conversationId, userid, accessToken } = await req.json();

    // Ask Azure OpenAI for a streaming chat completion given the prompt
    const response = await client.streamChatCompletions(
        'gpt432',
        messages,
    );
    const stream = OpenAIStream(response, {
        onCompletion: async (completion: string) => {
            await fetch(`http://localhost:3000/api/conversations/${conversationId}`, {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                },
                method: "POST",
                body: JSON.stringify({
                    "message": messages[messages.length - 1].content,
                    "role": "user"
                })
            })
            const res2 = await fetch(`http://localhost:3000/api/conversations/${conversationId}`, {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                },
                method: "POST",
                body: JSON.stringify({
                    "message": completion,
                    "role": "assistant"
                })
            })

            // await prisma.message.create({
            //     data: {
            //         userId: userid,
            //         convId: conversationId,
            //         message: messages[messages.length - 1].content,
            //         role: 'user',
            //         like: false,
            //         dislike: false,
            //         favorite: false,
            //         register: false
            //     }
            // })
            // await prisma.message.create({
            //     data: {
            //         userId: userid,
            //         convId: conversationId,
            //         message: completion,
            //         role: 'assistant',
            //         like: false,
            //         dislike: false,
            //         favorite: false,
            //         register: false
            //     }
            // })
        },
    });
    return new StreamingTextResponse(stream);
}
