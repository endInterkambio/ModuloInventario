import { useAuthStore } from "@/stores/useAuthStore";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export const ProtectedRoute = () => {
  const { token } = useAuthStore();
  const location = useLocation();

  // Si no hay token, redirige al login
  if (!token) {
    return <Navigate to="/auth/login" replace state={{ from: location }} />;
  }

  // Si hay token, renderiza las rutas hijas (incluyendo dinámicas)
  return <Outlet />;
};
