import { useNavigate } from "react-router-dom";

interface BackButtonProps {
  label?: string;
  className?: string;
}

const BackButton = ({
  label = "Regresar",
  className = "",
}: BackButtonProps) => {
  const navigate = useNavigate();
  return (
    <div className="relative left-5 pb-4 xl:pb-0 top-5 mt-2 ml-2 z-10">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className={`items-center px-4 py-2 bg-blue-700  hover:bg-blue-600 rounded transition-all text-white ${className}`}
      >
        ← {label}
      </button>
    </div>
  );
};

export default BackButton;
