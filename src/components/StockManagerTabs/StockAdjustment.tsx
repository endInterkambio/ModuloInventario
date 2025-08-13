import { useBookStore } from '@/stores/useBookStore';
import { BookRow } from './BookRow';

export function StockAdjustment() {
  const books = useBookStore(state => state.books);

  // Contamos todas las ubicaciones
  const totalLocations = books.reduce((acc, book) => acc + book.locations.length, 0);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Ajuste de Stock</h2>
      <div className="text-sm text-right text-gray-500 mb-2">
        {totalLocations} ubicaciones encontradas
      </div>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-separate border-spacing-y-4">
          <thead className="text-left text-gray-600 text-sm">
            <tr>
              <th>LIBRO</th>
              <th>STOCK ACTUAL</th>
              <th>RANGO ÓPTIMO</th>
              <th>UBICACIÓN</th>
              <th>ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {books.map(book =>
              book.locations.map(location => (
                <BookRow key={location.id} book={book} location={location} />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
