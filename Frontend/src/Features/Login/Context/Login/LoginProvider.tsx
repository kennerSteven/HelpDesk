import type React from "react";
import { LoginContext } from "./ContextLogin";
import { useEffect, useState } from "react";
import type { User } from "../../../../Shared/Types";
export default function LoginProvider({ children }: { children: React.ReactNode }) {

    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState<boolean>(true)


    useEffect(() => {
        const storedUser = localStorage.getItem("simulated_session")
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser))
               
            } catch (error) {
                localStorage.removeItem("simulated_session")
            }
        }
        setLoading(false);

    }, [])




    function login(userData: User) {
        setUser(userData)
        localStorage.setItem("simulated_session", JSON.stringify(userData))
    }

    function logout() {
        setUser(null)
        localStorage.removeItem("simulated_session")
    }

    return (

        <div>
            <LoginContext.Provider value={{ user, login, logout, loading }}>
                {children}
            </LoginContext.Provider>
        </div>

    )
}