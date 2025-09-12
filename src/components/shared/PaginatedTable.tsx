import { useState, useEffect } from "react";
import { SearchBar } from "@components/SearchBar/SearchBar";
import { DropdownMenu } from "@components/HeaderNavigation/DropdownMenu";
import NewButton from "@components/NewButton";
import PaginationBar from "@components/shared/pagination/PaginationBar";

interface Column<T> {
  key: string;
  header: string;
  render: (item: T) => React.ReactNode;
}

interface PaginatedTableProps<T> {
  title?: string;
  dropdownOptions?: string[];
  dropdownLabel?: string;
  showSearch?: boolean;
  searchPlaceholder?: string;
  newButtonLabel?: string;
  newButtonTo?: string;
  newButtonClassName?: string;
  columns: Column<T>[];
  usePaginatedHook: (
    page: number,
    size: number
  ) => {
    data?: { content: T[]; totalPages: number; totalElements: number };
    isLoading: boolean;
    isError: boolean;
  };
  itemsPerPageDefault?: number;
}

export function PaginatedTable<T>({
  title,
  dropdownOptions,
  dropdownLabel,
  showSearch = true,
  searchPlaceholder = "Buscar...",
  newButtonLabel,
  newButtonTo,
  newButtonClassName,
  columns,
  usePaginatedHook,
  itemsPerPageDefault = 12,
}: PaginatedTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageDefault);

  const {
    data: pageData,
    isLoading,
    isError,
  } = usePaginatedHook(currentPage - 1, itemsPerPage);

  const items = pageData?.content || [];

  // Resetear página al cambiar itemsPerPage
  useEffect(() => {
    setCurrentPage(1);
  }, [itemsPerPage]);

  return (
    <div className="bg-white border rounded-lg shadow-sm p-4">
      {(title ||
        dropdownOptions ||
        showSearch ||
        (newButtonTo && newButtonLabel)) && (
        <div className="flex justify-between items-start px-4 pt-4 gap-2">
          {dropdownOptions && (
            <DropdownMenu
              label={dropdownLabel || ""}
              options={dropdownOptions}
            />
          )}

          {showSearch && <SearchBar placeholder={searchPlaceholder} />}

          {newButtonTo && newButtonLabel && (
            <NewButton
              to={newButtonTo}
              label={newButtonLabel}
              className={newButtonClassName}
            />
          )}
        </div>
      )}

      <div className="overflow-x-auto py-5">
        {isLoading ? (
          <div className="text-center py-4">Cargando...</div>
        ) : isError ? (
          <div className="text-center py-4 text-red-500">
            Error al cargar datos
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-4 text-gray-500">No hay registros</div>
        ) : (
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left">
                {columns.map((col) => (
                  <th key={col.key} className="py-2 px-4">
                    {col.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y">
              {items.map((item, idx) => (
                <tr key={idx} className="text-gray-700">
                  {columns.map((col) => (
                    <td key={col.key} className="py-2 px-4">
                      {col.render(item)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {pageData && (
        <PaginationBar
          currentPage={currentPage}
          totalPages={pageData.totalPages}
          totalElements={pageData.totalElements}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={setItemsPerPage}
        />
      )}
    </div>
  );
}
