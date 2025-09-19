import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { SearchBar } from "@components/SearchBar/SearchBar";
import NewButton from "@components/NewButton";
import { DropdownMenu } from "@components/HeaderNavigation/DropdownMenu";
import PaginationBar from "@components/shared/pagination/PaginationBar";
import { useSaleOrders } from "@/hooks/useSaleOrders";
import { SalesOrderForm } from "@components/SalesOrderForm";
import { SaleOrdersTable } from "@components/SalesOrders/SaleOrdersTable";
import { SaleOrdersCards } from "@components/SalesOrders/SaleOrdersCards";

export function SaleOrdersPage() {
  const location = useLocation();
  const isNewSaleOrder = location.pathname.endsWith("/newSaleOrder");
  const isSaleOrderView = location.pathname.match(/^\/dashboard\/selling\/.+$/);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  const { data: saleOrdersPage, isLoading, isError } = useSaleOrders(
    currentPage - 1,
    itemsPerPage
  );
  const saleOrders = saleOrdersPage?.content ?? [];

  useEffect(() => {
    setCurrentPage(1);
  }, [itemsPerPage]);

  if (isNewSaleOrder) return <SalesOrderForm />;

  if (isSaleOrderView) {
    return (
      <div className="bg-white border rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold">Detalle de orden de venta</h2>
      </div>
    );
  }

  return (
    <div className="bg-white border rounded-lg shadow-sm p-4">
      <div className="flex justify-between items-start px-4 pt-4">
        <DropdownMenu
          label="Todas las ordenes de venta"
          options={["Todas", "Pendiente", "Confirmado", "Enviado", "Facturado"]}
        />
        <SearchBar placeholder="Buscar ordenes de venta" />
        <NewButton to={"/dashboard/selling/newSaleOrder"} label="Nueva" className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium transition-colors" />
      </div>

      <div className="overflow-x-auto py-5">
        {isLoading ? (
          <div className="text-center py-10">Cargando ordenes de venta...</div>
        ) : isError ? (
          <div className="text-center py-10 text-red-500">
            Error al cargar las ordenes de venta
          </div>
        ) : saleOrders.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            No hay ordenes de venta
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
