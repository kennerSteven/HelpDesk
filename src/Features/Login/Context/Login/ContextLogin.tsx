import { createContext } from "react";
interface loginTypes{
    user : string
    password : string
    role : "SUPER_ADMIN" | "ADMIN" | "USER"
}
export const loginContext = createContext<loginTypes | null>(null)