import { useState } from "react";
import { useBookStore } from "@/stores/useBookStore";

const SortMenu: React.FC = () => {
  const setSortOrder = useBookStore((state) => state.setSortOrder);
  const currentSort = useBookStore((state) => state.sortOrder);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  const sortOptions = [
    { label: "Nombre", field: "title", hasSubmenu: true },
    { label: "SKU (Código de artículo)", field: "sku", hasSubmenu: true },
    //{ label: "ISBN (Código de libro)", field: "isbn", hasSubmenu: true },
    { label: "Stock", field: "stock", hasSubmenu: true },
  ];

  const handleClick = (field: string, direction: "asc" | "desc") => {
    setSortOrder(`${field},${direction}`);
  };

  const isActive = (field: string, direction: "asc" | "desc") => currentSort === `${field},${direction}`;

  return (
    <div className="absolute right-full top-0 ml-1 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-20">
      <div className="py-1 relative">
        {sortOptions.map(({ label, field, hasSubmenu }) => (
          <div
            key={field}
            className="relative"
            onMouseEnter={() =>
              hasSubmenu ? setActiveSubmenu(field) : setActiveSubmenu(null)
            }
            onMouseLeave={() => hasSubmenu && setActiveSubmenu(null)}
          >
            <button
              onClick={() => !hasSubmenu && handleClick(field, "asc")}
              className={`flex items-center justify-between w-full px-4 py-2 text-sm ${
                currentSort === field
                  ? "text-white bg-blue-500"
                  : "text-gray-700 hover:bg-blue-50"
              }`}
            >
              <span>{label}</span>
              {hasSubmenu && <span className="ml-2 text-gray-400"></span>}
            </button>

            {/* Submenu by name */}
            {hasSubmenu && activeSubmenu === field && field === "title" && (
              <div className="absolute right-full top-0 ml-1 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-30">
                <button
                  onClick={() => handleClick(field, "asc")}
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    isActive(field, "asc")
                      ? "text-white bg-blue-500"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  A-Z
                </button>
                <button
                  onClick={() => handleClick(field, "desc")}
                  className={`block w-full text-left px-4 py-2 text-sm ${
                   isActive(field, "desc")
                      ? "text-white bg-blue-500"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  Z-A
                </button>
              </div>
            )}
            {/* Sort by SKU */}
            {hasSubmenu && activeSubmenu === field && field === "sku" && (
              <div className="absolute right-full top-0 ml-1 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-30">
                <button
                  onClick={() => handleClick(field, "asc")}
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    isActive(field, "asc")
                      ? "text-white bg-blue-500"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  SKU A-Z
                </button>
                <button
                  onClick={() => handleClick(field, "desc")}
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    isActive(field, "desc")
                      ? "text-white bg-blue-500"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  SKU Z-A
                </button>
              </div>
            )}
            {/* Sort by ISBN */}
            {hasSubmenu && activeSubmenu === field && field === "isbn" && (
              <div className="absolute right-full top-0 ml-1 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-30">
                <button
                  onClick={() => handleClick(field, "asc")}
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    isActive(field, "asc")
                      ? "text-white bg-blue-500"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  ISBN A-Z
                </button>
                <button
                  onClick={() => handleClick(field, "desc")}
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    isActive(field, "desc")
                      ? "text-white bg-blue-500"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  ISBN Z-A
                </button>
              </div>
            )}
            {/* Sort by Stock */}
            {hasSubmenu && activeSubmenu === field && field === "stock" && (
              <div className="absolute right-full top-0 ml-1 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-30">
                <button
                  onClick={() => handleClick(field, "asc")}
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    isActive(field, "asc")
                      ? "text-white bg-blue-500"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  Menor stock
                </button>
                <button
                  onClick={() => handleClick(field, "desc")}
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    isActive(field, "desc")
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
