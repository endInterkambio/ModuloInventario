import { useState } from 'react';
import { Pencil, Check, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { BookDTO, BookStockLocationDTO } from '@/types/BookDTO';
import { useBookStore } from '@/stores/useBookStore';

interface BookRowProps {
  book: BookDTO;
  location: BookStockLocationDTO;
}

export function BookRow({ book, location }: BookRowProps) {
  const updateLocationStock = useBookStore(state => state.updateLocationStock);

  const [isEditing, setIsEditing] = useState(false);
  const [tempStock, setTempStock] = useState(location.stock);

  const stockColor =
    tempStock === 0
      ? 'bg-red-100 text-red-500'
      : tempStock < 5
      ? 'bg-yellow-100 text-yellow-600'
      : 'bg-purple-100 text-purple-600';

  const optimalRange = "0 - 20"; // Si tienes un rango real por ubicación, úsalo aquí

  const handleSave = () => {
    if (isNaN(tempStock) || tempStock < 0) {
      toast.error('Stock inválido');
      return;
    }
    updateLocationStock(book.id, location.id, tempStock);
    setIsEditing(false);
    toast.success('Stock actualizado');
  };

  const handleCancel = () => {
    setTempStock(location.stock);
    setIsEditing(false);
  };

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
        {isEditing ? (
          <input
            type="number"
            value={tempStock}
            onChange={(e) => setTempStock(parseInt(e.target.value))}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSave();
              if (e.key === 'Escape') handleCancel();
            }}
            onBlur={handleCancel}
            className="w-16 text-center border border-gray-300 rounded px-1 py-0.5 text-sm"
            autoFocus
          />
        ) : (
          <span className={`px-2 py-1 rounded-full text-xs ${stockColor}`}>
            {location.stock}
          </span>
        )}
      </td>
      <td className="p-4">{optimalRange}</td>
      <td className="p-4 text-sm text-gray-600">
        <div>🏬 {location.warehouse.name}</div>
        <div>🏢 Piso: {location.bookcaseFloor}</div>
        <div>📍 Estante: {location.bookcase}</div>
        <div>Condición: {location.bookCondition}</div>
        <div>Tipo: {location.locationType}</div>
      </td>
      <td className="p-4">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="text-green-600 hover:text-green-800 mr-2"
              title="Guardar"
              type="button"
            >
              <Check size={16} />
            </button>
            <button
              onClick={handleCancel}
              className="text-gray-500 hover:text-gray-700"
              title="Cancelar"
              type="button"
            >
              <X size={16} />
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center text-blue-600 text-sm hover:underline"
            type="button"
          >
            <Pencil size={14} className="mr-1" />
            Ajustar
          </button>
        )}
      </td>
    </tr>
  );
}
