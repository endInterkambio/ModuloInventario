import { useState } from "react";
import { useBookStore } from "@/stores/useBookStore";

const SortMenu: React.FC = () => {
  const setSortOrder = useBookStore((state) => state.setSortOrder);
  const currentSort = useBookStore((state) => state.sortOrder);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  const sortOptions = [
    { label: "Nombre", value: "title", hasSubmenu: true },
    { label: "SKU (Código de artículo)", value: "sku", hasSubmenu: true },
    //{ label: "ISBN (Código de libro)", value: "isbn", hasSubmenu: true },
    { label: "Stock", value: "stock", hasSubmenu: true },
  ];

  const handleClick = (value: string) => {
    setSortOrder(value);
  };

  return (
    <div className="absolute right-full top-0 ml-1 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-20">
      <div className="py-1 relative">
        {sortOptions.map(({ label, value, hasSubmenu }) => (
          <div
            key={value}
            className="relative"
            onMouseEnter={() =>
              hasSubmenu ? setActiveSubmenu(value) : setActiveSubmenu(null)
            }
            onMouseLeave={() => hasSubmenu && setActiveSubmenu(null)}
          >
            <button
              onClick={() => !hasSubmenu && handleClick(value)}
              className={`flex items-center justify-between w-full px-4 py-2 text-sm ${
                currentSort === value
                  ? "text-white bg-blue-500"
                  : "text-gray-700 hover:bg-blue-50"
              }`}
            >
              <span>{label}</span>
              {hasSubmenu && <span className="ml-2 text-gray-400"></span>}
            </button>

            {/* Submenu by name */}
            {hasSubmenu && activeSubmenu === value && value === "title" && (
              <div className="absolute right-full top-0 ml-1 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-30">
                <button
                  onClick={() => handleClick("A-Z")}
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    currentSort === "A-Z"
                      ? "text-white bg-blue-500"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  A-Z
                </button>
                <button
                  onClick={() => handleClick("Z-A")}
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    currentSort === "Z-A"
                      ? "text-white bg-blue-500"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  Z-A
                </button>
              </div>
            )}
            {/* Sort by SKU */}
            {hasSubmenu && activeSubmenu === value && value === "sku" && (
              <div className="absolute right-full top-0 ml-1 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-30">
                <button
                  onClick={() => handleClick("SKU_ASC")}
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    currentSort === "SKU_ASC"
                      ? "text-white bg-blue-500"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  SKU A-Z
                </button>
                <button
                  onClick={() => handleClick("SKU_DESC")}
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    currentSort === "SKU_DESC"
                      ? "text-white bg-blue-500"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  SKU Z-A
                </button>
              </div>
            )}
            {/* Sort by ISBN */}
            {hasSubmenu && activeSubmenu === value && value === "isbn" && (
              <div className="absolute right-full top-0 ml-1 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-30">
                <button
                  onClick={() => handleClick("ISBN_ASC")}
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    currentSort === "SKU_ASC"
                      ? "text-white bg-blue-500"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  ISBN A-Z
                </button>
                <button
                  onClick={() => handleClick("ISBN_DESC")}
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    currentSort === "SKU_DESC"
                      ? "text-white bg-blue-500"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  ISBN Z-A
                </button>
              </div>
            )}
            {/* Sort by Stock */}
            {hasSubmenu && activeSubmenu === value && value === "stock" && (
              <div className="absolute right-full top-0 ml-1 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-30">
                <button
                  onClick={() => handleClick("STOCK_ASC")}
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    currentSort === "STOCK_ASC"
                      ? "text-white bg-blue-500"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  Menor stock
                </button>
                <button
                  onClick={() => handleClick("STOCK_DESC")}
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    currentSort === "STOCK_DESC"
                      ? "text-white bg-blue-500"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  Mayor stock
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SortMenu;
