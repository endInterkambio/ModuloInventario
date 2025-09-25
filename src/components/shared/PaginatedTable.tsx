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
  dropdownValue?: string;
  onDropdownSelect?: (value: string) => void;
  showSearch?: boolean;
  searchPlaceholder?: string;
  searchTerm?: string;
  setSearchTerm?: (term: string) => void;
  newButtonLabel?: string;
  newButtonTo?: string;
  newButtonClassName?: string;
  columns: Column<T>[];
  items: T[];
  isLoading: boolean;
  isError: boolean;
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
  totalElements: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (size: number) => void;
}

export function PaginatedTable<T>({
  title,
  dropdownOptions,
  dropdownLabel,
  dropdownValue,
  onDropdownSelect,
  showSearch = true,
  searchPlaceholder = "Buscar...",
  searchTerm,
  setSearchTerm,
  newButtonLabel,
  newButtonTo,
  newButtonClassName,
  columns,
  items,
  isLoading,
  isError,
  currentPage,
  itemsPerPage,
  totalPages,
  totalElements,
  onPageChange,
  onItemsPerPageChange,
}: PaginatedTableProps<T>) {
  return (
    <div className="bg-white border rounded-lg shadow-sm px-4 pt-10 pb-4">
      {(title ||
        dropdownOptions ||
        showSearch ||
        (newButtonTo && newButtonLabel)) && (
        <div className="flex justify-between items-start px-4 pt-4 gap-2">
          {dropdownOptions && (
            <DropdownMenu
              label={dropdownValue || dropdownLabel || ""}
              options={dropdownOptions}
              onSelect={onDropdownSelect}
            />
          )}

          {showSearch && setSearchTerm && (
            <SearchBar
              placeholder={searchPlaceholder}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          )}

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

      <PaginationBar
        currentPage={currentPage}
        totalPages={totalPages}
        totalElements={totalElements}
        itemsPerPage={itemsPerPage}
        onPageChange={onPageChange}
        onItemsPerPageChange={onItemsPerPageChange}
      />
    </div>
  );
}