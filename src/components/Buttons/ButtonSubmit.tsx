import { Button } from "../ui/button";

interface ButtonProps {
    isValid: boolean;
    isSubmitting: boolean;
    label: string
    labeling: string
}

const ButtonSubmit = ({ isValid, isSubmitting, label, labeling }: ButtonProps) => {
    return (
        <div className="flex items-center justify-between mt-6">
            <Button
                type="submit"
                className={`w-full h-14 px-10 py-2 rounded-xl text-xl font-semibold transition duration-300 ease-in-out transform hover:scale-105 ${isValid && !isSubmitting
                    ? "bg-purple-400 text-white hover:bg-purple-600 cursor-pointer"
                    : "bg-gray-500 text-gray-300 cursor-not-allowed"
                    }`}
                disabled={!isValid || isSubmitting}
                aria-label="register"
            >
                {isSubmitting ? `${labeling}` : `${label}`}
            </Button>
        </div>
    )
}

export default ButtonSubmit;