import BookCard from "@/components/shared/cards/BookCard";
import PaginationBar from "@/components/shared/pagination/PaginationBar";
import { useBookStore } from "@/stores/useBookStore";

const InventoryPage = () => {
  const { getPaginatedBooks } = useBookStore();
  const paginatedBooks = getPaginatedBooks();

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow p-6">
        <h2 className="text-xl font-semibold mb-6">Todos los artículos</h2>

        {/* Lista de libros paginados */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
          {paginatedBooks.length > 0 ? (
            paginatedBooks.map((book) => (
              <BookCard key={book.SKU ?? book.ItemName} book={book} />
            ))
          ) : (
            <div className="col-span-full text-center py-10 text-gray-500">
              No se encontraron artículos
            </div>
          )}
        </div>
      </div>

      {/* Barra de paginación en la parte inferior */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="w-full overflow-x-auto">
          <div className="min-w-max sm:min-w-0">
            <PaginationBar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryPage;
