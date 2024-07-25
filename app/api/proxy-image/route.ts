import { NextResponse } from 'next/server'
import axios from 'axios'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const url = searchParams.get('url')

    if (!url) {
        return NextResponse.json({ error: 'Missing URL parameter' }, { status: 400 })
    }

    try {
        const response = await axios.get(url, {
            responseType: 'arraybuffer',
            validateStatus: function (status) {
                return status < 500 // Resolve only if the status code is less than 500
            }
        })

        const contentType = response.headers['content-type']

        return new NextResponse(Buffer.from(response.data), {
            headers: {
                'Content-Type': contentType,
                'Cache-Control': 'public, max-age=3600' // Cache for 1 hour
            }
        })
    } catch (error) {
        console.error('Proxy image error:', error)
        return NextResponse.json({ error: 'Failed to proxy image' }, { status: 500 })
    }
}