import { useLocation } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { SearchBar } from "@components/SearchBar/SearchBar";
import NewButton from "@components/NewButton";
import { DropdownMenu } from "@components/HeaderNavigation/DropdownMenu";
import PaginationBar from "@components/shared/pagination/PaginationBar";
import { SalesOrderForm } from "@components/SalesOrderForm";
import { SaleOrdersTable } from "@components/SalesOrders/SaleOrdersTable";
import { SaleOrdersCards } from "@components/SalesOrders/SaleOrdersCards";
import { useEffect, useState } from "react";
import { useSaleOrdersStore } from "@/stores/useSaleOrderStore";
import { useSaleOrdersWithStore } from "@/hooks/useSaleOrders";
import { OrderStatus } from "@/types/SaleOrderDTO";

export function SaleOrdersPage() {
  const location = useLocation();
  const isNewSaleOrder = location.pathname.endsWith("/newSaleOrder");
  const isSaleOrderView = location.pathname.match(/^\/dashboard\/selling\/.+$/);

  const statusLabels: Record<OrderStatus, string> = {
    PENDING: "Pendiente",
    IN_PROGRESS: "En progreso",
    SHIPPED: "Enviado",
    COMPLETED: "Completado",
    CANCELLED: "Cancelado",
  };

  const dropdownOptions = ["Todas", ...Object.values(statusLabels)];

  const {
    currentPage,
    itemsPerPage,
    filters,
    setCurrentPage,
    setItemsPerPage,
    setFilter,
  } = useSaleOrdersStore();

  // --- Estado local para la búsqueda global ---
  const [searchTerm, setSearchTerm] = useState(filters.search || "");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

  // --- Actualiza el store cuando cambia el debounce ---
  useEffect(() => {
    setFilter("search", debouncedSearchTerm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm]);

  // --- Hook de React Query con filtros de store ---
  const { data: saleOrdersPage, isLoading, isError } = useSaleOrdersWithStore();
  const saleOrders = saleOrdersPage?.content ?? [];

  // --- Nueva orden o detalle ---
  if (isNewSaleOrder) return <SalesOrderForm />;

  if (isSaleOrderView) {
    return (
      <div className="bg-white border rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold">Detalle de orden de venta</h2>
      </div>
    );
  }

  // --- Render lista ---
  return (
    <div className="bg-white border rounded-lg shadow-sm p-4">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 px-4 pt-4">
        <DropdownMenu
          label={
            filters.status
              ? statusLabels[filters.status as OrderStatus]
              : "Todas las órdenes"
          }
          options={dropdownOptions}
          onSelect={(label) => {
            if (label === "Todas") {
              setFilter("status", "");
              return;
            }

            const backendStatus = (Object.entries(statusLabels).find(
              ([, value]) => value === label
            )?.[0] ?? "") as OrderStatus | "";

            setFilter("status", backendStatus);
          }}
        />

        <SearchBar
          placeholder="Buscar órdenes de venta"
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <NewButton
          to={"/dashboard/selling/newSaleOrder"}
          label="Nueva"
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
        />
      </div>

      <div className="overflow-x-auto py-5">
        {isLoading ? (
          <div className="text-center py-10">Cargando órdenes de venta...</div>
        ) : isError ? (
          <div className="text-center py-10 text-red-500">
            Error al cargar las órdenes de venta
          </div>
        ) : saleOrders.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            No hay órdenes de venta
          </div>
        ) : (
          <>
            <SaleOrdersTable saleOrders={saleOrders} />
            <SaleOrdersCards saleOrders={saleOrders} />
          </>
        )}
      </div>

      {saleOrdersPage && (
        <PaginationBar
          currentPage={currentPage}
          totalPages={saleOrdersPage.totalPages}
          totalElements={saleOrdersPage.totalElements}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={setItemsPerPage}
        />
      )}
    </div>
  );
}
