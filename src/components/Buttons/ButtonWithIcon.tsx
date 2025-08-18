import { LucideIcon } from "lucide-react";
import { Button } from "../ui/button";

interface ButtonWithIconProps {
    icon?: LucideIcon;
    size?: "default" | "sm" | "lg" | "icon";
    label?: string;
    position?: "left" | "right";
    className?: string;
    disabled?: boolean;
    variant?: "default" | "link" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined;
    onClick: () => void;
}

const ButtonWithIcon = ({ icon: Icon, label, position = "right", size, className, disabled, variant, onClick }: ButtonWithIconProps) => {

    return (
        <Button
            variant={variant}
            size={size}
            className={`${className} ${size === "icon" ? "gap-0" : "gap-2"} transition duration-300 ease-in-out transform hover:scale-105 rounded-xl`}
            disabled={disabled}
            onClick={onClick}
        >
            {position === "left" && Icon && (
                <Icon />
            )}
            {label}
            {position === "right" && Icon && (
                <Icon />
            )}
        </Button>
    );
};

export default ButtonWithIcon;