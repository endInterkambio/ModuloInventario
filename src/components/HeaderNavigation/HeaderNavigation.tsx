import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import {
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
import { useBookStore } from "@/stores/useBookStore";
import NewButton from "@components/NewButton";
import { DropdownMenu } from "./DropdownMenu";
import { useIsAdmin } from "@/hooks/useAuthRole";

const HeaderNavigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const { setMinStock } = useBookStore();
  const mutation = useUploadBooks();
  const isAdmin = useIsAdmin();

  // inicializamos filtro por defecto
  useEffect(() => {
    setMinStock(1);
  }, [setMinStock]);

  const handleStockFilter = (type: string) => {
    if (type === "Artículos con existencias") {
      setMinStock(1);
    } else if (type === "Todos los artículos") {
      setMinStock(undefined);
    }
    // otros filtros...
  };

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
      {/* 🔽 Dropdown reutilizable */}
      <DropdownMenu
        label="Artículos con existencias"
        options={[
          "Artículos con existencias",
          "Todos los artículos",
          "Artículos recientes",
          "Mis artículos",
          "Borradores",
        ]}
        onSelect={handleStockFilter}
      />

      <SearchBar />

      <div className="flex items-center gap-3">
        <ViewToggle />
        {isAdmin && (
          <NewButton to={"/dashboard/inventory/newBook"} label={"Nuevo"} />
        )}

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

                {isAdmin && (
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
                )}
                
                {isAdmin && (
                  <div className="relative">
                    <SubmenuItem
                      icon={<Upload className="w-4 h-4 text-blue-500" />}
                      label="Exportar"
                      isActive={activeSubmenu === "exportar"}
                      onHover={() => setActiveSubmenu("exportar")}
                    />
                    {activeSubmenu === "exportar" && <ExportMenu />}
                  </div>
                )}

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
