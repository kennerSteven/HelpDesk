import { useContext } from "react";
import { LoginContext } from "./ContextLogin";
import type { AuthContextType } from "../../../../Shared/Types";

export const useAuth = (): AuthContextType => {
    const context = useContext(LoginContext);
    if (!context) {
        throw new Error('useAuth debe usarse dentro de un AuthProvider');
    }
    return context;
};