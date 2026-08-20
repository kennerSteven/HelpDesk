import { useState } from "react";

export default function useErrors({ data }: any) {

    const [errors, setErrors] = useState<any>({data})

    return {
        errors,
        setErrors

    }
}