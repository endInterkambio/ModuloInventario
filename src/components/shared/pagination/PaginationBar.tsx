import { useBookStore } from "@/stores/useBookStore";

const PaginationBar = () => {
  const {
    currentPage,
    totalPages,
    totalElements,
    itemsPerPage,
    setCurrentPage,
    setItemsPerPage,
  } = useBookStore();

  const start = totalElements === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const end = Math.min(start + itemsPerPage - 1, totalElements);

  return (
    <div className="flex items-center justify-between mt-6 px-2 text-sm text-gray-700">
      <span>
        Recuento total:{" "}
        <span className="text-blue-600 underline cursor-pointer">
          {totalElements}
        </span>
      </span>

      <div className="flex items-center gap-2">
        {/* Selector de cantidad por página */}
        <select
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(Number(e.target.value))}
          className="border rounded px-2 py-1 text-sm"
        >
          {[12, 24, 48, 96].map((option) => (
            <option key={option} value={option}>
              {option} por página
            </option>
          ))}
        </select>

        {/* Rango de ítems visibles */}
        <div className="whitespace-nowrap">
          {start} - {end}
        </div>

        {/* Botón anterior */}
        <button
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="px-2 disabled:opacity-50"
        >
          ‹
        </button>

        {/* Botón siguiente */}
        <button
          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="px-2 disabled:opacity-50"
        >
          ›
        </button>
      </div>
    </div>
  );
};

export default PaginationBar;
