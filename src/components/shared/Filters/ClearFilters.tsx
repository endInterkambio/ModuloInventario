import { useBookStore } from "@/stores/useBookStore";
import { RotateCcw } from "lucide-react";

interface Props {
  hasActiveFilters: boolean;
}

const ClearFilters = ({ hasActiveFilters }: Props) => {
  const clearFilters = useBookStore((state) => state.clearFilters);

  return (
    <button
      onClick={() => clearFilters()}
      className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 transition-colors mb-6 group"
      disabled={!hasActiveFilters}
    >
      <RotateCcw
        size={14}
        className={`transition-transform ${
          hasActiveFilters ? "group-hover:rotate-180" : "opacity-50"
        }`}
      />
      <span className={hasActiveFilters ? "" : "opacity-50"}>
        Limpiar todos los filtros
      </span>
    </button>
  );
};

export default ClearFilters;
