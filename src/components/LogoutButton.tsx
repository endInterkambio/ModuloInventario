import { useAuthStore } from "@/stores/useAuthStore";
import { useNavigate } from "react-router-dom";

export const LogoutButton = () => {
  const { logoutUser } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/auth/login");
  };

  return <button onClick={handleLogout} className="text-secondary font-medium">Cerrar sesión</button>;
};
