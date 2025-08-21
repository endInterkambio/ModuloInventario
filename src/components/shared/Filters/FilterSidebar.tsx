import ClearFilters from "./ClearFilters";
import CategoryFilter from "./CategoryFilter";
import PriceFilter from "./PriceFilter";
import ActiveFiltersSummary from "./ActiveFiltersSummary";
import { useBookStore } from "@/stores/useBookStore";
import FormatFilter from "./FormatFilter";

const FilterSidebar = () => {
  const { filters, clearFilters } = useBookStore();

  const hasActiveFilters =
    (filters.categories && filters.categories.length > 0) ||
    filters.minPrice !== undefined ||
    filters.maxPrice !== undefined;

  return (
    <div className="w-80 bg-white border-r border-gray-200 h-full p-6 overflow-y-auto">
      <div className="space-y-6">
        <ClearFilters
          clearAll={clearFilters}
          hasActiveFilters={hasActiveFilters}
        />

        <div className="h-px bg-gray-200"></div>

        <CategoryFilter />

        <div className="h-px bg-gray-200"></div>

        <PriceFilter />

        <div className="h-px bg-gray-200"></div>

        <FormatFilter />
      </div>

      <ActiveFiltersSummary filters={filters} />
    </div>
  );
};

export default FilterSidebar;
