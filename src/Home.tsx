
import { useAuth } from "./Features/Login/Context/Login/UseLogin";



export default function Home() {
    const { logout } = useAuth();
    return (
        <div>
            <h1>HOME!!!</h1>
            <button onClick={logout}>Cerrar sesion</button>
        
        </div>
    )
}