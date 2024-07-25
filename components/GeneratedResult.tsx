import { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"

export function ImageDisplay({ imageUrl }: { imageUrl: string }) {
    const [proxyUrl, setProxyUrl] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (imageUrl) {
            setProxyUrl(`/api/proxy-image?url=${encodeURIComponent(imageUrl)}`)
        }
    }, [imageUrl])

    const handleImageError = () => {
        setError('Failed to load image')
    }

    if (!proxyUrl) return null

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Card className="mt-8 bg-gray-800/50 border-gray-700 overflow-hidden rounded-2xl backdrop-blur-sm shadow-xl">
                <CardHeader>
                    <CardTitle className="text-2xl text-green-400">Generated Image</CardTitle>
                </CardHeader>
                <CardContent>
                    {error ? (
                        <p className="text-red-500">{error}</p>
                    ) : (
                        <>
                            <a href={proxyUrl}>Link to Image</a>
                            <img
                                src={proxyUrl}
                                alt="Generated"
                                className="w-full rounded-xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                                onError={handleImageError}
                            />
                        </>
                    )}
                </CardContent>
            </Card>
        </motion.div>
    )
}