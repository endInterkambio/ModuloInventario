import { SearchBar } from "@components/SearchBar/SearchBar";
import { InfoRow } from "../inventory/BookDetail/InfoRow";
import NewButton from "@components/NewButton";
import { DropdownMenu } from "@components/HeaderNavigation/DropdownMenu";
import { useLocation } from "react-router-dom";
import SalesOrderForm from "@components/SalesOrderForm/SalesOrderForm";
import { useState } from "react";
import { useSaleOrders } from "@/hooks/useSaleOrders";
import { format } from "date-fns";

export function SaleOrdersPage() {
  const location = useLocation();
  const isNewSaleOrder = location.pathname.endsWith("/newSaleOrder");
  const isSaleOrderView = location.pathname.match(/^\/dashboard\/selling\/.+$/);

  const [page, setPage] = useState(0);
  const size = 12;

  const { data, isLoading, isError } = useSaleOrders(page, size);

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
          options={[
            "Todas las ordenes de venta",
            "Pendiente",
            "Confirmado",
            "Enviado",
            "Facturado",
          ]}
        />
        <SearchBar placeholder="Buscar ordenes de venta" />
        <NewButton to={"/dashboard/selling/newSaleOrder"} label={"Nueva"} />
      </div>

      <div className="overflow-x-auto py-5">
        {isLoading ? (
          <div className="text-center py-10">Cargando ordenes de venta...</div>
        ) : isError ? (
          <div className="text-center py-10 text-red-500">
            Error al cargar las ordenes de venta
          </div>
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
              {data?.content.map((order) => (
                <tr key={order.id}>
                  <td className="py-2 px-4">
                    <InfoRow
                      className="py-2"
                      label=""
                      value={
                        order.createdAt
                          ? format(new Date(order.createdAt), "dd/MM/yyyy")
                          : "-"
                      }
                    />
                  </td>
                  <td className="py-2 px-4">
                    <InfoRow
                      className="py-2"
                      label=""
                      value={order.orderNumber}
                    />
                  </td>
                  <td className="py-2 px-4">
                    <InfoRow
                      className="py-2"
                      label=""
                      value={order.customer.name || "-"}
                    />
                  </td>
                  <td className="py-2 px-4">
                    <InfoRow
                      className="py-2"
                      label=""
                      value={
                        order.customer?.customerType === "PERSON"
                          ? order.customer?.name ?? "-"
                          : order.customer?.companyName ?? "-"
                      }
                    />
                  </td>
                  {/*TODO: Estado del pedido*/}
                  <td className="py-2 px-4">
                    <InfoRow className="py-2" label="" value={"-"} />
                  </td>
                  {/*TODO: Facturada?*/}
                  <td className="py-2 px-4">
                    <InfoRow className="py-2" label="" value={"-"} />
                  </td>
                  {/*TODO: Pago recibido SI o NO*/}
                  <td className="py-2 px-4">
                    <InfoRow className="py-2" label="" value={"-"} />
                  </td>
                  {/*TODO: Status de envío*/}
                  <td className="py-2 px-4">
                    <InfoRow className="py-2" label="" value={"-"} />
                  </td>
                  <td className="py-2 px-4">
                    <InfoRow
                      className="py-2"
                      label=""
                      value={order.amount ?? "-"}
                    />
                  </td>
                  {/*TODO: Monto facturado*/}
                  <td className="py-2 px-4">
                    <InfoRow className="py-2" label="" value={"-"} />
                  </td>
                  <td className="py-2 px-4">
                    <InfoRow className="py-2" label="" value={order.saleChannel} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="mt-4 text-sm text-gray-500">
        {"Cantidad: "} {data?.totalElements ?? 0} ordenes de venta
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <button
          className="px-3 py-1 border rounded disabled:opacity-50"
          disabled={page === 0}
          onClick={() => setPage((p) => p - 1)}
        >
          Anterior
        </button>
        <button
          className="px-3 py-1 border rounded disabled:opacity-50"
          disabled={page + 1 >= (data?.totalPages ?? 1)}
          onClick={() => setPage((p) => p + 1)}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
