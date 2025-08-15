// components/LocationManagementTab.tsx
import { useEffect, useState } from "react";
import { useBooks } from "@/hooks/useBooks";
import { useBookStore } from "@/stores/useBookStore";
import toast from "react-hot-toast";
import { updateLocationPartial } from "@/api/modules/bookLocations";
import { BookStockLocationDTO } from "@/types/BookDTO";
import { InfoRow } from "../BookDetail/InfoRow";

interface Props {
  searchTerm: string; // 🔹 Se recibe desde el padre
}

export function LocationManagementTab({ searchTerm }: Props) {
  const {
    currentPage,
    books: storeBooks,
    setBooks,
    sortOrder,
    itemsPerPage,
  } = useBookStore();

  const locationTypeOptions = [
    "SHOWROOM",
    "MAIN_STORAGE",
    "FAIR_STORAGE",
  ] as const;

  const conditionTypeOptions = [
    "A",
    "B",
    "C",
    "D",
    "X",
  ] as const;

  const [loadingLocationIds, setLoadingLocationIds] = useState<number[]>([]);

  const handleFieldChange = async (
    locId: number,
    field: keyof BookStockLocationDTO, // Tipo exacto de campos que puede tener loc
    value: string | number | null
  ) => {
    setLoadingLocationIds((prev) => [...prev, locId]);
    try {
      await updateLocationPartial(locId, { [field]: value });

      // Actualizar en store
      useBookStore.setState((state) => {
        const updatedBooks = state.books.map((book) => ({
          ...book,
          locations: book.locations?.map((loc) =>
            loc.id === locId
              ? {
                  ...loc,
                  [field]: value,
                  lastUpdatedAt: new Date().toISOString(),
                }
              : loc
          ),
        }));
        return { ...state, books: updatedBooks };
      });

      toast.success("Ubicación actualizada");
    } catch (error) {
      console.error(error);
      toast.error("Error al actualizar ubicación");
    } finally {
      setLoadingLocationIds((prev) => prev.filter((id) => id !== locId));
    }
  };

  // Obtener datos filtrados desde el backend usando searchTerm
  const {
    data,
    isLoading: booksLoading,
    isError,
  } = useBooks(currentPage - 1, itemsPerPage, sortOrder, searchTerm);

  // Sincronizar store solo si cambian los resultados
  useEffect(() => {
    if (!data) return;

    const currentStoreBooks = useBookStore.getState().books;
    const isSame =
      JSON.stringify(currentStoreBooks) === JSON.stringify(data.content);

    if (!isSame) {
      setBooks(data);
    }
  }, [data, setBooks]);

  const paginatedBooks = storeBooks ?? [];
  const totalLocations = paginatedBooks.reduce(
    (acc, book) => acc + (book.locations?.length || 0),
    0
  );

  return (
    <div className="bg-white border rounded-lg shadow-sm p-4">
      <h2 className="text-lg font-semibold mb-4">Gestión de Ubicaciones</h2>
      <div className="text-sm text-gray-500 mb-4">
        Esta funcionalidad permite gestionar la ubicación específica de cada
        libro dentro de los almacenes.
      </div>

      {/* Estados vacíos o error */}
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
      ) : totalLocations === 0 ? (
        <div className="text-center text-gray-500 py-10">
          No se encontraron resultados para "<strong>{searchTerm}</strong>".
        </div>
      ) : (
        <>
          {/* Tabla */}
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="text-gray-500 uppercase border-b">
                <tr className="text-left">
                  <th className="py-2">Libro</th>
                  <th className="py-2">Almacén</th>
                  <th className="py-2">Ubicación específica</th>
                  <th className="py-2">Estante</th>
                  <th className="py-2">Piso</th>
                  <th className="py-2">Condición</th>
                  <th className="py-2">Última actualización</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {paginatedBooks.map((book) =>
                  book.locations?.map((loc) => (
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
                        {loc.warehouse?.name ?? "-"}
                      </td>
                      {/* Select editable con isLoading por fila */}
                      <td className="py-3 text-sm text-gray-700">
                        <select
                          value={loc.locationType ?? ""}
                          onChange={(e) =>
                            handleFieldChange(
                              loc.id,
                              "locationType",
                              e.target.value
                            )
                          }
                          className="border px-2 py-1 rounded text-sm text-center"
                        >
                          <option value="" disabled>
                            Selecciona una opción
                          </option>
                          {locationTypeOptions.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                        {loadingLocationIds.includes(loc.id) && (
                          <span className="absolute right-2 top-1 text-xs text-gray-400 animate-pulse">
                            Guardando...
                          </span>
                        )}
                      </td>

                      <td className="text-center text-sm text-gray-700">
                        <InfoRow
                          className="py-4 w-16"
                          label=""
                          value={loc.bookcase}
                          editable
                          onSave={(val) =>
                            handleFieldChange(loc.id, "bookcase", val)
                          }
                        />
                      </td>

                      <td className="text-center text-sm text-gray-700">
                        <InfoRow
                          className="py-4 w-16"
                          label=""
                          value={loc.bookcaseFloor}
                          editable
                          onSave={(val) =>
                            handleFieldChange(loc.id, "bookcaseFloor", val)
                          }
                        />
                      </td>
                      <td className="py-3 text-sm text-gray-700">
                        <select
                          value={loc.bookCondition ?? ""}
                          onChange={(e) =>
                            handleFieldChange(
                              loc.id,
                              "bookCondition",
                              e.target.value
                            )
                          }
                          className="border px-2 py-1 rounded text-sm text-center w-20"
                        >
                          <option value="" disabled>
                            Selecciona una opción
                          </option>
                          {conditionTypeOptions.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                        {loadingLocationIds.includes(loc.id) && (
                          <span className="absolute right-2 top-1 text-xs text-gray-400 animate-pulse">
                            Guardando...
                          </span>
                        )}
                      </td>
                      <td className="py-4 text-gray-700">
                        {new Date(loc.lastUpdatedAt).toLocaleString() ?? "-"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Total */}
          <div className="mt-4 text-sm text-gray-500">
            {totalLocations} ubicaciones encontradas
          </div>
        </>
      )}
    </div>
  );
}
