import type React from "react";
import { loginContext } from "./ContextLogin";

export default function LoginProvider({children}:{childre:React.ReactNode}) {
    


    return(
       
            <loginContext >
                {children}
            </loginContext>
       
    )
}