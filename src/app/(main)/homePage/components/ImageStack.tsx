import Image from "next/image";

const ImageStack = () => {
    return (
        <div className="relative w-[600px] h-[500px] mt-30 flex justify-start">
            <div className="absolute -top-16 -right-16 z-10 w-[300px] h-[400px]">
                <Image
                    src="/images/homePage/section-2/image-2.png"
                    alt="Robot"
                    layout="fill"
                    objectFit="contain"
                />
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-[360px] h-[460px]">
                <Image
                    src="/images/homePage/section-2/image-1.png"
                    alt="Meditating Man"
                    layout="fill"
                    objectFit="contain"
                />
            </div>
            <div className="absolute bottom-12 -left-20 z-20 w-[300px] h-[400px]">
                <Image
                    src="/images/homePage/section-2/image.png"
                    alt="People interacting"
                    layout="fill"
                    objectFit="contain"
                />
            </div>
        </div>
    )
}

export default ImageStack;