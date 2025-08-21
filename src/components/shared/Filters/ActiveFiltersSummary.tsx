import { BookFilters } from "@/stores/useBookStore";

interface Props {
  filters: BookFilters;
}

const ActiveFiltersSummary = ({ filters }: Props) => {
  const hasActiveFilters =
    (filters.categories && filters.categories.trim() !== "") ||
    filters.minPrice !== undefined ||
    filters.maxPrice !== undefined;

  if (!hasActiveFilters) return null;

  return (
    <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
      <h4 className="font-medium text-blue-900 mb-2">Filtros activos:</h4>
      <div className="space-y-1 text-sm text-blue-800">
        {filters.categories  && (
          <p>
            Categorías: {" "}
            {
              filters.categories
              .split(",")
              .filter((c) => c.trim() !== "").length
            }{" "}
            seleccionada(s)
          </p>
        )}
        {(filters.minPrice !== undefined || filters.maxPrice !== undefined) && (
          <p>
            Precio: {filters.minPrice ?? 0} - {filters.maxPrice ?? "∞"}
          </p>
        )}
      </div>
    </div>
  );
};

export default ActiveFiltersSummary;
