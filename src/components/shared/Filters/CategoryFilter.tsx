import { useState } from "react";
import { ChevronUp, ChevronDown, LucideBrushCleaning } from "lucide-react";
import { useBookStore } from "@/stores/useBookStore";

const CATEGORIES = [
  { id: "art", label: "Art" },
  { id: "action", label: "Action & Adventure" },
  { id: "biography", label: "Biography & Autobiography" },
  { id: "board", label: "Board Books" },
  { id: "children", label: "Children" },
  { id: "comics", label: "Comics & Graphic Novels" },
  { id: "fiction", label: "Fiction" },
  { id: "health", label: "Health" },
  { id: "history", label: "History & Geography" },
  { id: "religion", label: "Inspirationals" },
  { id: "learning", label: "Learning" },
  { id: "music", label: "Music" },
  { id: "novels", label: "Novels" },
];

const INITIAL_VISIBLE_CATEGORIES = 8;

const CategoryFilter = () => {
  const [showAll, setShowAll] = useState(false);
  const [expanded, setExpanded] = useState(true);

  const { filters, setFilters, clearFilters } = useBookStore();

  // Convert selected categories to a string for the store
  const selected = filters.categories
    ? filters.categories.split(",").filter(Boolean)
    : [];

  const handleChange = (id: string) => {
    const newSelected = selected.includes(id)
      ? selected.filter((c) => c !== id)
      : [...selected, id];

    // guardar como string en el store
    setFilters({ categories: newSelected.join(",") });
  };

  const visibleCategories = showAll
    ? CATEGORIES
    : CATEGORIES.slice(0, INITIAL_VISIBLE_CATEGORIES);

  return (
    <div className="mb-8">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center justify-between w-full text-left mb-4 group"
      >
        <h3 className="text-lg font-semibold text-gray-900">Category</h3>
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
          {visibleCategories.map((cat) => (
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

          {CATEGORIES.length > INITIAL_VISIBLE_CATEGORIES && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              {showAll ? "Mostrar menos..." : "Mostrar más..."}
            </button>
          )}

          <button
            onClick={() => {
              clearFilters(["categories"]);
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

export default CategoryFilter;
