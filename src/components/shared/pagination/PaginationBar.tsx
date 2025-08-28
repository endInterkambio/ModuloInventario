import { useBookStore } from "@/stores/useBookStore";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

  // Generar un rango de páginas visibles (ej: [1,2,3,...,10])
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, "...", totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 mt-6">
      {/* Información de ítems */}
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        >
          Next
        </button>
      </div>

      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Mostrando <span className="font-medium">{start}</span> a{" "}
            <span className="font-medium">{end}</span> de{" "}
            <span className="font-medium">{totalElements}</span> resultados
          </p>
        </div>

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

          {/* Botones de paginación */}
          <nav aria-label="Pagination" className="isolate inline-flex -space-x-px rounded-md shadow-sm">
            {/* Botón anterior */}
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 hover:bg-gray-50 disabled:opacity-50"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Números de páginas */}
            {getPageNumbers().map((page, idx) =>
              page === "..." ? (
                <span
                  key={idx}
                  className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700"
                >
                  ...
                </span>
              ) : (
                <button
                  key={idx}
                  onClick={() => setCurrentPage(Number(page))}
                  className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 focus:outline-offset-0 ${
                    currentPage === page
                      ? "z-10 bg-[var(--color-secondary)]"
                      : "text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  {page}
                </button>
              )
            )}

            {/* Botón siguiente */}
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 hover:bg-gray-50 disabled:opacity-50"
            >
              <span className="sr-only">Next</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default PaginationBar;
