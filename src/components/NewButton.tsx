import { useNavigate } from "react-router-dom";
import { LucideIcon } from "lucide-react";

interface NavButtonProps {
  to: string; // ruta de destino
  label: string; // texto a mostrar
  icon?: LucideIcon; // ícono opcional (de lucide-react)
  className?: string; // estilos adicionales opcionales
}

const NavButton = ({ to, label, icon: Icon, className = "" }: NavButtonProps) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(to)}
      className={`rounded-md font-medium transition-colors ${className}`}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {label}
    </button>
  );
};

export default NavButton;
