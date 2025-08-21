import { useState } from "react";
import { ChevronUp, ChevronDown, LucideBrushCleaning } from "lucide-react";
import { useBookStore } from "@/stores/useBookStore";
import toast from "react-hot-toast";

const PriceFilter = () => {
  const [expanded, setExpanded] = useState(true);
  const { filters, setFilters, clearFilters} = useBookStore();

  const handleBlur = () => {
    if (
      filters.maxPrice &&
      filters.minPrice &&
      filters.maxPrice < filters.minPrice
    ) {
      toast.error(
        "El precio máximo debe ser mayor o igual que el precio mínimo."
      );
      setFilters({
        ...filters,
        maxPrice: undefined, // Resetea el precio máximo si es inválido
      });
    }
  };

  const handleChange = (key: "minPrice" | "maxPrice", value: string) => {
    setFilters({
      ...filters,
      [key]: value ? Number(value) : undefined,
    });
  };

  return (
    <div className="mb-8">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center justify-between w-full text-left mb-4 group"
      >
        <h3 className="text-lg font-semibold text-gray-900">Precio</h3>
        {expanded ? (
          <ChevronUp
            size={20}
            className="text-gray-400 group-hover:text-gray-600"
          />
        ) : (
          <ChevronDown
            size={20}
            className="text-gray-400 group-hover:text-gray-600"
          />
        )}
      </button>

      {expanded && (
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Min S/.:
              </label>
              <input
                type="number"
                value={filters.minPrice || ""}
                onChange={(e) => handleChange("minPrice", e.target.value)}
                onBlur={handleBlur}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max S/.:
              </label>
              <input
                type="number"
                value={filters.maxPrice ?? ""}
                onChange={(e) => handleChange("maxPrice", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <button
            onClick={() => clearFilters(["minPrice", "maxPrice"])}
            className="flex items-center gap-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg"
          >
            <LucideBrushCleaning size={14} />
            Limpiar
          </button>
        </div>
      )}
    </div>
  );
};

export default PriceFilter;
