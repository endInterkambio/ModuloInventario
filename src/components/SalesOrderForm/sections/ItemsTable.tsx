import { Trash2, Settings, Plus } from "lucide-react";
import { Item } from "../constants/types";

type ItemTableProps = {
  articles: Item[];
  onItemUpdate: (
    index: number,
    field: keyof Item,
    value: string | number
  ) => void;
  onAddArticle: () => void;
  onRemoveArticle: (index: number) => void;
};

export default function ItemTable({
  articles,
  onItemUpdate,
  onAddArticle,
  onRemoveArticle,
}: ItemTableProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-gray-700">
          Tabla de artículos
        </h3>
        <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1">
          <Settings className="h-4 w-4" />
          Acciones en bloque
        </button>
      </div>

      <div className="border border-gray-300 rounded overflow-hidden">
        {/* Header */}
        <div className="bg-gray-50 grid grid-cols-12 gap-2 p-3 text-xs font-medium text-gray-600 uppercase">
          <div className="col-span-1"></div>
          <div className="col-span-4">DETALLES DEL ARTÍCULO</div>
          <div className="col-span-1">CANTIDAD</div>
          <div className="col-span-1">MONTO</div>
          <div className="col-span-2">DESCUENTO</div>
          <div className="col-span-2">IMPORTE TOTAL</div>
        </div>

        {/* Body */}
        {articles.length === 0 ? (
          <div className="p-6 text-center text-gray-500 text-sm">
            <div className="mb-2">📦</div>
            Escribe o busca del para adicionar un artículo.
          </div>
        ) : (
          articles.map((article, index) => (
            <div
              key={article.id}
              className="grid grid-cols-12 gap-2 p-3 border-t border-gray-200 items-center"
            >
              {/* Remove */}
              <div className="col-span-1">
                <button
                  onClick={() => onRemoveArticle(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              {/* Description */}
              <div className="col-span-4">
                <input
                  type="text"
                  value={article.description}
                  onChange={(e) =>
                    onItemUpdate(index, "description", e.target.value)
                  }
                  placeholder="Descripción del artículo"
                  className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                />
              </div>

              {/* Quantity */}
              <div className="col-span-1">
                <input
                  type="number"
                  value={article.quantity}
                  onChange={(e) =>
                    onItemUpdate(
                      index,
                      "quantity",
                      parseFloat(e.target.value) || 0
                    )
                  }
                  className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                  min="0"
                  step="0.01"
                />
              </div>

              {/* Price */}
              <div className="col-span-1">
                <input
                  type="number"
                  value={article.price}
                  onChange={(e) =>
                    onItemUpdate(
                      index,
                      "price",
                      parseFloat(e.target.value) || 0
                    )
                  }
                  className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                  min="0"
                  step="0.01"
                />
              </div>

              {/* Discount */}
              <div className="col-span-2 flex items-center border border-gray-300 rounded overflow-hidden">
                <input
                  type="number"
                  value={article.discount}
                  onChange={(e) =>
                    onItemUpdate(
                      index,
                      "discount",
                      parseFloat(e.target.value) || 0
                    )
                  }
                  className="w-full px-2 py-1 text-sm outline-none"
                  min="0"
                  step="0.01"
                />
                <select
                  value={article.discountType || "%"}
                  onChange={(e) =>
                    onItemUpdate(index, "discountType", e.target.value)
                  }
                  className="bg-gray-50 border-l border-gray-300 px-2 py-1 text-sm outline-none"
                >
                  <option value="%">%</option>
                  <option value="S/.">S/.</option>
                </select>
              </div>

              {/* Amount */}
              <div className="col-span-2">
                <span className="text-sm font-medium">
                  {article.amount.toFixed(2)}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2 mt-3">
        <button
          onClick={onAddArticle}
          className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
        >
          <Plus className="h-4 w-4" />
          Añadir nueva fila
        </button>
        <button className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800">
          <Plus className="h-4 w-4" />
          Agregar artículos a granel
        </button>
      </div>
    </div>
  );
}
