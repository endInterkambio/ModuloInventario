// components/BookStockTab.tsx
import { Check, Pencil, X } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface Book {
  id: number;
  title: string;
  isbn: string;
  author: string;
  stock: number;
  optimalRange: [number, number];
  location: {
    warehouse: string;
    floor: string;
    shelf: string;
  };
}

const mockBooks: Book[] = [
  {
    id: 1,
    title: 'PJ Masks Save the Library!',
    isbn: '9781481488334',
    author: 'Style Guide',
    stock: 3,
    optimalRange: [2, 10],
    location: { warehouse: 'Almacén Principal', floor: 'Piso 1', shelf: 'Est. A1' },
  },
  {
    id: 2,
    title: 'The Great Adventure',
    isbn: '9781234567890',
    author: 'Jane Doe',
    stock: 0,
    optimalRange: [1, 8],
    location: { warehouse: 'Almacén Secundario', floor: 'Piso 2', shelf: 'Est. B2' },
  },
  {
    id: 3,
    title: 'Learning to Code',
    isbn: '9780987654321',
    author: 'John Smith',
    stock: 15,
    optimalRange: [3, 12],
    location: { warehouse: 'Almacén Principal', floor: 'Piso 1', shelf: 'Est. C3' },
  },
];

export function BookStockTab() {
  const [books, setBooks] = useState<Book[]>(mockBooks);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [tempStock, setTempStock] = useState<number>(0);

  const handleStartEditing = (id: number, currentStock: number) => {
    setEditingId(id);
    setTempStock(currentStock);
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  const handleSave = (id: number) => {
    if (isNaN(tempStock) || tempStock < 0) {
      toast.error('Stock inválido');
      return;
    }
    setBooks(prev =>
      prev.map(book =>
        book.id === id ? { ...book, stock: tempStock } : book
      )
    );
    setEditingId(null);
    toast.success('Stock actualizado');
  };

  return (
    <div className="mt-4 space-y-4">
      <h2 className="text-lg font-semibold">Ajuste de Stock</h2>
      <div className="text-sm text-gray-500">{books.length} libros encontrados</div>
      <div className="divide-y">
        {books.map(book => {
          const isEditing = editingId === book.id;
          const badgeColor =
            book.stock === 0
              ? 'bg-red-100 text-red-600'
              : book.stock > book.optimalRange[1]
              ? 'bg-purple-100 text-purple-600'
              : 'bg-green-100 text-green-600';

          return (
            <div key={book.id} className="flex items-start gap-4 py-4">
              <div className="w-12 h-16 bg-gray-200 rounded" />
              <div className="flex-1">
                <div className="font-medium text-sm text-gray-900">{book.title}</div>
                <div className="text-xs text-gray-500">ISBN: {book.isbn}</div>
                <div className="text-xs text-gray-500">{book.author}</div>
              </div>
              <div className="w-20 text-center">
                {isEditing ? (
                  <input
                    type="number"
                    value={tempStock}
                    onChange={(e) => setTempStock(parseInt(e.target.value))}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSave(book.id);
                      if (e.key === 'Escape') handleCancel();
                    }}
                    onBlur={() => handleCancel()}
                    className="w-16 text-center border border-gray-300 rounded px-1 py-0.5 text-sm"
                    autoFocus
                  />
                ) : (
                  <span className={`text-sm font-bold rounded-full px-2 py-1 ${badgeColor}`}>
                    {book.stock}
                  </span>
                )}
              </div>
              <div className="w-24 text-sm text-gray-600">
                {book.optimalRange[0]} - {book.optimalRange[1]}
              </div>
              <div className="text-sm text-gray-600">
                <div>{book.location.warehouse}</div>
                <div>{book.location.floor}</div>
                <div>{book.location.shelf}</div>
              </div>
              <div className="ml-auto pr-2 flex gap-2">
                {isEditing ? (
                  <>
                    <button
                      onClick={() => handleSave(book.id)}
                      className="text-green-600 hover:text-green-800"
                      title="Guardar"
                    >
                      <Check className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handleCancel}
                      className="text-gray-500 hover:text-gray-700"
                      title="Cancelar"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => handleStartEditing(book.id, book.stock)}
                    className="text-blue-600 hover:underline flex items-center gap-1"
                  >
                    <Pencil className="w-4 h-4" /> Ajustar
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
