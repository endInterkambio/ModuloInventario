import BookCard from "@/components/shared/cards/BookCard";
import PaginationBar from "@/components/shared/pagination/PaginationBar";
import { useBooks } from "@/hooks/useBooks";
import { useBookStore } from "@/stores/useBookStore";
import HeaderNavigation from "@components/shared/HeaderNavigation";
import { useEffect } from "react";

const InventoryPage = () => {
  const { data: books, isLoading, isError } = useBooks();
  const { setBooks, getPaginatedBooks } = useBookStore();

  // Inyectar libros del backend a la store cuando se carguen
  useEffect(() => {
    if (books) {
      setBooks(books);
    }
  }, [books, setBooks])

  const paginatedBooks = getPaginatedBooks();

  if (isLoading) return <div className="p-8">Cargando libros...</div>;
  if (isError) return <div className="p-8 text-red-600">Error al cargar libros.</div>;

  return (
    <>
      <HeaderNavigation />
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow p-6">
          
          {/* Lista de libros paginados */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
            {paginatedBooks.length > 0 ? (
              paginatedBooks.map((book) => (
                <BookCard key={book.sku} book={book}></BookCard>
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
    </>
  );
};

export default InventoryPage;
