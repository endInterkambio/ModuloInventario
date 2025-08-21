import { RotateCcw } from "lucide-react";

interface Props {
  clearAll: () => void;
  hasActiveFilters: boolean;
}

const ClearFilters = ({ clearAll, hasActiveFilters }: Props) => {
  return (
    <button
      onClick={clearAll}
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
