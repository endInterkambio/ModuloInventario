// components/LocationManagementTab.tsx
import { Pencil } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface BookLocation {
  id: number;
  title: string;
  isbn: string;
  author: string;
  location: {
    warehouse: string;
    floor: string;
    shelf: string;
  };
}

const mockLocations: BookLocation[] = [
  {
    id: 1,
    title: 'PJ Masks Save the Library!',
    isbn: '9781481488334',
    author: 'Style Guide',
    location: { warehouse: 'Almacén Principal', floor: 'Piso 1', shelf: 'Est. A1' },
  },
  {
    id: 2,
    title: 'The Great Adventure',
    isbn: '9781234567890',
    author: 'Jane Doe',
    location: { warehouse: 'Almacén Secundario', floor: 'Piso 2', shelf: 'Est. B2' },
  },
  {
    id: 3,
    title: 'Learning to Code',
    isbn: '9780987654321',
    author: 'John Smith',
    location: { warehouse: 'Almacén Principal', floor: 'Piso 1', shelf: 'Est. C3' },
  },
];

export function LocationManagementTab() {
  const [books, setBooks] = useState<BookLocation[]>(mockLocations);

  const handleEditLocation = (id: number) => {
    const book = books.find(b => b.id === id);
    if (!book) return;

    const warehouse = prompt('Nuevo almacén:', book.location.warehouse);
    const floor = prompt('Nuevo piso:', book.location.floor);
    const shelf = prompt('Nuevo estante:', book.location.shelf);

    if (!warehouse || !floor || !shelf) {
      toast.error('Ubicación inválida');
      return;
    }

    setBooks(prev =>
      prev.map(b =>
        b.id === id
          ? {
              ...b,
              location: { warehouse, floor, shelf },
            }
          : b
      )
    );
    toast.success('Ubicación actualizada');
  };

  return (
    <div className="bg-white border rounded-lg shadow-sm p-4">
      <h2 className="text-lg font-semibold mb-4">Gestión de Ubicaciones</h2>
      <div className="text-sm text-gray-500 mb-4">
        Esta funcionalidad permite gestionar la ubicación específica de cada libro dentro de los almacenes.
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="text-gray-500 uppercase border-b">
            <tr className="text-left">
              <th className="py-2">Libro</th>
              <th className="py-2">Almacén</th>
              <th className="py-2">Piso</th>
              <th className="py-2">Estante</th>
              <th className="py-2">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {books.map(book => (
              <tr key={book.id} className="align-top">
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
                <td className="py-4 text-gray-700">{book.location.warehouse}</td>
                <td className="py-4 text-gray-700">{book.location.floor}</td>
                <td className="py-4 text-gray-700">{book.location.shelf}</td>
                <td className="py-4">
                  <button
                    onClick={() => handleEditLocation(book.id)}
                    className="flex items-center text-blue-600 text-sm hover:underline"
                  >
                    <Pencil className="w-4 h-4 mr-1" />
                    Editar
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
