import { NextRequest, NextResponse } from 'next/server';

let openai: any = null;

function getClient() {
  if (!openai) {
    const OpenAI = require('openai');
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      baseURL: 'https://api.deepseek.com/v1',
    });
  }
  return openai;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const values = Object.values(body).filter((v: any) => typeof v === 'string' && v.trim()).join('\n');

    const systemPrompt = "You are a study skills coach. Create a comprehensive study guide.";

    const client = getClient();
    const completion = await client.chat.completions.create({
      model: 'deepseek-chat',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: values },
      ],
      temperature: 0.7,
    });

    return NextResponse.json({ result: completion.choices[0].message.content });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
