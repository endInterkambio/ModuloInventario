import { useState } from "react";
import { toast } from "react-hot-toast";
import {
  ChevronDown,
  Plus,
  MoreHorizontal,
  RotateCcw,
  ArrowUpDown,
  Download,
  Upload,
  FilterIcon,
} from "lucide-react";

import { useUploadBooks } from "@/hooks/useBooks";
import ImportMenu from "./ImportMenu";
import SortMenu from "./SortMenu";
import ExportMenu from "./ExportMenu";
import SubmenuItem from "./SubmenuItem";
import ViewToggle from "./ViewToggle";
import { SearchBar } from "@components/SearchBar/SearchBar";
import FilterMenu from "./FilterMenu";

const HeaderNavigation: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  const mutation = useUploadBooks();

  const handleImport = (file: File) => {
    toast.promise(mutation.mutateAsync(file), {
      loading: "Subiendo archivo...",
      success: "Archivo importado correctamente",
      error: (err) =>
        typeof err.response?.data === "string"
          ? err.response.data
          : "Error al importar el archivo",
    });
  };

  return (
    <div className="flex items-center justify-between bg-white border-b border-gray-200 px-6 py-3">
      <div className="relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900 font-medium"
        >
          <span>Artículos con existencias</span>
          <ChevronDown className="w-4 h-4" />
        </button>
        {isDropdownOpen && (
          <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
            <div className="py-1">
              {[
                "Artículos con existencias",
                "Todos los artículos",
                "Artículos recientes",
                "Mis artículos",
                "Borradores",
              ].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      <SearchBar />

      <div className="flex items-center gap-3">
        <ViewToggle />

        <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium transition-colors">
          <Plus className="w-4 h-4" />
          Nuevo
        </button>

        <div className="relative">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-md"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>

          {isMenuOpen && (
            <div className="absolute top-full right-0 mt-1 w-64 bg-white border border-gray-200 rounded-md shadow-lg z-10">
              <div className="py-1">
                <div className="relative">
                  <SubmenuItem
                    icon={<ArrowUpDown className="w-4 h-4 text-blue-500" />}
                    label="Ordenar por"
                    isActive={activeSubmenu === "ordenar"}
                    onHover={() => setActiveSubmenu("ordenar")}
                  />
                  {activeSubmenu === "ordenar" && <SortMenu />}
                </div>
                <div className="relative">
                  <SubmenuItem
                    icon={<FilterIcon className="w-4 h-4 text-blue-500" />}
                    label="Filtrar por stock"
                    isActive={activeSubmenu === "filtrar"}
                    onHover={() => setActiveSubmenu("filtrar")}
                  />
                  {activeSubmenu === "filtrar" && <FilterMenu />}
                </div>

                <div className="relative">
                  <SubmenuItem
                    icon={<Download className="w-4 h-4 text-blue-500" />}
                    label="Importar"
                    isActive={activeSubmenu === "importar"}
                    onHover={() => setActiveSubmenu("importar")}
                  />
                  {activeSubmenu === "importar" && (
                    <ImportMenu handleImport={handleImport} />
                  )}
                </div>

                <div className="relative">
                  <SubmenuItem
                    icon={<Upload className="w-4 h-4 text-blue-500" />}
                    label="Exportar"
                    isActive={activeSubmenu === "exportar"}
                    onHover={() => setActiveSubmenu("exportar")}
                  />
                  {activeSubmenu === "exportar" && <ExportMenu />}
                </div>

                <div className="border-t border-gray-100 my-1"></div>

                <button
                  className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  onMouseEnter={() => setActiveSubmenu(null)}
                >
                  <RotateCcw className="w-4 h-4 text-blue-500" />
                  <span>Actualizar la lista</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeaderNavigation;
