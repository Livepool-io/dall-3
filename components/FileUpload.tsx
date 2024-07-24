import React, { useRef, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Upload, Check } from 'lucide-react'

interface FileUploadProps {
    onFileSelect: (file: File) => void
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect }) => {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [fileName, setFileName] = useState<string | null>(null)
    const [filePreview, setFilePreview] = useState<string | null>(null)

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            onFileSelect(file)
            setFileName(file.name)
            const reader = new FileReader()
            reader.onloadend = () => {
                setFilePreview(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <div className="flex flex-col items-center space-y-4">
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
            />
            <Button
                onClick={() => fileInputRef.current?.click()}
                className="w-full bg-gray-700 hover:bg-gray-600 text-white"
            >
                {fileName ? (
                    <>
                        <Check className="mr-2 h-4 w-4" />
                        {fileName}
                    </>
                ) : (
                    <>
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Image
                    </>
                )}
            </Button>
            {fileName && (
                <>
                    <p className="text-sm text-gray-400">
                        Click again to change the selected file
                    </p>
                    {filePreview && (
                        <img
                            src={filePreview}
                            alt="Preview"
                            className="mt-4 w-full max-w-xs rounded-lg shadow-lg"
                        />
                    )}
                </>
            )}
        </div>
    )
}
