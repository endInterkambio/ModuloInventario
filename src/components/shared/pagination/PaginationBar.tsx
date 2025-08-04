import { useBookStore } from "@/stores/useBookStore";

const PaginationBar = () => {
  const {
    currentPage,
    totalPages,
    filteredBooks,
    itemsPerPage,
    setCurrentPage,
    setItemsPerPage,
  } = useBookStore();

  const totalItems = filteredBooks.length;
  const start = (currentPage - 1) * itemsPerPage + 1;
  const end = Math.min(start + itemsPerPage - 1, totalItems);

  return (
    <div className="flex items-center justify-between mt-6 px-2 text-sm text-gray-700">
      <span>
        Recuento total: <button className="text-blue-600 underline">Ver</button>
      </span>

      <div className="flex items-center gap-2">
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

        <div className="whitespace-nowrap">
          {start} - {end}
        </div>

        <button
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="px-2 disabled:opacity-50"
        >
          ‹
        </button>

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
