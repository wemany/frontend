import { BaseOptionProps, BaseTypeSelectorProps } from "../../types/community.types";
import OptionSelect from "./OptionSelect";

interface TypeSelectorProps<T extends string | boolean> extends BaseTypeSelectorProps<T> {
    label: string;
    options: Omit<BaseOptionProps<T>, "isSelected" | "onSelect">[];
    showRequiredAsterisk?: boolean;
}

const TypeSelector = <T extends string | boolean>({
    selectedType,
    onTypeChange,
    label,
    options,
    error,
    showRequiredAsterisk = true,
}: TypeSelectorProps<T>) => {
    return (
        <div>
            <label className="block text-white font-medium mb-4">
                {label} {showRequiredAsterisk && <span className="text-red-400">*</span>}
            </label>
            <div className="space-y-3">
                {options.map((optionData) => (
                    <OptionSelect
                        key={optionData.type.toString()}
                        type={optionData.type.toString()}
                        isSelected={selectedType === optionData.type}
                        onSelect={() => onTypeChange(optionData.type)}
                        icon={optionData.icon}
                        title={optionData.title}
                        description={optionData.description}
                    />
                ))}
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
    );
};

export default TypeSelector;