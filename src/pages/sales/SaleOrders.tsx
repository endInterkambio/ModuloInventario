import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { SearchBar } from "@components/SearchBar/SearchBar";
import { InfoRow } from "../inventory/BookDetail/InfoRow";
import NewButton from "@components/NewButton";
import { DropdownMenu } from "@components/HeaderNavigation/DropdownMenu";
import PaginationBar from "@components/shared/pagination/PaginationBar";
import SalesOrderForm from "@components/SalesOrderForm/SalesOrderForm";
import { useSaleOrders } from "@/hooks/useSaleOrders";
import { format } from "date-fns";

export function SaleOrdersPage() {
  const location = useLocation();
  const isNewSaleOrder = location.pathname.endsWith("/newSaleOrder");
  const isSaleOrderView = location.pathname.match(/^\/dashboard\/selling\/.+$/);

  // Estado local de paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  // Hook para obtener ordenes de venta paginadas
  const { data: saleOrdersPage, isLoading, isError } = useSaleOrders(
    currentPage - 1,
    itemsPerPage
  );
  const saleOrders = saleOrdersPage?.content || [];

  // Resetear página si cambia itemsPerPage
  useEffect(() => {
    setCurrentPage(1);
  }, [itemsPerPage]);

  if (isNewSaleOrder) return <SalesOrderForm />;

  if (isSaleOrderView) {
    return (
      <div className="bg-white border rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold">Detalle de orden de venta</h2>
        {/* Aquí iría el detalle de una orden específica */}
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
        <NewButton to={"/dashboard/selling/newSaleOrder"} label="Nueva" />
      </div>

      <div className="overflow-x-auto py-5">
        {isLoading ? (
          <div className="text-center py-10">Cargando ordenes de venta...</div>
        ) : isError ? (
          <div className="text-center py-10 text-red-500">
            Error al cargar las ordenes de venta
          </div>
        ) : saleOrders.length === 0 ? (
          <div className="text-center py-10 text-gray-500">No hay ordenes de venta</div>
        ) : (
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-gray-700">
                <th className="py-2 px-4">Fecha</th>
                <th className="py-2 px-4">Orden de venta N°</th>
                <th className="py-2 px-4">Nombre del cliente</th>
                <th className="py-2 px-4">Tipo de cliente</th>
                <th className="py-2 px-4">Estado del pedido</th>
                <th className="py-2 px-4">Facturada</th>
                <th className="py-2 px-4">Pago</th>
                <th className="py-2 px-4">Enviado</th>
                <th className="py-2 px-4">Monto</th>
                <th className="py-2 px-4">Monto facturado</th>
                <th className="py-2 px-4">Canal de venta</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {saleOrders.map((order) => (
                <tr key={order.id}>
                  <td className="py-2 px-4">
                    <InfoRow
                      label=""
                      className="py-2"
                      value={
                        order.createdAt
                          ? format(new Date(order.createdAt), "dd/MM/yyyy")
                          : "-"
                      }
                    />
                  </td>
                  <td className="py-2 px-4">
                    <InfoRow label="" className="py-2" value={order.orderNumber} />
                  </td>
                  <td className="py-2 px-4">
                    <InfoRow label="" className="py-2" value={order.customer?.name ?? "-"} />
                  </td>
                  <td className="py-2 px-4">
                    <InfoRow
                      label=""
                      className="py-2"
                      value={
                        order.customer?.customerType === "PERSON"
                          ? order.customer?.name ?? "-"
                          : order.customer?.companyName ?? "-"
                      }
                    />
                  </td>
                  {/* TODO: campos pendientes */}
                  <td className="py-2 px-4">
                    <InfoRow label="" className="py-2" value="-" />
                  </td>
                  <td className="py-2 px-4">
                    <InfoRow label="" className="py-2" value="-" />
                  </td>
                  <td className="py-2 px-4">
                    <InfoRow label="" className="py-2" value="-" />
                  </td>
                  <td className="py-2 px-4">
                    <InfoRow label="" className="py-2" value="-" />
                  </td>
                  <td className="py-2 px-4">
                    <InfoRow label="" className="py-2" value={order.amount ?? "-"} />
                  </td>
                  <td className="py-2 px-4">
                    <InfoRow label="" className="py-2" value="-" />
                  </td>
                  <td className="py-2 px-4">
                    <InfoRow label="" className="py-2" value={order.saleChannel ?? "-"} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Paginación abajo */}
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
