"use client"

import { BaseOptionProps, BasicInfoStepProps } from "../types/community.types"
import CommunityNameField from "./ui/CommunityNameField"
import CommunityDescriptionField from "./ui/CommunityDescriptionField"
import CommunityCategoryField from "./ui/CommunityCategoryField"
import CommunityLanguageField from "./ui/CommunityLanguageField"
import TypeSelector from "./ui/TypeSelector"
import CommunityImagesSection from "./ui/CommunityImagesSection"
import { Globe, Shield } from "lucide-react"

const communityTypeOptions: Omit<BaseOptionProps<"public" | "private">, "isSelected" | "onSelect">[] = [
    {
        type: "public",
        icon: <Globe className="h-5 w-5 text-green-400" />,
        title: "Pública",
        description: "Cualquiera puede encontrar y unirse a tu comunidad",
    },
    {
        type: "private",
        icon: <Shield className="h-5 w-5 text-blue-400" />,
        title: "Privada",
        description: "Solo por invitación o enlace directo",
    },
];

export function BasicInfoStep({ form, communityData }: BasicInfoStepProps) {
    const { control, formState, setValue, watch } = form
    const selectedType = watch("type")

    const handleTypeChange = (type: "public" | "private") => {
        setValue("type", type)
        setValue("isPublic", type === "public")
    }

    const handleBannerChange = (value: string) => {
        setValue("banner", value)
    }

    const handleBannerRemove = () => {
        setValue("banner", "")
    }

    const handleLogoChange = (value: string) => {
        setValue("logo", value)
    }

    const handleLogoRemove = () => {
        setValue("logo", "")
    }

    return (
        <div className="space-y-6">
            <CommunityNameField control={control} error={formState.errors.name?.message} />
            <CommunityDescriptionField control={control} error={formState.errors.description?.message} />
            <CommunityImagesSection
                banner={watch("banner")}
                logo={watch("logo")}
                onBannerChange={handleBannerChange}
                onBannerRemove={handleBannerRemove}
                onLogoChange={handleLogoChange}
                onLogoRemove={handleLogoRemove}
                bannerError={formState.errors.banner?.message}
                logoError={formState.errors.logo?.message}
            />
            <CommunityCategoryField control={control}
                error={formState.errors.category?.message}
                categories={communityData.categories}
            />
            <CommunityLanguageField control={control}
                error={formState.errors.language?.message}
                languages={communityData.languages}
            />
            <TypeSelector
                selectedType={selectedType}
                onTypeChange={handleTypeChange}
                error={formState.errors.type?.message}
                label="Tipo de Comunidad"
                options={communityTypeOptions}
            />
        </div>
    )
}