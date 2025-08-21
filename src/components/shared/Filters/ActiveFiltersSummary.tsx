import { FilterState } from "./FilterSidebar";

interface Props {
  filterState: FilterState;
}

const ActiveFiltersSummary = ({ filterState }: Props) => {
  const hasActiveFilters =
    filterState.selectedCategories.length > 0 ||
    filterState.minPrice !== "" ||
    filterState.maxPrice !== "";

  if (!hasActiveFilters) return null;

  return (
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
            Precio: {filterState.minPrice || "0"} - {filterState.maxPrice || "∞"}
          </p>
        )}
      </div>
    </div>
  );
};

export default ActiveFiltersSummary;
