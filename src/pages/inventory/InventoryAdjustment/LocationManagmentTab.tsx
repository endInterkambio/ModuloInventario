import { useEffect, useState } from "react";
import { useBooks } from "@/hooks/useBooks";
import { useBookStore } from "@/stores/useBookStore";
import { InfoRow } from "../BookDetail/InfoRow";
import { TransferModal } from "./TransferModal";
import { BookDTO } from "@/types/BookDTO";
import PaginationBar from "@components/shared/pagination/PaginationBar";

interface Props {
  searchTerm: string;
}

export function LocationManagementTab({ searchTerm }: Props) {
  const {
    currentPage,
    books: storeBooks,
    setBooks,
    sortOrder,
    itemsPerPage,
  } = useBookStore();

  const [transferData, setTransferData] = useState<{
    book: BookDTO;
    fromLocationId: number;
  } | null>(null);

  // Hook para obtener libros desde backend
  const {
    data,
    isLoading: booksLoading,
    isError,
  } = useBooks(0, 100, sortOrder, searchTerm);

  useEffect(() => {
    if (!data) return;
    setBooks(data);
  }, [data, setBooks]);

  // 1. Ordena ubicaciones de cada libro
  const booksWithSortedLocations = (storeBooks ?? []).map((book) => ({
    ...book,
    locations: [...(book.locations ?? [])].sort(
      (a, b) =>
        new Date(b.lastUpdatedAt || 0).getTime() -
        new Date(a.lastUpdatedAt || 0).getTime()
    ),
  }));

  // 2. Filtra solo libros con ubicaciones
  const booksWithLocations = booksWithSortedLocations.filter(
    (book) => book.locations && book.locations.length > 0
  );

  // 3. Aplica paginación sobre los libros filtrados
  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedBooks = booksWithLocations.slice(
    startIdx,
    startIdx + itemsPerPage
  );

  // Función para abrir modal de transferencia
  const openTransferModal = (bookSku: string, fromLocationId: number) => {
    const book = storeBooks.find((b) => b.sku === bookSku);
    if (!book) return;
    setTransferData({ book, fromLocationId });
  };

  // Función para cerrar modal
  const closeTransferModal = () => {
    setTransferData(null);
  };

  return (
    <div className="bg-white border rounded-lg shadow-sm p-4">
      <h2 className="text-lg font-semibold mb-4">Gestión de Ubicaciones</h2>
      <div className="text-sm text-gray-500 mb-4">
        Esta funcionalidad permite gestionar la ubicación específica de cada
        libro dentro de los almacenes.
      </div>

      {booksLoading ? (
        <div className="text-center text-gray-500 py-10">Cargando...</div>
      ) : isError ? (
        <div className="text-center text-red-500 py-10">
          Error al cargar datos
        </div>
      ) : searchTerm.trim() === "" ? (
        <div className="text-center text-gray-500 py-10">
          Ingrese el libro a editar en la barra de búsqueda para mostrar
          resultados
        </div>
      ) : booksWithLocations.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          No se encontraron resultados para "<strong>{searchTerm}</strong>".
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="text-gray-500 uppercase border-b">
                <tr className="text-left">
                  <th className="py-2">Libro</th>
                  <th className="py-2">Almacén</th>
                  <th className="py-2">Ubicación específica</th>
                  <th className="py-2">Stock</th>
                  <th className="py-2">Estante</th>
                  <th className="py-2">Piso</th>
                  <th className="py-2">Condición</th>
                  <th className="py-2">Última actualización</th>
                  <th className="py-2">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {paginatedBooks.map((book) =>
                  book.locations.map((loc) => (
                    <tr key={`${book.id}-${loc.id}`} className="align-top">
                      <td className="py-4 pr-4">
                        <div className="flex gap-4">
                          <div className="w-12 h-16 bg-gray-200 rounded" />
                          <div>
                            <div className="w-80 font-medium text-gray-800 truncate">
                              {book.title}
                            </div>
                            <div className="text-xs text-gray-500">
                              SKU: {book.sku}
                            </div>
                            <div className="text-xs text-gray-500">
                              ISBN: {book.isbn}
                            </div>
                            <div className="text-xs text-gray-400">
                              {book.author}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 text-gray-700">
                        <InfoRow
                          key={loc.warehouse.id}
                          className="py-4 w-16"
                          label=""
                          value={loc.warehouse.name || "-"}
                        />
                      </td>
                      <td className="py-4 text-sm text-gray-700">
                        <InfoRow
                          className="py-4 w-16"
                          label=""
                          value={loc.locationType}
                        />
                      </td>
                      <td className="py-4 text-sm text-gray-700">
                        <InfoRow
                          className="py-4 w-16"
                          label=""
                          value={loc.stock}
                        />
                      </td>
                      <td className="py-4 text-sm text-gray-700">
                        <InfoRow
                          className="py-4 w-16"
                          label=""
                          value={loc.bookcase}
                        />
                      </td>
                      <td className="py-4 text-sm text-gray-700">
                        <InfoRow
                          className="py-4 w-16"
                          label=""
                          value={loc.bookcaseFloor}
                        />
                      </td>
                      <td className="py-4 text-sm text-gray-700">
                        <InfoRow
                          className="py-4 w-16"
                          label=""
                          value={loc.bookCondition || "-"}
                        />
                      </td>
                      <td className="py-4 text-sm text-gray-700">
                        <InfoRow
                          className="py-4"
                          label=""
                          value={
                            loc.lastUpdatedAt
                              ? new Date(loc.lastUpdatedAt).toLocaleString()
                              : "-"
                          }
                        />
                      </td>
                      <td className="flex items-center justify-center h-20">
                        <button
                          className="px-4 py-1 bg-blue-500 text-white rounded text-sm"
                          onClick={() => openTransferModal(book.sku, loc.id)}
                        >
                          Transferir
                        </button>
                      </td>
                    </tr>
                  ))
                )}
                {/*
                  // TODO: Integrar la creación de ubicaciones para libros sin stock.
                  // Por ahora, los libros sin ubicaciones no se muestran.
                */}
              </tbody>
            </table>
          </div>

          <div className="mt-4 text-sm text-gray-500">
            {booksWithLocations.length} libros encontrados con ubicación existente
          </div>
          <PaginationBar />
        </>
      )}

      {/* Modal de transferencia */}
      {transferData && (
        <TransferModal
          isOpen={!!transferData}
          onClose={closeTransferModal}
          fromLocationId={transferData.fromLocationId}
          book={transferData.book}
        />
      )}
    </div>
  );
}
