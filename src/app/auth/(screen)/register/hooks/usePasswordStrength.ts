import { useMemo } from "react";

const passwordCriteria = [
  { label: "At least 6 characters", regex: /.{6,}/ },
  { label: "At least one uppercase letter", regex: /[A-Z]/ },
  { label: "At least one lowercase letter", regex: /[a-z]/ },
  { label: "At least one number", regex: /[0-9]/ },
  { label: "At least one special characterspecial", regex: /[^a-zA-Z0-9]/ },
];

export const usePasswordStrength = (passwordValue: string) => {
  const { strengthScore, metCriteria } = useMemo(() => {
    let score = 0;
    const met: { [key: string]: boolean } = {};
    passwordCriteria.forEach((criterion) => {
      const isMet = criterion.regex.test(passwordValue || "");
      if (isMet) {
        score += 1;
      }
      met[criterion.label] = isMet;
    });
    return { strengthScore: score, metCriteria: met };
  }, [passwordValue]);

  const getStrengthIndicator = useMemo(() => {
    if (!passwordValue) {
      return { text: "", color: "bg-gray-400", width: "w-0" };
    }
    switch (strengthScore) {
      case 0:
      case 1:
        return { text: "Very weak", color: "bg-red-500", width: "w-1/5" };
      case 2:
        return { text: "Weak", color: "bg-orange-500", width: "w-2/5" };
      case 3:
        return { text: "Medium", color: "bg-yellow-500", width: "w-3/5" };
      case 4:
        return { text: "Strong", color: "bg-lime-500", width: "w-4/5" };
      case 5:
        return { text: "Very Strong", color: "bg-green-500", width: "w-full" };
      default:
        return { text: "", color: "bg-gray-400", width: "w-0" };
    }
  }, [strengthScore, passwordValue]);

  return {
    strengthScore,
    metCriteria,
    getStrengthIndicator,
    passwordCriteria,
  };
};
