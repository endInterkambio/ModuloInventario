import { Trash2, Settings, Plus } from "lucide-react";
import { SaleOrderItemDTO } from "@/types/SaleOrderItemDTO";
import { SimpleIdNameDTO } from "@/types/SimpleIdNameDTO";

type ItemTableProps = {
  articles: SaleOrderItemDTO[];
  onItemUpdate: (
    index: number,
    field: keyof SaleOrderItemDTO,
    value: string | number | SimpleIdNameDTO
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
  // calculamos el importe de cada fila
  const calculateAmount = (item: SaleOrderItemDTO) => {
    const subtotal = (item.quantity ?? 0) * (item.customPrice ?? 0);
    const discountAmount = item.discount ? (subtotal * item.discount) / 100 : 0;
    return subtotal - discountAmount;
  };

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
          <div className="col-span-4">UBICACIÓN / ARTÍCULO</div>
          <div className="col-span-2">CANTIDAD</div>
          <div className="col-span-2">PRECIO UNITARIO</div>
          <div className="col-span-1">DESC %</div>
          <div className="col-span-2">IMPORTE TOTAL</div>
        </div>

        {/* Body */}
        {articles.length === 0 ? (
          <div className="p-6 text-center text-gray-500 text-sm">
            <div className="mb-2">📦</div>
            Escribe o busca un artículo para adicionar.
          </div>
        ) : (
          articles.map((article, index) => (
            <div
              key={article.id ?? index}
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

              {/* BookStockLocation (ahora lo pongo como texto simple, luego podemos cambiar a select) */}
              <div className="col-span-4">
                <input
                  type="text"
                  value={article.bookStockLocation?.name ?? ""}
                  onChange={(e) =>
                    onItemUpdate(index, "bookStockLocation", {
                      id: article.bookStockLocation?.id ?? 0,
                      name: e.target.value,
                    })
                  }
                  placeholder="Ubicación o nombre del artículo"
                  className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                />
              </div>

              {/* Quantity */}
              <div className="col-span-2">
                <input
                  type="number"
                  value={article.quantity ?? 0}
                  onChange={(e) =>
                    onItemUpdate(index, "quantity", parseFloat(e.target.value) || 0)
                  }
                  className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                  min="0"
                  step="1"
                />
              </div>

              {/* Custom Price */}
              <div className="col-span-2">
                <input
                  type="number"
                  value={article.customPrice ?? 0}
                  onChange={(e) =>
                    onItemUpdate(index, "customPrice", parseFloat(e.target.value) || 0)
                  }
                  className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                  min="0"
                  step="0.01"
                />
              </div>

              {/* Discount (solo %) */}
              <div className="col-span-1">
                <input
                  type="number"
                  value={article.discount ?? 0}
                  onChange={(e) =>
                    onItemUpdate(index, "discount", parseFloat(e.target.value) || 0)
                  }
                  className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                  min="0"
                  step="0.01"
                />
              </div>

              {/* Amount */}
              <div className="col-span-2">
                <span className="text-sm font-medium">
                  {calculateAmount(article).toFixed(2)}
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
