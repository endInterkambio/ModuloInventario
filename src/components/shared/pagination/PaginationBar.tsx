import { useBookStore } from "@/stores/useBookStore";
import { useEffect, useState } from "react";

const PaginationBar = () => {
  const {
    currentPage,
    totalPages,
    filteredBooks,
    itemsPerPage,
    setCurrentPage,
    setItemsPerPage,
  } = useBookStore();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const totalItems = filteredBooks.length;

  // Manejar clics en los números de página
  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Generar números de página para mostrar
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5; // Ajusta este número para mostrar más/menos números de página
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = startPage + maxVisiblePages - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Siempre mostrar la primera página
    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) {
        pages.push("...");
      }
    }

    // Agregar números de página en el rango
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // Siempre mostrar la última página
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push("...");
      }
      pages.push(totalPages);
    }

    return pages;
  };

  // Solo renderizar en el cliente para evitar hidratación
  if (!isClient) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 px-2 py-2 text-sm text-gray-700 w-full">
      <div className="text-sm relative group">
        <div className="flex items-center gap-1">
          Recuento total: <span className="font-medium">{totalItems}</span>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <select
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(Number(e.target.value))}
          className="border rounded px-2 py-1 text-sm w-full sm:w-auto"
        >
          {[12, 24, 48, 96].map((option) => (
            <option key={option} value={option}>
              {option} por página
            </option>
          ))}
        </select>

        <div className="flex items-center gap-1 flex-wrap">
          <button
            onClick={() => handlePageClick(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-2 py-1 border rounded disabled:opacity-30 flex-shrink-0"
            aria-label="Página anterior"
          >
            ‹
          </button>

          <div className="flex items-center gap-1 flex-wrap">
            {getPageNumbers().map((page, index) => (
              <button
                key={index}
                onClick={() =>
                  typeof page === "number" && handlePageClick(page)
                }
                className={`px-2 py-1 border rounded min-w-[28px] sm:min-w-[32px] text-center ${
                  page === currentPage
                    ? "bg-blue-600 text-white border-blue-600"
                    : "hover:bg-gray-100"
                }`}
                disabled={page === "..."}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => handlePageClick(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-2 py-1 border rounded disabled:opacity-30 flex-shrink-0"
            aria-label="Página siguiente"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaginationBar;
