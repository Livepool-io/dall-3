import { NextRequest, NextResponse } from 'next/server';
import { upscaleImage } from '@/lib/aiService';

export async function POST(req: NextRequest) {
    if (req.method !== 'POST') {
        return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
    }

    try {
        const formData = await req.formData();
        const file = formData.get('image') as File | null;
        const prompt = formData.get('prompt') as string ?? "upscale 2x";

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        // Pass the buffer to your upscaleImage function
        const upscaledImage = await upscaleImage(prompt, file);

        // Return the upscaled image
        return NextResponse.json(upscaledImage);
    } catch (error) {
        console.error('Error processing image:', error);
        return NextResponse.json({ error: 'Error processing image' }, { status: 500 });
    }
}