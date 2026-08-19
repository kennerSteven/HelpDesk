
import { useAuth } from "../Features/Login/Context/Login/UseLogin";
import { Navigate } from "react-router-dom";

interface props {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: props) {
  const { user, loading } = useAuth();

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
