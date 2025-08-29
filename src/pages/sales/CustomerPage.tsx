import { useState, useEffect } from "react";
import { SearchBar } from "@components/SearchBar/SearchBar";
import { InfoRow } from "../inventory/BookDetail/InfoRow";
import NewButton from "@components/NewButton";
import { DropdownMenu } from "@components/HeaderNavigation/DropdownMenu";
import { useLocation } from "react-router-dom";
import CustomerCreationForm from "@components/CustomerForm/CustomerCreationForm";
import { useCustomers } from "@/hooks/useCustomers";
import PaginationBar from "@components/shared/pagination/PaginationBar";

export function CustomerPage() {
  const location = useLocation();
  const isNewCustomer = location.pathname.endsWith("/newCustomer");
  const isCustomerView = location.pathname.match(/^\/dashboard\/customer\/.+$/);

  // Estado local de paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  // Hook para obtener clientes paginados
  const {
    data: customersPage,
    isLoading,
    isError,
  } = useCustomers(currentPage - 1, itemsPerPage);
  const customers = customersPage?.content || [];

  // Resetear página si cambia itemsPerPage
  useEffect(() => {
    setCurrentPage(1);
  }, [itemsPerPage]);

  if (isNewCustomer) return <CustomerCreationForm />;

  if (isCustomerView) {
    return (
      <div className="bg-white border rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold">Detalle de cliente</h2>
        {/* Detalle de cliente */}
      </div>
    );
  }

  return (
    <div className="bg-white border rounded-lg shadow-sm p-4">
      <div className="flex justify-between items-start px-4 pt-4">
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
        {isLoading ? (
          <div className="text-center py-4">Cargando clientes...</div>
        ) : isError ? (
          <div className="text-center py-4 text-red-500">
            Error al cargar clientes
          </div>
        ) : customers.length === 0 ? (
          <div className="text-center py-4 text-gray-500">No hay clientes</div>
        ) : (
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left">
                <th className="py-2 px-4">Nombre / Razón Social</th>
                <th className="py-2 px-4">Tipo de cliente</th>
                <th className="py-2 px-4">Correo</th>
                <th className="py-2 px-4">Teléfono</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {customers.map((customer) => (
                <tr key={customer.id} className="text-gray-700">
                  <td className="py-2 px-4">
                    <InfoRow
                      label=""
                      value={
                        customer.customerType === "PERSON"
                          ? customer.name || "-"
                          : customer.companyName || "-"
                      }
                    />
                  </td>
                  <td className="py-2 px-4">
                    <InfoRow
                      label=""
                      value={
                        customer.customerType === "PERSON"
                          ? "Individuo"
                          : "Empresa"
                      }
                    />
                  </td>
                  <td className="py-2 px-4">
                    <InfoRow label="" value={customer.email || "-"} />
                  </td>
                  <td className="py-2 px-4">
                    <InfoRow label="" value={customer.phoneNumber || "-"} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Paginación abajo */}
      {customersPage && (
        <PaginationBar
          currentPage={currentPage}
          totalPages={customersPage.totalPages}
          totalElements={customersPage.totalElements}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={setItemsPerPage}
        />
      )}
    </div>
  );
}
