// components/StockAdjustmentTable.tsx
import {
  Layers,
  MapPin,
  Warehouse,
  Pencil
} from 'lucide-react';

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

export default function InventoryAdjustmentPage() {
  return (
    <div className="bg-white border rounded-lg shadow-sm p-4">
      <h2 className="text-lg font-semibold mb-4">Ajuste de Stock</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="text-gray-500 uppercase border-b">
            <tr className="text-left">
              <th className="py-2">Libro</th>
              <th className="py-2">Stock Actual</th>
              <th className="py-2">Rango Óptimo</th>
              <th className="py-2">Ubicación</th>
              <th className="py-2">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {books.map((book, index) => (
              <tr key={index} className="align-top">
                <td className="py-4 pr-4">
                  <div className="flex gap-4">
                    <div className="w-12 h-16 bg-gray-200 rounded" />
                    <div>
                      <div className="font-medium text-gray-800">{book.title}</div>
                      <div className="text-xs text-gray-500">ISBN: {book.isbn}</div>
                      <div className="text-xs text-gray-400">{book.author}</div>
                    </div>
                  </div>
                </td>
                <td className="py-4">
                  <span
                    className={`inline-block px-2 py-0.5 text-xs rounded-full font-semibold ${
                      book.stock === 0
                        ? 'bg-red-100 text-red-600'
                        : book.stock > 10
                        ? 'bg-purple-100 text-purple-600'
                        : 'bg-green-100 text-green-600'
                    }`}
                  >
                    {book.stock}
                  </span>
                </td>
                <td className="py-4 text-gray-700">{book.optimalRange}</td>
                <td className="py-4 text-gray-600 text-xs">
                  <div className="flex items-center gap-1">
                    <Warehouse className="w-4 h-4" />
                    {book.location.warehouse}
                  </div>
                  <div className="flex items-center gap-1">
                    <Layers className="w-4 h-4" />
                    {book.location.floor}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {book.location.shelf}
                  </div>
                </td>
                <td className="py-4">
                  <button className="flex items-center text-blue-600 text-sm hover:underline">
                    <Pencil className="w-4 h-4 mr-1" />
                    Ajustar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-sm text-gray-500">
        {books.length} libros encontrados
      </div>
    </div>
  );
}
