export type ImageToImageRequest = {
    prompt: string;
    image: File;
    model_id: string;
}

export type TextToImageRequest = {
    prompt: string;
    model_id: string;
    width: number;
    height: number;
}

export type UpscaleRequest = {
    prompt: string;
    image: File;
    model_id: string;
}