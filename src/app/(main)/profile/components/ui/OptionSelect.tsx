import { cn } from "@/lib/utils";
import { BaseOptionProps } from "../../types/community.types";

const OptionSelect = <T extends string>({
    isSelected,
    onSelect,
    icon,
    title,
    description,
}: BaseOptionProps<T>) => {
    return (
        <div
            onClick={onSelect}
            className={cn(
                "p-4 rounded-2xl border cursor-pointer transition-all",
                isSelected ? "border-purple-500 bg-purple-600/10" : "border-gray-700 bg-gray-800/30 hover:border-gray-600",
            )}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onSelect();
                }
            }}
        >
            <div className="flex items-center gap-3">
                {icon}
                <div>
                    <h4 className="text-white font-medium">{title}</h4>
                    <p className="text-slate-400 text-sm">{description}</p>
                </div>
            </div>
        </div>
    );
};

export default OptionSelect;