import { useState, useEffect } from 'react';
import { Layers, MapPin, Warehouse, Pencil, Check, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { useBookStore } from '@/stores/useBookStore';
import { useBooks } from '@/hooks/useBooks';

interface Props {
  searchTerm: string; // 🔹 Recibimos desde el padre
}

export default function InventoryAdjustmentTab({ searchTerm }: Props) {
  const { currentPage, books: storeBooks, setBooks, sortOrder, itemsPerPage } =
    useBookStore();

  const { data, isLoading, isError } = useBooks(
    currentPage - 1,
    itemsPerPage,
    sortOrder,
    searchTerm
  );

  // Sincronizar store si cambian los resultados
  useEffect(() => {
    if (!data) return;
    const currentStoreBooks = useBookStore.getState().books;
    const isSame = JSON.stringify(currentStoreBooks) === JSON.stringify(data.content);
    if (!isSame) setBooks(data);
  }, [data, setBooks]);

  const books = storeBooks ?? [];

  // Estados locales de edición
  const [editingLocationId, setEditingLocationId] = useState<number | null>(null);
  const [editingBookId, setEditingBookId] = useState<number | null>(null);
  const [tempStock, setTempStock] = useState<number>(0);

  const startEditing = (bookId: number, locationId: number, currentStock: number) => {
    setEditingLocationId(locationId);
    setEditingBookId(bookId);
    setTempStock(currentStock);
  };

  const cancelEditing = () => {
    setEditingLocationId(null);
    setEditingBookId(null);
    setTempStock(0);
  };

  const saveStock = () => {
    if (editingBookId === null || editingLocationId === null) return;
    if (isNaN(tempStock) || tempStock < 0) {
      toast.error('Stock inválido');
      return;
    }
    toast.success('Stock actualizado');
    cancelEditing();
  };

  // TODO: Llamar último stock registrado desde backend
  const getOptimalRange = { return: '0' };

  if (isLoading) return <div className="text-center text-gray-500 py-10">Cargando...</div>;
  if (isError) return <div className="text-center text-red-500 py-10">Error al cargar datos</div>;
  if (searchTerm.trim() === "") return (
    <div className="text-center text-gray-500 py-10">
      Ingrese el libro a editar en la barra de búsqueda para mostrar resultados
    </div>
  );
  if (books.length === 0) return (
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
              <th className="py-2">Stock Actual</th>
              <th className="py-2">Último stock</th>
              <th className='py-2'>Motivo del ajuste</th>
              <th className="py-2">Ubicación</th>
              <th className="py-2">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {books.map(book =>
              book.locations?.map(location => {
                const isEditing = editingLocationId === location.id;
                const stockValue = isEditing ? tempStock : location.stock;
                const stockColor =
                  stockValue === 0
                    ? 'bg-red-100 text-red-600'
                    : stockValue > 10
                    ? 'bg-purple-100 text-purple-600'
                    : 'bg-green-100 text-green-600';

                return (
                  <tr key={`${book.id}-${location.id}`} className="align-top">
                    {/*Detalles del libro*/}
                    <td className="py-4 pr-4">
                      <div className="flex gap-4">
                        <div className="w-12 h-16 bg-gray-200 rounded" />
                        <div>
                          <div className="w-80 font-medium text-gray-800 truncate">{book.title}</div>
                          <div className="text-xs text-gray-500">ISBN: {book.isbn}</div>
                          <div className="text-xs text-gray-400">{book.author}</div>
                        </div>
                      </div>
                    </td>
                    {/*Stock actual*/}
                    <td className="py-4">
                      {isEditing ? (
                        <input
                          type="number"
                          value={tempStock}
                          onChange={e => setTempStock(parseInt(e.target.value) || 0)}
                          onKeyDown={e => { if (e.key === 'Enter') saveStock(); if (e.key === 'Escape') cancelEditing(); }}
                          onBlur={cancelEditing}
                          className="w-16 text-center border border-gray-300 rounded px-1 py-0.5 text-sm"
                          autoFocus
                        />
                      ) : (
                        <span className={`inline-block px-2 py-0.5 text-xs rounded-full font-semibold ${stockColor}`}>
                          {location.stock}
                        </span>
                      )}
                    </td>
                    {/*Último stock*/}
                    <td className="py-4 text-gray-700">{getOptimalRange.return}</td>
                    {/*Motivo del ajuste*/}
                    <td className='py-4 text-gray-700'>-</td>
                    {/*Ubicación*/}
                    <td className="py-4 text-gray-600 text-xs">
                      <div className="flex items-center gap-1"><Warehouse className="w-4 h-4" />{location.warehouse.name}</div>
                      <div className="flex items-center gap-1"><Layers className="w-4 h-4" />Piso: {location.bookcaseFloor}</div>
                      <div className="flex items-center gap-1"><MapPin className="w-4 h-4" />Estante: {location.bookcase}</div>
                      <div className="text-xs mt-1">Condición: {location.bookCondition} | Tipo: {location.locationType}</div>
                    </td>
                    <td className="py-4">
                      {isEditing ? (
                        <>
                          <button onClick={saveStock} className="text-green-600 hover:text-green-800 mr-2" title="Guardar" type="button"><Check className="w-4 h-4" /></button>
                          <button onClick={cancelEditing} className="text-gray-500 hover:text-gray-700" title="Cancelar" type="button"><X className="w-4 h-4" /></button>
                        </>
                      ) : (
                        <button onClick={() => startEditing(book.id, location.id, location.stock)} className="flex items-center text-blue-600 text-sm hover:underline" type="button">
                          <Pencil className="w-4 h-4 mr-1" />Ajustar
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-4 text-sm text-gray-500">{books.length} libros encontrados</div>
    </div>
  );
}
