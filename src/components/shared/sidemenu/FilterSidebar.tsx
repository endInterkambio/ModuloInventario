import { useState } from "react";
import { ChevronUp, ChevronDown, RotateCcw, Filter } from "lucide-react";

// Types
interface Category {
  id: string;
  label: string;
  count?: number;
}

interface FilterState {
  selectedCategories: string[];
  minPrice: string;
  maxPrice: string;
}

// Constants
const CATEGORIES: Category[] = [
  { id: "action", label: "Action & Adventure" },
  { id: "biography", label: "Biography & Autobiography" },
  { id: "board", label: "Board Books" },
  { id: "children", label: "Children" },
  // TODO: Add subcategories for children: children-fiction, children-nonfiction examples
  { id: "comics", label: "Comics & Graphic Novels" },
  { id: "fiction", label: "Fiction" },
  { id: "health", label: "Health" },
  { id: "history", label: "History & Geography" },
  { id: "religion", label: "Inspirationals" },
  { id: "learning", label: "Learning" },
  { id: "music", label: "Music" },
  { id: "novels", label: "Novels" },
  { id: "tweens-fiction", label: "Tweens Fiction" },
  { id: "tweens-nonfiction", label: "Tweens Nonfiction" },
  { id: "young-adult", label: "Young Adult Fiction" },
];

const INITIAL_VISIBLE_CATEGORIES = 8;

// Main Component
const FilterSidebar = () => {
  const [filterState, setFilterState] = useState<FilterState>({
    selectedCategories: [],
    minPrice: "",
    maxPrice: "",
  });

  const [showAllCategories, setShowAllCategories] = useState(false);
  const [isCategoryExpanded, setIsCategoryExpanded] = useState(true);
  const [isPriceExpanded, setIsPriceExpanded] = useState(true);

  // Event Handlers
  const handleCategoryChange = (categoryId: string) => {
    setFilterState((prev) => ({
      ...prev,
      selectedCategories: prev.selectedCategories.includes(categoryId)
        ? prev.selectedCategories.filter((id) => id !== categoryId)
        : [...prev.selectedCategories, categoryId],
    }));
  };

  const handlePriceChange = (field: "minPrice" | "maxPrice", value: string) => {
    setFilterState((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const clearAllFilters = () => {
    setFilterState({
      selectedCategories: [],
      minPrice: "",
      maxPrice: "",
    });
  };

  const hasActiveFilters =
    filterState.selectedCategories.length > 0 ||
    filterState.minPrice !== "" ||
    filterState.maxPrice !== "";

  // Render Functions
  const renderClearFilters = () => (
    <button
      onClick={clearAllFilters}
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

  const renderCategorySection = () => {
    const visibleCategories = showAllCategories
      ? CATEGORIES
      : CATEGORIES.slice(0, INITIAL_VISIBLE_CATEGORIES);

    return (
      <div className="mb-8">
        <button
          onClick={() => setIsCategoryExpanded(!isCategoryExpanded)}
          className="flex items-center justify-between w-full text-left mb-4 group"
        >
          <h3 className="text-lg font-semibold text-gray-900">Category</h3>
          {isCategoryExpanded ? (
            <ChevronUp
              size={20}
              className="text-gray-400 group-hover:text-gray-600 transition-colors"
            />
          ) : (
            <ChevronDown
              size={20}
              className="text-gray-400 group-hover:text-gray-600 transition-colors"
            />
          )}
        </button>

        {isCategoryExpanded && (
          <div className="space-y-3">
            {visibleCategories.map((category) => (
              <label
                key={category.id}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={filterState.selectedCategories.includes(
                      category.id
                    )}
                    onChange={() => handleCategoryChange(category.id)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 transition-all"
                  />
                </div>
                <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors select-none">
                  {category.label}
                </span>
              </label>
            ))}

            {CATEGORIES.length > INITIAL_VISIBLE_CATEGORIES && (
              <button
                onClick={() => setShowAllCategories(!showAllCategories)}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
              >
                {showAllCategories ? "Mostrar menos..." : "Mostrar más..."}
              </button>
            )}

            <button className="flex items-center gap-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg transition-colors">
              <Filter size={14} />
              Aplicar
            </button>
          </div>
        )}
      </div>
    );
  };

  const renderPriceSection = () => (
    <div className="mb-8">
      <button
        onClick={() => setIsPriceExpanded(!isPriceExpanded)}
        className="flex items-center justify-between w-full text-left mb-4 group"
      >
        <h3 className="text-lg font-semibold text-gray-900">PRICE</h3>
        {isPriceExpanded ? (
          <ChevronUp
            size={20}
            className="text-gray-400 group-hover:text-gray-600 transition-colors"
          />
        ) : (
          <ChevronDown
            size={20}
            className="text-gray-400 group-hover:text-gray-600 transition-colors"
          />
        )}
      </button>

      {isPriceExpanded && (
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Min S/.:
              </label>
              <input
                type="number"
                value={filterState.minPrice}
                onChange={(e) => handlePriceChange("minPrice", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="0"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max S/.:
              </label>
              <input
                type="number"
                value={filterState.maxPrice}
                onChange={(e) => handlePriceChange("maxPrice", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="1000"
              />
            </div>
          </div>

          <button className="flex items-center gap-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg transition-colors">
            <Filter size={14} />
            Aplicar
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="w-80 bg-white border-r border-gray-200 h-full p-6 overflow-y-auto">
      <div className="space-y-6">
        {renderClearFilters()}

        <div className="h-px bg-gray-200"></div>

        {renderCategorySection()}

        <div className="h-px bg-gray-200"></div>

        {renderPriceSection()}
      </div>

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h4 className="font-medium text-blue-900 mb-2">Filtros activos:</h4>
          <div className="space-y-1 text-sm text-blue-800">
            {filterState.selectedCategories.length > 0 && (
              <p>
                Categorías: {filterState.selectedCategories.length} seleccionada
              </p>
            )}
            {(filterState.minPrice || filterState.maxPrice) && (
              <p>
                Precio: {filterState.minPrice || "0"} -{" "}
                {filterState.maxPrice || "∞"}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterSidebar;
