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

export async function POST(req: Request) {
    const { messages } = await req.json();

    // Ask Azure OpenAI for a streaming chat completion given the prompt
    const response = await client.streamChatCompletions(
        'gpt432',
        messages,
    );
    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
}
