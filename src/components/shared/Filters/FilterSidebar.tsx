import { useState } from "react";
import ClearFilters from "./ClearFilters";
import CategoryFilter from "./CategoryFilter";
import PriceFilter from "./PriceFilter";
import ActiveFiltersSummary from "./ActiveFiltersSummary";

// Tipos
export interface FilterState {
  selectedCategories: string[];
  minPrice: string;
  maxPrice: string;
}

const FilterSidebar = () => {
  const [filterState, setFilterState] = useState<FilterState>({
    selectedCategories: [],
    minPrice: "",
    maxPrice: "",
  });

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

  return (
    <div className="w-80 bg-white border-r border-gray-200 h-full p-6 overflow-y-auto">
      <div className="space-y-6">
        <ClearFilters clearAll={clearAllFilters} hasActiveFilters={hasActiveFilters} />

        <div className="h-px bg-gray-200"></div>

        <CategoryFilter
          selected={filterState.selectedCategories}
          onChange={(categories) =>
            setFilterState((prev) => ({ ...prev, selectedCategories: categories }))
          }
        />

        <div className="h-px bg-gray-200"></div>

        <PriceFilter
          minPrice={filterState.minPrice}
          maxPrice={filterState.maxPrice}
          onChange={(field, value) =>
            setFilterState((prev) => ({ ...prev, [field]: value }))
          }
        />
      </div>

      <ActiveFiltersSummary filterState={filterState} />
    </div>
  );
};

export default FilterSidebar;
