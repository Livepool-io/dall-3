import { NextRequest, NextResponse } from 'next/server';
import { generateImage } from '@/lib/aiService';
import { TextToImageRequest } from '@/types/ai';


export const POST = async (req: NextRequest) => {
    if (req.method !== 'POST') return NextResponse.error();
    const body: TextToImageRequest = await req.json();

    const img = await generateImage(body.prompt);

    return NextResponse.json(img);
}