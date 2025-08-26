import { cn } from '@/lib/utils';

const StrengthScore = ({ strengthScore, getStrengthIndicator, passwordCriteria, metCriteria }: {
    strengthScore: number, getStrengthIndicator: {
        text: string;
        color: string;
        width: string;
    },
    passwordCriteria: {
        label: string;
        regex: RegExp;
    }[],
    metCriteria: {
        [key: string]: boolean;
    }
}) => {
    return (
        <div className="flex flex-col text-sm gap-1">
            <div className="flex justify-between font-semibold mb-1">
                <span>Strength:</span>
                <span
                    className={cn(
                        strengthScore <= 1 && "text-red-400",
                        strengthScore === 2 && "text-orange-400",
                        strengthScore === 3 && "text-yellow-400",
                        strengthScore === 4 && "text-lime-400",
                        strengthScore === 5 && "text-green-400"
                    )}
                >
                    {getStrengthIndicator.text}
                </span>
            </div>
            <div className="flex space-x-1" role="progressbar">
                {Array.from({ length: 5 }, (_, index) => (
                    <div
                        key={index}
                        className={`h-2 flex-1 rounded-full transition-all duration-300 ${index < strengthScore
                            ? getStrengthIndicator.color
                            : "bg-gray-700"
                            }`}
                    />
                ))}
            </div>
            {strengthScore < 5 && <PasswordCriteria
                passwordCriteria={passwordCriteria}
                metCriteria={metCriteria}
            />}
        </div>
    );
}


const PasswordCriteria = ({ passwordCriteria, metCriteria }: {
    passwordCriteria: {
        label: string;
        regex: RegExp;
    }[],
    metCriteria: {
        [key: string]: boolean;
    }
}) => {
    return (
        <ul className="list-disc list-inside space-y-1">
            {passwordCriteria.map((criterion, index) => (
                <li key={index} className={cn(
                    metCriteria[criterion.label] ? 'text-green-400' : 'text-gray-400'
                )}>
                    {criterion.label}
                </li>
            ))}
        </ul>
    )
}

export { StrengthScore, PasswordCriteria }
