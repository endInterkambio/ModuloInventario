import { SearchBar } from "@components/SearchBar/SearchBar";
import { InfoRow } from "../inventory/BookDetail/InfoRow";
import NewButton from "@components/NewButton";
import { DropdownMenu } from "@components/HeaderNavigation/DropdownMenu";
import { useLocation } from "react-router-dom";
import { CustomerCreationForm } from "@components/CustomerForm/CustomerCreationForm";

export function CustomerPage() {
  const location = useLocation();
  const isNewCustomer = location.pathname.endsWith("/newCustomer");
  const isCustomerView = location.pathname.match(/^\/dashboard\/customer\/.+$/);

  if (isNewCustomer) {
    return <CustomerCreationForm />;
  }

  if (isCustomerView) {
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
        {/* 🔽 Dropdown reutilizable */}
        <DropdownMenu
          label="Todas los clientes"
          options={[
            "Todas los clientes",
            "Clientes activos",
            "Clientes inactivos",
          ]}
        />
        <SearchBar placeholder="Buscar clientes" />
        <NewButton to={"/dashboard/customer/newCustomer"} label={"Nuevo"} />
      </div>

      <div className="overflow-x-auto py-5">
        <table className="min-w-full text-sm">
          <tbody className="divide-y">
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
                value={"Nombre de la empresa"}
              />
            </td>
            <td className="py-4 text-gray-700">
              <InfoRow
                className="py-4 w-30"
                label=""
                value={"Correo electrónico"}
              />
            </td>
            <td className="py-4 text-gray-700">
              <InfoRow className="py-4 w-30" label="" value={"Teléfono"} />
            </td>
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-sm text-gray-500">
        {"Cantidad: "} clientes
      </div>
      {/* <PaginationBar /> */}
    </div>
  );
}
