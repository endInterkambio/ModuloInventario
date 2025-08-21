import { useState } from "react";
import { ChevronUp, ChevronDown, Filter } from "lucide-react";

interface Props {
  minPrice: string;
  maxPrice: string;
  onChange: (field: "minPrice" | "maxPrice", value: string) => void;
}

const PriceFilter = ({ minPrice, maxPrice, onChange }: Props) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="mb-8">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center justify-between w-full text-left mb-4 group"
      >
        <h3 className="text-lg font-semibold text-gray-900">PRICE</h3>
        {expanded ? (
          <ChevronUp size={20} className="text-gray-400 group-hover:text-gray-600" />
        ) : (
          <ChevronDown size={20} className="text-gray-400 group-hover:text-gray-600" />
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
                value={minPrice}
                onChange={(e) => onChange("minPrice", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max S/.:
              </label>
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => onChange("maxPrice", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <button className="flex items-center gap-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg">
            <Filter size={14} />
            Aplicar
          </button>
        </div>
      )}
    </div>
  );
};

export default PriceFilter;
