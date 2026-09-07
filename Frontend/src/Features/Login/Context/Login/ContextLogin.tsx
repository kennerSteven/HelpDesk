import { createContext } from "react";
import type { AuthContextType } from "../../../../Shared/Types";
export const LoginContext = createContext<AuthContextType | null>(null)