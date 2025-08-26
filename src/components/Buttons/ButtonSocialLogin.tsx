import Image from "next/image";
import { Button } from "../ui/button";

interface ButtonProps {
    onClick: () => void;
    iconSrc: string;
    label: string;
    isSubmitting: boolean;


}

const ButtonComponent = ({ onClick, iconSrc, label, isSubmitting }: ButtonProps) => {
    return (
        <Button
            type="button"
            variant="outline"
            className={`w-full bg-gray-900 border-none h-12 rounded-2xl text-white hover:bg-gray-700 transition-colors cursor-pointer flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ""}`}
            onClick={onClick}
        >
            <Image src={iconSrc} alt={`${iconSrc} icon`} width={20} height={20} />
            <span className="hidden xl:block">{label}</span>
        </Button>
    )
}

export default ButtonComponent;