import { NextRequest, NextResponse } from 'next/server';
import { upscaleImage } from '@/lib/aiService';
import { UpscaleRequest } from '@/types/ai';

export const POST = async (req: NextRequest) => {
    if (req.method !== 'POST') return NextResponse.error();
    const body: UpscaleRequest = await req.json();

    const img = await upscaleImage(body.image);

    return NextResponse.json(img);
}