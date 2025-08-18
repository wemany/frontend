import ImageUpload from "../ImageUpload"

const CommunityImagesSection = ({
    banner,
    logo,
    onBannerChange,
    onBannerRemove,
    onLogoChange,
    onLogoRemove,
    bannerError,
    logoError,
}: {
    banner: string
    logo: string
    bannerError?: string
    logoError?: string
    onBannerChange: (value: string) => void
    onBannerRemove: () => void
    onLogoChange: (value: string) => void
    onLogoRemove: () => void
}) => {
    return (
        <div className="space-y-6">
            {/* Banner */}
            <div className="space-y-3">
                <ImageUpload
                    value={banner}
                    onChange={onBannerChange}
                    onRemove={onBannerRemove}
                    label="Banner de la Comunidad"
                    description="Imagen principal que aparecerá en la portada de tu comunidad (recomendado: 1200x400px)"
                    aspectRatio="banner"
                    maxSize={10}
                    error={bannerError}
                />
            </div>

            {/* Logo */}
            <div className="space-y-3">
                <div className="flex flex-col items-center">
                    <ImageUpload
                        value={logo}
                        onChange={onLogoChange}
                        onRemove={onLogoRemove}
                        label="Logo de la Comunidad"
                        description="Imagen que representará tu comunidad (recomendado: 400x400px)"
                        aspectRatio="square"
                        maxSize={5}
                        error={logoError}
                    />
                </div>
            </div>
        </div>
    )
}

export default CommunityImagesSection;