import { useEffect, useRef, useState } from "react";
import { Trash2, Settings, Plus } from "lucide-react";
import { SaleOrderItemDTO } from "@/types/SaleOrderItemDTO";
import { useBooks } from "@/hooks/useBooks";
import { BookDTO } from "@/types/BookDTO";
import { BookStockLocationDTO } from "@/types/BookStockLocationDTO";
import toast from "react-hot-toast";

type ItemTableProps = {
  articles: SaleOrderItemDTO[];
  onItemUpdate: (index: number, patch: Partial<SaleOrderItemDTO>) => void;

  onAddArticle: () => void;
  onRemoveArticle: (index: number) => void;
};

export default function ItemTable({
  articles,
  onItemUpdate,
  onAddArticle,
  onRemoveArticle,
}: ItemTableProps) {
  // calcular importe
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

      <div className="border border-gray-300 rounded">
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
            <ItemRow
              key={article.id ?? index}
              article={article}
              index={index}
              articles={articles}
              onItemUpdate={onItemUpdate}
              onRemoveArticle={onRemoveArticle}
              calculateAmount={calculateAmount}
            />
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

// Subcomponente ItemRow
function ItemRow({
  article,
  index,
  articles,
  onItemUpdate,
  onRemoveArticle,
  calculateAmount,
}: {
  article: SaleOrderItemDTO;
  index: number;
  articles: SaleOrderItemDTO[];
  onItemUpdate: ItemTableProps["onItemUpdate"];
  onRemoveArticle: ItemTableProps["onRemoveArticle"];
  calculateAmount: (item: SaleOrderItemDTO) => number;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [debouncedTerm, setDebouncedTerm] = useState("");

  const wrapperRef = useRef<HTMLDivElement>(null);

  // debounce para búsqueda
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedTerm(searchTerm), 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // obtener libros desde backend
  const { data: booksPage } = useBooks(0, 10, undefined, debouncedTerm, 1);
  const books = booksPage?.content || [];

  const handleSelect = (
    book: BookDTO,
    location: BookStockLocationDTO | null
  ) => {
    if (!location) return;

    // Verificar si ese location ya fue agregado en otra fila
    const alreadyExists = articles.some(
      (item, idx) => idx !== index && item.bookStockLocation?.id === location.id
    );

    if (alreadyExists) {
      toast.error("⚠️ Este artículo ya fue agregado en otra fila.");
      return;
    }

    // Si no existe, lo actualizamos normalmente
    onItemUpdate(index, {
      bookTitle: book.title,
      bookStockLocation: {
        id: location.id,
        bookSku: location.bookSku,
        stock: location.stock,
        warehouse: location.warehouse,
        bookcase: location.bookcase,
        bookcaseFloor: location.bookcaseFloor,
      },
      customPrice: book.sellingPrice ?? 0,
    });

    setSearchTerm("");
    setShowDropdown(false);
  };

  // clic fuera para cerrar dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className="grid grid-cols-12 gap-2 p-3 border-t border-gray-200 items-center"
      ref={wrapperRef}
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

      {/* Book / Autocomplete */}
      <div className="col-span-4 relative">
        <input
          type="text"
          value={searchTerm || article.bookTitle || ""}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setShowDropdown(true);
          }}
          onFocus={() => setShowDropdown(true)}
          placeholder="Buscar artículo"
          className="w-full border truncate border-gray-300 rounded px-2 py-1 text-sm pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />

        {/* Botón para limpiar selección */}
        {article.bookStockLocation && (
          <button
            type="button"
            onClick={() => {
              onItemUpdate(index, {
                bookTitle: undefined,
                bookStockLocation: null,
                customPrice: 0,
              });

              setSearchTerm("");
              setShowDropdown(false);
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-red-700 hover:text-gray-600 font-bold"
          >
            X
          </button>
        )}

        {/* Dropdown */}
        {showDropdown && (
          <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded mt-1 max-h-60 overflow-y-auto shadow-lg z-50">
            {books.length > 0 ? (
              books.flatMap((book: BookDTO) => {
                const availableLocations = book.locations.filter(
                  (loc) => loc.stock > 0
                );

                return availableLocations.length > 0
                  ? availableLocations.map((loc) => (
                      <li
                        key={`${book.id}-${loc.id}`}
                        onClick={() => handleSelect(book, loc)}
                        className="px-3 py-2 hover:bg-blue-100 cursor-pointer text-sm flex flex-col"
                      >
                        <span className="font-medium truncate">
                          {book.title}
                        </span>
                        <span className="text-gray-500 text-xs">
                          {loc.warehouse.name} — Est: {loc.bookcase} / Piso:{" "}
                          {loc.bookcaseFloor} — Stock: {loc.stock} — Condición:{" "}
                          {loc.bookCondition} - Precio: {book.sellingPrice}
                        </span>
                      </li>
                    ))
                  : null; // no mostrar libros sin stock en ninguna ubicación
              })
            ) : (
              <li className="px-3 py-2 text-gray-500 text-sm italic">
                No se encontraron resultados
              </li>
            )}
          </ul>
        )}
      </div>

      {/* Quantity */}
      <div className="col-span-2">
        <input
          type="number"
          value={article.quantity ?? 0}
          onChange={(e) => {
            const newQty = parseFloat(e.target.value) || 0;
            const maxStock = article.bookStockLocation?.stock ?? Infinity;

            if (newQty > maxStock) {
              toast.error(
                `⚠️ Stock insuficiente. Solo quedan ${maxStock} unidades.`
              );
              onItemUpdate(index, { quantity: maxStock }); // fuerza el máximo permitido
            } else {
              onItemUpdate(index, { quantity: newQty });
            }
          }}
          className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
          min="1"
          step="1"
          max={article.bookStockLocation?.stock ?? undefined} // también ayuda al control nativo del input
        />
      </div>

      {/* Custom Price */}
      <div className="col-span-2">
        <input
          type="number"
          value={article.customPrice ?? 0}
          onChange={(e) =>
            onItemUpdate(index, {
              customPrice: parseFloat(e.target.value) || 0,
            })
          }
          className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
          min="0"
          step=""
        />
      </div>

      {/* Discount */}
      <div className="col-span-1">
        <input
          type="number"
          value={article.discount ?? 0}
          onChange={(e) =>
            onItemUpdate(index, {
              discount: parseFloat(e.target.value) || 0,
            })
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
  );
}
