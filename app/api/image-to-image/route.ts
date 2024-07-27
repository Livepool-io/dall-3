import { NextRequest, NextResponse } from 'next/server';
import { improveImage } from '@/lib/aiService';

export async function POST(req: NextRequest) {
    if (req.method !== 'POST') {
        return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
    }

    try {
        const formData = await req.formData();
        const prompt = formData.get('prompt') as string | null;
        const image = formData.get('image') as File | null;

        if (!prompt) {
            return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
        }

        if (!image) {
            return NextResponse.json({ error: 'Image is required' }, { status: 400 });
        }


        const improvedImage = await improveImage(prompt, image);

        return NextResponse.json(improvedImage);
    } catch (error) {
        console.error('Error improving image:', error);
        return NextResponse.json({ error: 'Error processing request' }, { status: 500 });
    }
}