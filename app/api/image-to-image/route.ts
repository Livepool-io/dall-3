import { NextRequest, NextResponse } from 'next/server';
import { improveImage } from '@/lib/aiService';
import { ImageToImageRequest } from '@/types/ai';

export const POST = async (req: NextRequest) => {
    if (req.method !== 'POST') return NextResponse.error();
    const body: ImageToImageRequest = await req.json();

    const img = await improveImage(body.image, body.prompt);

    return NextResponse.json(img);
}