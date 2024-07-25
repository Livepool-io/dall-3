import React, { useRef, useState, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Upload, Check, Image as ImageIcon } from 'lucide-react';

interface FileUploadProps {
    onFileSelect: (file: File) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [fileName, setFileName] = useState<string | null>(null);
    const [filePreview, setFilePreview] = useState<string | null>(null);
    const [dragging, setDragging] = useState<boolean>(false);

    const handleFile = useCallback((file: File) => {
        if (file && file.type.match('image.*')) {
            onFileSelect(file);
            setFileName(file.name);
            const reader = new FileReader();
            reader.onloadend = () => {
                setFilePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    }, [onFileSelect]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) handleFile(file);
    };

    const handleDragOver = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        setDragging(true);
    }, []);

    const handleDragLeave = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        setDragging(false);
    }, []);

    const handleDrop = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        setDragging(false);
        const file = event.dataTransfer.files[0];
        if (file) handleFile(file);
    }, [handleFile]);

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div
            className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg transition-colors duration-300 ease-in-out ${dragging ? 'border-green-300 bg-gray-600' : 'border-gray-300 hover:border-gray-400'
                }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleClick}
        >
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
            />
            {filePreview ? (
                <div className="relative w-full h-full">
                    <img
                        src={filePreview}
                        alt="Preview"
                        className="w-full h-full object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                        <p className="text-white text-center px-4">
                            <Check className="inline-block mr-2 h-6 w-6" />
                            {fileName}
                            <br />
                            <span className="text-sm">Click or drag to replace</span>
                        </p>
                    </div>
                </div>
            ) : (
                <div className="text-center">
                    <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-600">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="mt-1 text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
            )}
        </div>
    );
};