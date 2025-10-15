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
    <div className="">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className={`items-center px-4 py-2 bg-primary  hover:bg-green-700 rounded transition-all text-white ${className}`}
      >
        ← {label}
      </button>
    </div>
  );
};

export default BackButton;
