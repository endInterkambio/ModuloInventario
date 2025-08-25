import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NewButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/dashboard/inventory/new")}
      className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
    >
      <Plus className="w-4 h-4" />
      Nuevo
    </button>
  );
};

export default NewButton;
