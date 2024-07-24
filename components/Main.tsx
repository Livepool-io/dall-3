"use client"
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileUpload } from '@/components/FileUpload'
import { generateImage, improveImage, upscaleImage } from '@/lib/aiService'
import { Loader2, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import { Textarea } from "@/components/ui/textarea"

export default function Main() {
    const [prompt, setPrompt] = useState('')
    const [image, setImage] = useState('')
    const [uploadedImage, setUploadedImage] = useState<File | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleTextToImage = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const res = await (await fetch('/api/text-to-image', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model_id: "ByteDance/SDXL-Lightning",
                    prompt,
                    width: 1024,
                    height: 1024,
                }),
            })).json();

            setImage(res)
        } catch (error) {
            console.error('Error generating image:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleImageToImage = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!uploadedImage) return
        setIsLoading(true)
        try {
            const imageUrl = await improveImage(uploadedImage, prompt)
            setImage(imageUrl)
        } catch (error) {
            console.error('Error improving image:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleUpscale = async () => {
        if (!uploadedImage) return
        setIsLoading(true)
        try {
            const imageUrl = await upscaleImage(uploadedImage)
            setImage(imageUrl)
        } catch (error) {
            console.error('Error upscaling image:', error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <div className="text-white py-12 px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-4xl mx-auto space-y-12"
                >
                    <Card className="bg-gray-800/50 border-gray-700 rounded-2xl overflow-hidden backdrop-blur-sm shadow-xl">
                        <CardHeader className="border-b border-gray-700 pb-6">
                            <CardTitle className="text-3xl text-green-400 flex items-center gap-2">
                                <Sparkles className="w-8 h-8" />
                                generate, improve, or upscale images
                            </CardTitle>
                            <CardDescription className="text-xl">
                                Open-source AI models on a decentralised network, bringing you true <b>OPEN</b> AI.

                            </CardDescription>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <Tabs defaultValue="text-to-image" className="w-full">
                                <TabsList className="grid w-full grid-cols-3 mb-8 rounded-xl bg-gray-700/50 p-1">
                                    <TabsTrigger value="text-to-image" className="rounded-lg text-base">Generate</TabsTrigger>
                                    <TabsTrigger value="image-to-image" className="rounded-lg text-base">Improve</TabsTrigger>
                                    <TabsTrigger value="upscale" className="rounded-lg text-base">Upscale</TabsTrigger>
                                </TabsList>
                                <TabsContent value="text-to-image">
                                    <form onSubmit={handleTextToImage} className="space-y-6">
                                        <Textarea
                                            placeholder="Enter your prompt"
                                            value={prompt}
                                            onChange={(e) => setPrompt(e.target.value)}
                                            className="text-base min-h-[120px] bg-gray-700/50 border-gray-600 focus:border-green-500 focus:ring-green-500 rounded-xl transition-all duration-200 ease-in-out"
                                        />
                                        <Button type="submit" className="w-full bg-green-400 hover:bg-green-200 transition-all duration-200 rounded-xl py-6 text-lg font-semibold">
                                            {isLoading ? (
                                                <>
                                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                                    Generating...
                                                </>
                                            ) : (
                                                'Generate'
                                            )}
                                        </Button>
                                    </form>
                                </TabsContent>
                                <TabsContent value="image-to-image">
                                    <form onSubmit={handleImageToImage} className="space-y-6">
                                        <FileUpload onFileSelect={(file) => setUploadedImage(file)} />
                                        <Textarea
                                            placeholder="Enter your prompt"
                                            value={prompt}
                                            onChange={(e) => setPrompt(e.target.value)}
                                            className="text-base min-h-[120px] bg-gray-700/50 border-gray-600 focus:border-green-500 focus:ring-green-500 rounded-xl transition-all duration-200 ease-in-out"
                                        />
                                        <Button type="submit" className="w-full bg-green-400 hover:bg-green-200 transition-all duration-200 rounded-xl py-6 text-lg font-semibold">
                                            {isLoading ? (
                                                <>
                                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                                    Improving...
                                                </>
                                            ) : (
                                                'Improve Image'
                                            )}
                                        </Button>
                                    </form>
                                </TabsContent>
                                <TabsContent value="upscale">
                                    <div className="space-y-6">
                                        <FileUpload onFileSelect={(file) => setUploadedImage(file)} />
                                        <Button onClick={handleUpscale} className="w-full bg-green-400 hover:bg-green-200 transition-all duration-200 rounded-xl py-6 text-lg font-semibold">
                                            {isLoading ? (
                                                <>
                                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                                    Upscaling...
                                                </>
                                            ) : (
                                                'Upscale Image'
                                            )}
                                        </Button>
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>

                    {image && (
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
                                    <img
                                        src={image}
                                        alt="Generated"
                                        className="w-full rounded-xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                                    />
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </>
    )
}
