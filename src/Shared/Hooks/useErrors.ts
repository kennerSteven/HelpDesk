import { useState } from "react";

export default function useErrors<T>(initialErrors: T) {
    const [errors, setErrors] = useState<T>(initialErrors);

    return {
        errors,
        setErrors,
    }
}