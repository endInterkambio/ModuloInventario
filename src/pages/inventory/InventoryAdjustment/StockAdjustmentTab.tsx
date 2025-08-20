import { useState, useEffect } from "react";
import { Layers, MapPin, Warehouse, Pencil, Check, X } from "lucide-react";
import toast from "react-hot-toast";
import { useBookStore } from "@/stores/useBookStore";
import { useBooks } from "@/hooks/useBooks";
import { useCreateStockAdjustment } from "@/hooks/useCreateStockAdjustment";
import PaginationBar from "@components/shared/pagination/PaginationBar";

interface Props {
  searchTerm: string;
}

export default function InventoryAdjustmentTab({ searchTerm }: Props) {
  const {
    currentPage,
    books: storeBooks,
    setBooks,
    sortOrder,
    itemsPerPage,
  } = useBookStore();

  const { data, isLoading, isError } = useBooks(
    currentPage - 1,
    itemsPerPage,
    sortOrder,
    searchTerm
  );

  const { mutate: createStockAdjustment, isPending } =
    useCreateStockAdjustment();

  // Sincronizar store si cambian los resultados
  useEffect(() => {
    if (data) {
      setBooks(data);
    }
  }, [data, setBooks]);

  const books = storeBooks ?? [];

  // Estados locales de edición
  const [editingLocationId, setEditingLocationId] = useState<number | null>(
    null
  );
  const [editingBookId, setEditingBookId] = useState<number | null>(null);
  const [tempStock, setTempStock] = useState<number | null>(null);
  const [tempReason, setTempReason] = useState<string>("");
  const [newQuantity, setNewQuantity] = useState<number | null>(null);

  // Cuando cambie nueva cantidad → calculo el ajuste
  const handleNewQuantityChange = (valueStr: string, currentStock: number) => {
    if (valueStr === "") {
      setNewQuantity(null);
      setTempStock(null);
      return;
    }
    const value = Number(valueStr);
    if (Number.isNaN(value)) return;
    setNewQuantity(value);
    setTempStock(value - currentStock);
  };

  //Si cambia AJUSTE (+/-): nueva = actual + ajuste
  const handleAdjustmentChange = (valueStr: string, currentStock: number) => {
    if (valueStr === "") {
      setTempStock(null);
      setNewQuantity(null);
      return;
    }
    const value = Number(valueStr);
    if (Number.isNaN(value)) return;
    setTempStock(value); // puede ser negativo o positivo
    setNewQuantity(currentStock + value); // preview
  };

  const startEditing = (bookId: number, locationId: number) => {
    setEditingLocationId(locationId);
    setEditingBookId(bookId);
    setTempStock(null); // vacío
    setNewQuantity(null); // vacío
    setTempReason(""); // reset motivo cada vez
  };

  const cancelEditing = () => {
    setEditingLocationId(null);
    setEditingBookId(null);
    setTempStock(null);
    setNewQuantity(null);
    setTempReason("");
  };

  // Validación: permitir negativos, pero no dejar stock final < 0
  const saveStock = (
    bookSku: string,
    locationId: number,
    currentStock: number
  ) => {
    if (editingBookId === null || editingLocationId === null) return;
    if (tempStock === null) {
      toast.error("Ingrese una cantidad ajustada o la nueva cantidad.");
      return;
    }
    if (tempReason.trim() === "") {
      toast.error("Debe ingresar un motivo");
      return;
    }
    if (currentStock + tempStock < 0) {
      toast.error("No puedes restar más stock del que tienes");
      return;
    }

    createStockAdjustment(
      {
        bookSku,
        locationId,
        adjustmentQuantity: tempStock, // puede ser negativo o positivo
        reason: tempReason,
        performedBy: { id: 10, name: "Admin" },
      },
      { onSuccess: () => cancelEditing() }
    );
  };

  if (isLoading)
    return <div className="text-center text-gray-500 py-10">Cargando...</div>;
  if (isError)
    return (
      <div className="text-center text-red-500 py-10">
        Error al cargar datos
      </div>
    );
  if (searchTerm.trim() === "")
    return (
      <div className="text-center text-gray-500 py-10">
        Ingrese el libro a editar en la barra de búsqueda para mostrar
        resultados
      </div>
    );
  if (books.length === 0)
    return (
      <div className="text-center text-gray-500 py-10">
        No se encontraron resultados para "<strong>{searchTerm}</strong>"
      </div>
    );

  return (
    <div className="bg-white border rounded-lg shadow-sm p-4">
      <h2 className="text-lg font-semibold mb-4">Ajuste de Stock</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="text-gray-500 uppercase border-b">
            <tr className="text-left">
              <th className="py-2">Libro</th>
              <th className="py-2">Último stock</th>
              <th className="py-2">Stock Actual</th>
              <th className="py-2">Nueva cantidad</th>
              <th className="py-2">Cantidad ajustada</th>
              <th className="py-2">Motivo del ajuste</th>
              <th className="py-2">Ubicación</th>
              <th className="py-2">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {books.map((book) =>
              book.locations && book.locations.length > 0 ? (
                book.locations
                .sort((a, b) =>b.stock - a.stock) // Ordenar por stock descendente
                .map((location) => {
                  const isEditing = editingLocationId === location.id;
                  const stockValue = isEditing
                    ? tempStock ?? 0
                    : location.stock;
                  const stockColor =
                    stockValue == null
                      ? ""
                      : stockValue === 0
                      ? "bg-red-100 text-red-600"
                      : stockValue > 10
                      ? "bg-purple-100 text-purple-600"
                      : "bg-green-100 text-green-600";

                  return (
                    <tr key={`${book.id}-${location.id}`} className="align-top">
                      {/* Libro */}
                      <td className="py-4 pr-4">
                        <div className="flex gap-4">
                          <div className="w-12 h-16 bg-gray-200 rounded" />
                          <div>
                            <div className="w-80 font-medium text-gray-800 truncate">
                              {book.title}
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
                      {/* Último stock */}
                      <td className="py-4 text-gray-700">
                        {location.lastStock ?? "-"}
                      </td>
                      {/* Stock actual */}
                      <td className="py-4">
                        <span
                          className={`px-2 py-1 rounded text-xs ${stockColor}`}
                        >
                          {location.stock}
                        </span>
                      </td>
                      {/* Nueva cantidad */}
                      <td className="py-4">
                        {isEditing ? (
                          <input
                            type="number"
                            min={0}
                            value={newQuantity === null ? "" : newQuantity}
                            placeholder={location.stock.toString()}
                            onChange={(e) =>
                              handleNewQuantityChange(
                                e.target.value,
                                location.stock
                              )
                            }
                            className="w-20 text-center border border-gray-300 rounded px-1 py-0.5 text-sm"
                            disabled={isPending}
                          />
                        ) : (
                          <span>-</span>
                        )}
                      </td>
                      {/* Cantidad ajustada (±) */}
                      <td className="py-4">
                        {isEditing ? (
                          <input
                            type="number"
                            step="1"
                            value={tempStock === null ? "" : tempStock}
                            placeholder="±0"
                            onChange={(e) =>
                              handleAdjustmentChange(
                                e.target.value,
                                location.stock
                              )
                            }
                            onKeyDown={(e) => {
                              if (e.key === "Enter")
                                saveStock(
                                  book.sku,
                                  location.id,
                                  location.stock
                                );
                              if (e.key === "Escape") cancelEditing();
                            }}
                            className="w-20 text-center border border-gray-300 rounded px-1 py-0.5 text-sm"
                            autoFocus
                            disabled={isPending}
                          />
                        ) : (
                          <span>-</span>
                        )}
                      </td>
                      {/* Motivo */}
                      <td className="py-4 text-gray-700">
                        {isEditing ? (
                          <input
                            type="text"
                            value={tempReason}
                            onChange={(e) => setTempReason(e.target.value)}
                            placeholder="Motivo del ajuste"
                            className="w-40 border border-gray-300 rounded px-2 py-1 text-sm"
                            disabled={isPending}
                          />
                        ) : (
                          <span className="text-gray-500 italic">-</span>
                        )}
                      </td>
                      {/* Ubicación */}
                      <td className="py-4 text-gray-600 text-xs">
                        <div className="flex items-center gap-1">
                          <Warehouse className="w-4 h-4" />
                          {location.warehouse.name}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          Estante: {location.bookcase}
                        </div>
                        <div className="flex items-center gap-1">
                          <Layers className="w-4 h-4" />
                          Piso: {location.bookcaseFloor}
                        </div>
                        <div className="text-xs mt-1">
                          Condición: {location.bookCondition} | Tipo:{" "}
                          {location.locationType}
                        </div>
                      </td>
                      {/* Acciones */}
                      <td className="py-4">
                        {isEditing ? (
                          <>
                            <button
                              onClick={() =>
                                saveStock(book.sku, location.id, location.stock)
                              }
                              className="text-green-600 hover:text-green-800 mr-2"
                              title="Guardar"
                              type="button"
                              disabled={isPending}
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button
                              onClick={cancelEditing}
                              className="text-gray-500 hover:text-gray-700"
                              title="Cancelar"
                              type="button"
                              disabled={isPending}
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => startEditing(book.id, location.id)}
                            className="flex items-center text-blue-600 text-sm hover:underline"
                            type="button"
                          >
                            <Pencil className="w-4 h-4 mr-1" />
                            Ajustar
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr key={book.id} className="align-top">
                  {/* Libro */}
                  <td className="py-4 pr-4">
                    <div className="flex gap-4">
                      <div className="w-12 h-16 bg-gray-200 rounded" />
                      <div>
                        <div className="w-80 font-medium text-gray-800 truncate">
                          {book.title}
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
                  {/* Último stock */}
                  <td className="py-4 text-gray-700">-</td>
                  {/* Stock actual */}
                  <td className="py-4">
                    <span className="px-2 py-1 rounded text-xs bg-gray-100 text-gray-600">
                      Sin stock
                    </span>
                  </td>
                  {/* Nueva cantidad */}
                  <td className="py-4">
                    <span>-</span>
                  </td>
                  {/* Cantidad ajustada (±) */}
                  <td className="py-4">
                    <span>-</span>
                  </td>
                  {/* Motivo */}
                  <td className="py-4 text-gray-700">
                    <span className="text-gray-500 italic">-</span>
                  </td>
                  {/* Ubicación */}
                  <td className="py-4 text-gray-600 text-xs">
                    <span className="text-gray-500 italic">Sin ubicación</span>
                  </td>
                  {/* Acciones */}
                  <td className="py-4">
                    <button
                      onClick={() => startEditing(book.id, -1)}
                      className="flex items-center text-blue-600 text-sm hover:underline"
                      type="button"
                    >
                      <Pencil className="w-4 h-4 mr-1" />
                      Ajustar
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
      <PaginationBar />
    </div>
  );
}
