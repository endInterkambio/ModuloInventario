import { BookRow } from './BookRow';

const books = [
  {
    title: 'PJ Masks Save the Library!',
    isbn: '9781481488334',
    author: 'Style Guide',
    stock: 3,
    optimalRange: '2 - 10',
    location: {
      warehouse: 'Almacén Principal',
      floor: 'Piso 1',
      shelf: 'Est. A1',
    },
  },
  {
    title: 'The Great Adventure',
    isbn: '9781234567890',
    author: 'Jane Doe',
    stock: 0,
    optimalRange: '1 - 8',
    location: {
      warehouse: 'Almacén Secundario',
      floor: 'Piso 2',
      shelf: 'Est. B2',
    },
  },
  {
    title: 'Learning to Code',
    isbn: '9780987654321',
    author: 'John Smith',
    stock: 15,
    optimalRange: '3 - 12',
    location: {
      warehouse: 'Almacén Principal',
      floor: 'Piso 1',
      shelf: 'Est. C3',
    },
  },
];

export function StockAdjustment() {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Ajuste de Stock</h2>
      <div className="text-sm text-right text-gray-500 mb-2">
        {books.length} libros encontrados
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
            {books.map((book, idx) => (
              <BookRow key={idx} book={book} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
