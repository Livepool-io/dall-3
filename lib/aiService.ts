import axios from 'axios'

const GATEWAY_URL = 'http://81.83.17.122:8936'

export const generateImage = async (prompt: string) => {
    try {
        const response = await fetch(`${GATEWAY_URL}/text-to-image`, {
            method: 'POST',
            body: JSON.stringify({ prompt, model_id: "ByteDance/SDXL-Lightning", width: 1024, height: 1024 }),
            headers: {
                'Content-Type': 'application/json',
            },
        }
        );
        const body = await response.json()
        return `${GATEWAY_URL}${body?.images?.[0]?.url}`;
    } catch (error) {
        console.error('Error generating image:', error);
        throw error;
    }
};
export const improveImage = async (prompt: string, image: File): Promise<string> => {
    try {
        const formData = new FormData();
        formData.append('image', image);
        formData.append('prompt', prompt);
        formData.append('model_id', "ByteDance/SDXL-Lightning");

        const response = await fetch(`${GATEWAY_URL}/image-to-image`, {
            method: 'POST',
            body: formData,
            // No need to explicitly set Content-Type for FormData
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return `${GATEWAY_URL}${data?.images?.[0]?.url}`;
    } catch (error) {
        console.error('Error improving image:', error);
        throw error;
    }
}

export const upscaleImage = async (prompt: string, image: File): Promise<string> => {
    try {
        const formData = new FormData();
        formData.append('image', image);
        formData.append('prompt', prompt);
        formData.append('model_id', 'stabilityai/stable-diffusion-x4-upscaler')

        const response = await fetch(`${GATEWAY_URL}/upscale`, {
            method: 'POST',
            body: formData,
            // No need to explicitly set Content-Type for FormData
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return `${GATEWAY_URL}${data?.images?.[0]?.url}`
    } catch (error) {
        console.error('Error upscaling image:', error);
        throw error;
    }
}