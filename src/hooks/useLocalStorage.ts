import { useState, useEffect, Dispatch, SetStateAction } from "react";

// Define un tipo genérico para el valor almacenado
type Value<T> = T;

// La firma de la función de retorno del hook
type SetValue<T> = Dispatch<SetStateAction<T | undefined>>;

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [Value<T> | undefined, SetValue<T>] {
  const [storedValue, setStoredValue] = useState<Value<T> | undefined>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      if (typeof window !== "undefined" && storedValue !== undefined) {
        window.localStorage.setItem(key, JSON.stringify(storedValue));
      }
    } catch (error) {
      console.error("Error writing to localStorage:", error);
    }
  }, [key, storedValue]);

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key) {
        if (event.newValue) {
          try {
            setStoredValue(JSON.parse(event.newValue) as T);
          } catch (error) {
            console.error("Error parsing localStorage value:", error);
          }
        } else {
          // Case where the item was removed
          setStoredValue(undefined);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [key]);

  return [storedValue, setStoredValue as SetValue<T>];
}
