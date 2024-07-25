import Image from "next/image"

export const Header = () => {
    return (
        <div
            className="max-w-4xl mx-auto space-y-12 pt-8 top-0"
        >
            <Image src="/dall3.png" alt="DALL-3" width={300} height={200} className="mx-auto" />
        </div>
    )
}