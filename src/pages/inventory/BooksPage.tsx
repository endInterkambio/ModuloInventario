import { useEffect } from "react";
import { useBooks } from "@/hooks/useBooks";
import { useBookStore } from "@/stores/useBookStore";
import BookCard from "@/components/shared/cards/BookCard";
import PaginationBar from "@/components/shared/pagination/PaginationBar";
import HeaderNavigation from "@components/HeaderNavigation/HeaderNavigation";
import FilterSidebar from "@components/shared/Filters/FilterSidebar";
import { Outlet, useLocation } from "react-router-dom";

const BooksPage = () => {
  const {
    currentPage,
    books: storeBooks,
    setBooks,
    sortOrder,
    itemsPerPage,
    searchTerm,
    minStock,
    maxStock,
  } = useBookStore();

  const { data, isLoading, isError } = useBooks(
    currentPage - 1,
    itemsPerPage,
    sortOrder,
    searchTerm,
    minStock,
    maxStock
  );

  const location = useLocation();
  const isNewBook = location.pathname.endsWith("/new");
  const isDetailView = location.pathname.match(/^\/dashboard\/inventory\/.+$/);

  // Sincroniza libros solo si cambia realmente la página o contenido
  useEffect(() => {
    if (data) setBooks(data);
  }, [data, setBooks]);

  const paginatedBooks = storeBooks ?? [];

  if (isLoading) return <div className="p-8">Cargando libros...</div>;
  if (isError)
    return <div className="p-8 text-red-600">Error al cargar libros.</div>;

  return (
    <>
      {!isDetailView && <HeaderNavigation />}

      <div className="flex min-h-screen">
        {/* Mostrar sidebar solo si no es detalle */}
        {!isDetailView && <FilterSidebar />}

        <div className={`flex-grow w-96 px-6 ${isDetailView ? "mx-auto" : ""}`}>
          {/* Mostrar paginación solo si no es detalle */}
          {!isDetailView && (
            <div className="container mx-auto pb-4">
                <PaginationBar />
            </div>
          )}
          {isDetailView || isNewBook ? (
            <Outlet /> // BookDetailPage o BookCreationForm
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
              {paginatedBooks.length > 0 ? (
                paginatedBooks.map((book) => (
                  <BookCard key={book.sku} book={book} />
                ))
              ) : (
                <div className="col-span-full text-center py-10 text-gray-500">
                  No se encontraron artículos
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BooksPage;
