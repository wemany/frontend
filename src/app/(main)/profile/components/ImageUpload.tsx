import { cn } from "@/lib/utils"
import { useImageUpload } from "../hooks/useImageUpload"
import { Button } from "@/components/ui/button"
import { AlertCircle, ImageIcon, Upload, X } from "lucide-react"
import Image from "next/image"

interface ImageUploadProps {
    value?: string
    onChange: (value: string) => void
    onRemove: () => void
    label: string
    description?: string
    aspectRatio?: "square" | "banner"
    maxSize?: number // en MB
    error?: string
}

const ImageUpload = ({
    value,
    onChange,
    onRemove,
    label,
    description,
    aspectRatio = "square",
    maxSize = 5,
    error,
}: ImageUploadProps) => {

    // Diferentes tamaños según el tipo
    const containerClasses = {
        square: "aspect-square max-w-[200px]", // Logo más pequeño
        banner: "aspect-[3/1] w-full", // Banner mantiene tamaño completo
    }

    const minHeightClasses = {
        square: "min-h-[120px]", // Logo más pequeño
        banner: "min-h-[140px]", // Banner mantiene altura
    }
    const {
        isDragOver,
        isUploading,
        fileInputRef,
        handleDrop,
        handleDragOver,
        handleDragLeave,
        handleClick,
        handleFileChange } = useImageUpload({ maxSize, onChange })

    return (
        <div className="space-y-3 w-full">
            <div className="flex flex-col items-start space-y-1">
                <label className="block text-white font-medium text-sm">{label} <span className="text-red-400 ml-1">*</span></label>
                {description && <p className="text-slate-400 text-xs leading-relaxed">{description}</p>}
            </div>

            <div className={cn("mx-auto", aspectRatio === "square" ? "max-w-[200px]" : "w-full")}>
                <div
                    className={cn(
                        "relative border-2 border-dashed rounded-xl transition-all cursor-pointer overflow-hidden",
                        containerClasses[aspectRatio],
                        minHeightClasses[aspectRatio],
                        isDragOver
                            ? "border-purple-400 bg-purple-500/5 scale-[1.02]"
                            : value
                                ? error
                                    ? "border-red-500 bg-red-500/5"
                                    : "border-gray-600 bg-gray-800/20"
                                : error
                                    ? "border-red-500 bg-red-500/5"
                                    : "border-gray-700 bg-gray-800/10 hover:border-gray-600 hover:bg-gray-800/20",
                    )}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onClick={handleClick}
                >
                    <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />

                    {value ? (
                        <div className="relative w-full h-full group">
                            <Image src={value || "/images/bg-not-found.png"} fill alt={label} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center justify-center">
                                <div className="flex gap-2">
                                    <Button
                                        type="button"
                                        size="sm"
                                        variant="secondary"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            handleClick()
                                        }}
                                        className="bg-white/90 hover:bg-white text-gray-900 border-0 shadow-lg text-xs"
                                    >
                                        <Upload className="h-3 w-3 mr-1" />
                                        Cambiar
                                    </Button>
                                    <Button
                                        type="button"
                                        size="sm"
                                        variant="destructive"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            onRemove()
                                        }}
                                        className="bg-red-500/90 hover:bg-red-500 text-white border-0 shadow-lg text-xs"
                                    >
                                        <X className="h-3 w-3 mr-1" />
                                        Quitar
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-slate-400 p-4">
                            {isUploading ? (
                                <div className="flex flex-col items-center gap-3">
                                    <div className="animate-spin rounded-full h-6 w-6 border-2 border-purple-500 border-t-transparent"></div>
                                    <p className="text-xs font-medium">Procesando...</p>
                                </div>
                            ) : (
                                <div className="text-center space-y-2">
                                    <div
                                        className={cn(
                                            "mx-auto rounded-full flex items-center justify-center",
                                            aspectRatio === "square" ? "w-8 h-8" : "w-12 h-12",
                                            error ? "bg-red-500/20" : "bg-gray-800/50",
                                        )}
                                    >
                                        {error ? (
                                            <AlertCircle className={cn(aspectRatio === "square" ? "h-4 w-4" : "h-6 w-6", "text-red-400")} />
                                        ) : (
                                            <ImageIcon className={cn(aspectRatio === "square" ? "h-4 w-4" : "h-6 w-6")} />
                                        )}
                                    </div>
                                    <div className="space-y-1">
                                        <p className={cn("font-medium", aspectRatio === "square" ? "text-xs" : "text-sm")}>
                                            {isDragOver ? "Suelta aquí" : error ? "Imagen requerida" : "Subir imagen"}
                                        </p>
                                        <p className="text-xs text-slate-500">
                                            {aspectRatio === "square" ? "Clic o arrastra" : "Arrastra y suelta o haz clic"}
                                        </p>
                                        <p className="text-xs text-slate-500">Máximo {maxSize}MB • JPG, PNG, GIF</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
            {error && (
                <div className="flex items-center gap-2 text-red-400 text-sm">
                    <span>{error}</span>
                </div>
            )}
        </div>
    )
}

export default ImageUpload;