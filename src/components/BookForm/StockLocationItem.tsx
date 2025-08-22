import { BookStockLocationDTO } from '@/types/BookStockLocationDTO';
import { Trash2 } from 'lucide-react';

interface StockLocationItemProps {
  location: BookStockLocationDTO;
  index: number;
  onChange: (index: number, field: keyof BookStockLocationDTO, value: string | number) => void;
  onRemove: (index: number) => void;
}

export const StockLocationItem = ({ location, index, onChange, onRemove }: StockLocationItemProps) => (
  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
    <div className="flex-1">
      <input
        type="text"
        placeholder="Ubicación"
        value={location.warehouse.name}
        onChange={(e) => onChange(index, 'warehouse', e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
    <div className="w-24">
      <input
        type="number"
        placeholder="Stock"
        min={0}
        value={location.stock}
        onChange={(e) => onChange(index, 'stock', parseInt(e.target.value) || 0)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
    <button
      type="button"
      onClick={() => onRemove(index)}
      className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  </div>
);
