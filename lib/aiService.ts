import axios from 'axios'

const GATEWAY_URL = 'GATEWAY_URL'

export const generateImage = async (prompt: string) => {
    try {
        const response = await axios.post(`${GATEWAY_URL}/text-to-image`, { prompt })
        return response.data.imageUrl
    } catch (error) {
        console.error('Error generating image:', error)
        throw error
    }
}

export const improveImage = async (image: File, prompt: string) => {
    try {
        const formData = new FormData()
        formData.append('image', image)
        formData.append('prompt', prompt)
        const response = await axios.post(`${GATEWAY_URL}/image-to-image`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        return response.data.imageUrl
    } catch (error) {
        console.error('Error improving image:', error)
        throw error
    }
}

export const upscaleImage = async (image: File) => {
    try {
        const formData = new FormData()
        formData.append('image', image)
        const response = await axios.post(`${GATEWAY_URL}/upscale`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        return response.data.imageUrl
    } catch (error) {
        console.error('Error upscaling image:', error)
        throw error
    }
}