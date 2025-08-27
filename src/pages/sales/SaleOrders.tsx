import { SearchBar } from "@components/SearchBar/SearchBar";
import { InfoRow } from "../inventory/BookDetail/InfoRow";
import NewButton from "@components/NewButton";
import { DropdownMenu } from "@components/HeaderNavigation/DropdownMenu";

export function SaleOrdersPage() {
  return (
    <div className="bg-white border rounded-lg shadow-sm p-4">
      <div className="flex justify-between items-start px-4 pt-4">
        {/* 🔽 Dropdown reutilizable */}
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
        <table className="min-w-full text-sm">
          <tbody className="divide-y">
            <td className="py-4 text-gray-700">
              <InfoRow className="py-4 w-16" label="" value={"Fecha"} />
            </td>
            <td className="py-4 text-gray-700">
              <InfoRow
                className="py-4 w-30"
                label=""
                value={"Orden de venta N°"}
              />
            </td>
            <td className="py-4 text-gray-700">
              <InfoRow
                className="py-4 w-30"
                label=""
                value={"Nombre del cliente"}
              />
            </td>
            <td className="py-4 text-gray-700">
              <InfoRow
                className="py-4 w-30"
                label=""
                value={"Tipo de cliente"}
              />
            </td>
            <td className="py-4 text-gray-700">
              <InfoRow
                className="py-4 w-30"
                label=""
                value={"Estado del pedido"}
              />
            </td>
            <td className="py-4 text-gray-700">
              <InfoRow className="py-4 w-16" label="" value={"Facturada"} />
            </td>
            <td className="py-4 text-gray-700">
              <InfoRow className="py-4 w-16" label="" value={"Pago"} />
            </td>
            <td className="py-4 text-gray-700">
              <InfoRow className="py-4 w-16" label="" value={"Enviado"} />
            </td>
            <td className="py-4 text-gray-700">
              <InfoRow className="py-4 w-16" label="" value={"Monto"} />
            </td>
            <td className="py-4 text-gray-700">
              <InfoRow
                className="py-4 w-30"
                label=""
                value={"Monto facturado"}
              />
            </td>
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-sm text-gray-500">
        {"Cantidad: "} ordenes de compra
      </div>
      {/* <PaginationBar /> */}
    </div>
  );
}
