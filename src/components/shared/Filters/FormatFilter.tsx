import { useState } from "react";
import { ChevronUp, ChevronDown, LucideBrushCleaning } from "lucide-react";
import { useBookStore } from "@/stores/useBookStore";

const formats = [
  { id: "audiobooks", label: "Audio books" },
  { id: "audio cd", label: "Audio CD" },
  { id: "board", label: "Board" },
  { id: "book club edition", label: "Book club edition" },
  { id: "color", label: "Color" },
  { id: "hardback", label: "Hardback" },
  { id: "hardcover", label: "Hardcover" },
  { id: "interactive", label: "Interactive" },
  { id: "leather", label: "Leather" },
  { id: "library", label: "Library binding" },
  { id: "magazine", label: "Magazine" },
  { id: "manga", label: "Manga" },
  { id: "other format", label: "Other format" },
  { id: "paperback", label: "Paperback" },
  { id: "plastic comb", label: "Plastic comb" },
  { id: "rustica", label: "Rústica" },
  { id: "spiral bound", label: "Spiral bound" },
  { id: "softcover", label: "Softcover" },
  { id: "sticker book", label: "Sticker book" },
  { id: "trade paperback", label: "Trade Paperback" },
  { id: "tapa blanda", label: "Tapa blanda" },
  { id: "tapa dura", label: "Tapa dura" },
];

const INITIAL_VISIBLE_FORMATS = 5;

const FormatFilter = () => {
  const [showAll, setShowAll] = useState(false);
  const [expanded, setExpanded] = useState(true);

  const { filters, setFilters, clearFilters } = useBookStore();

  // Convert selected categories to a string for the store
  const selected = filters.format
    ? filters.format.split(",").filter(Boolean)
    : [];

  const handleChange = (id: string) => {
    const newSelected = selected.includes(id)
      ? selected.filter((c) => c !== id)
      : [...selected, id];

    // guardar como string en el store
    setFilters({ format: newSelected.join(",") });
  };

  const visibleFormats = showAll
    ? formats
    : formats.slice(0, INITIAL_VISIBLE_FORMATS);

  return (
    <div className="mb-8">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center justify-between w-full text-left mb-4 group"
      >
        <h3 className="text-lg font-semibold text-gray-900">Formato</h3>
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
        <div className="space-y-3">
          {visibleFormats.map((cat) => (
            <label
              key={cat.id}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={selected.includes(cat.id)}
                onChange={() => handleChange(cat.id)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 group-hover:text-gray-900">
                {cat.label}
              </span>
            </label>
          ))}

          {formats.length > INITIAL_VISIBLE_FORMATS && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              {showAll ? "Mostrar menos..." : "Mostrar más..."}
            </button>
          )}

          <button
            onClick={() => {
              clearFilters(["format"]);
            }}
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

export default FormatFilter;
