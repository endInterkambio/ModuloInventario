import { useState } from "react";
import { toast } from "react-hot-toast";
import { useUploadBooks } from "@/hooks/useBooks";

import {
  ChevronDown,
  List,
  Grid3X3,
  Plus,
  MoreHorizontal,
  ArrowUpDown,
  Download,
  Upload,
  RotateCcw,
} from "lucide-react";

const HeaderNavigation: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  const mutation = useUploadBooks();

const handleImport = (file: File) => {
  toast.promise(
    mutation.mutateAsync(file),
    {
      loading: "Subiendo archivo...",
      success: "Archivo importado correctamente",
      error: (err) =>
        typeof err.response?.data === "string"
          ? err.response.data
          : "Error al importar el archivo",
    }
  );
};


  return (
    <div className="flex items-center justify-between bg-white border-b border-gray-200 px-6 py-3">
      {/* Left side - Dropdown */}
      <div className="relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900 font-medium"
        >
          <span>Todos los artículos</span>
          <ChevronDown className="w-4 h-4" />
        </button>

        {/* Dropdown menu */}
        {isDropdownOpen && (
          <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
            <div className="py-1">
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                Todos los artículos
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                Artículos recientes
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                Mis artículos
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                Borradores
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Right side - View toggles and New button */}
      <div className="flex items-center gap-3">
        {/* View toggle buttons */}
        <div className="flex items-center border border-gray-300 rounded-md">
          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-l-md">
            <List className="w-4 h-4" />
          </button>
          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-r-md border-l border-gray-300">
            <Grid3X3 className="w-4 h-4" />
          </button>
        </div>

        {/* New button */}
        <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium transition-colors">
          <Plus className="w-4 h-4" />
          Nuevo
        </button>

        {/* More options menu */}
        <div className="relative">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-md"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>

          {/* More options dropdown */}
          {isMenuOpen && (
            <div className="absolute top-full right-0 mt-1 w-64 bg-white border border-gray-200 rounded-md shadow-lg z-10">
              <div className="py-1">
                <div className="relative">
                  <button
                    className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    onMouseEnter={() => setActiveSubmenu("ordenar")}
                  >
                    <ArrowUpDown className="w-4 h-4 text-blue-500" />
                    <span>Ordenar por</span>
                    <ChevronDown className="w-4 h-4 ml-auto" />
                  </button>

                  {/* Submenu Ordenar por */}
                  {activeSubmenu === "ordenar" && (
                    <div className="absolute right-full top-0 ml-1 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-20">
                      <div className="py-1">
                        <button className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-blue-50">
                          <span>Nombre</span>
                        </button>
                        <button className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-blue-50">
                          <span>SKU (Código de artículo)</span>
                        </button>
                        <button className="flex items-center gap-3 w-full px-4 py-2 text-sm text-white bg-blue-500">
                          <span>Existencias a mano</span>
                        </button>
                        <button className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-blue-50">
                          <span>Tasa</span>
                        </button>
                        <button className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-blue-50">
                          <span>Hora de creación</span>
                        </button>
                        <button className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-blue-50">
                          <span>Hora de última modificación</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="relative">
                  <button
                    className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    onMouseEnter={() => setActiveSubmenu("importar")}
                  >
                    <Download className="w-4 h-4 text-blue-500" />
                    <span>Importar</span>
                    <ChevronDown className="w-4 h-4 ml-auto" />
                  </button>

                  {/* Submenu Importar */}
                  {activeSubmenu === "importar" && (
                    <div className="absolute right-full top-0 ml-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-20">
                      <div className="py-1">
                        {/* Label como botón + input oculto */}
                        <label
                          htmlFor="import-file"
                          className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 cursor-pointer"
                        >
                          <span>Importar archivo</span>
                          <input
                            type="file"
                            id="import-file"
                            accept=".csv,.xlsx"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                handleImport(file);
                              }
                            }}
                          />
                        </label>
                      </div>
                    </div>
                  )}
                </div>

                <div className="relative">
                  <button
                    className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    onMouseEnter={() => setActiveSubmenu("exportar")}
                  >
                    <Upload className="w-4 h-4 text-blue-500" />
                    <span>Exportar</span>
                    <ChevronDown className="w-4 h-4 ml-auto" />
                  </button>

                  {/* Submenu Exportar */}
                  {activeSubmenu === "exportar" && (
                    <div className="absolute right-full top-0 ml-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-20">
                      <div className="py-1">
                        <button className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-blue-50">
                          <span>Exportar</span>
                        </button>
                      </div>
                    </div>
                  )}
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
