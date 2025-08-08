import { Pencil } from 'lucide-react';

type BookLocation = {
  warehouse: string;
  floor: string;
  shelf: string;
};

type Book = {
  title: string;
  isbn: string;
  author: string;
  stock: number;
  optimalRange: string;
  location: BookLocation;
};

export function BookRow({ book }: { book: Book }) {
  const stockColor =
    book.stock === 0
      ? 'bg-red-100 text-red-500'
      : book.stock < 5
      ? 'bg-yellow-100 text-yellow-600'
      : 'bg-purple-100 text-purple-600';

  return (
    <tr className="bg-white rounded-lg shadow-sm">
      <td className="p-4 flex items-start gap-4">
        <div className="w-12 h-16 bg-gray-100 rounded" />
        <div>
          <div className="font-semibold text-gray-800">{book.title}</div>
          <div className="text-xs text-gray-500">ISBN: {book.isbn}</div>
          <div className="text-sm text-gray-400">{book.author}</div>
        </div>
      </td>
      <td className="p-4">
        <span className={`px-2 py-1 rounded-full text-xs ${stockColor}`}>
          {book.stock}
        </span>
      </td>
      <td className="p-4">{book.optimalRange}</td>
      <td className="p-4 text-sm text-gray-600">
        <div>🏬 {book.location.warehouse}</div>
        <div>🏢 {book.location.floor}</div>
        <div>📍 {book.location.shelf}</div>
      </td>
      <td className="p-4">
        <button className="flex items-center text-blue-600 text-sm hover:underline">
          <Pencil size={14} className="mr-1" />
          Ajustar
        </button>
      </td>
    </tr>
  );
}
