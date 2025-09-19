import { useLocation } from "react-router-dom";
import CustomerCreationForm from "@components/CustomerForm/CustomerCreationForm";
import { PaginatedTable } from "@components/shared/PaginatedTable";
import { InfoRow } from "../inventory/BookDetail/InfoRow";
import { useCustomersWithStore } from "@/hooks/useCustomers";
import { useCustomerStore } from "@/stores/useCustomerStore";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

export function CustomerPage() {
  const location = useLocation();
  const isNewCustomer = location.pathname.endsWith("/newCustomer");

  const {
    currentPage,
    itemsPerPage,
    filters,
    setCurrentPage,
    setItemsPerPage,
    setFilter,
  } = useCustomerStore();

  // --- Estado local para la búsqueda global ---
  const [searchTerm, setSearchTerm] = useState(filters.search || "");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

  useEffect(() => {
    setFilter("search", debouncedSearchTerm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm]);

  // Opciones de estado (puedes adaptar según tu backend)
  const dropdownOptions = ["Todos", "Activos", "Inactivos"];
  const dropdownLabel = "Todos los clientes";
  //const dropdownValue = filters.status || dropdownLabel;

  const handleDropdownSelect = (label: string) => {
    setFilter("status", label === "Todos" ? "" : label);
  };

  const { data: saleOrdersPage, isLoading, isError } = useCustomersWithStore();
  const saleOrders = saleOrdersPage?.content ?? [];

  if (isNewCustomer) {
    return <CustomerCreationForm />;
  }

  return (
    <PaginatedTable
      title="Clientes"
      dropdownOptions={dropdownOptions}
      dropdownLabel={dropdownLabel}
      dropdownValue={filters.status || dropdownLabel}
      onDropdownSelect={handleDropdownSelect}
      searchPlaceholder="Buscar clientes"
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      newButtonLabel="Nuevo"
      newButtonTo="/dashboard/customer/newCustomer"
      newButtonClassName="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2"
      columns={[
        {
          key: "name",
          header: "Nombre / Razón Social",
          render: (c) =>
            c.customerType === "PERSON" ? (
              <InfoRow label="" value={c.name || "-"} />
            ) : (
              <InfoRow label="" value={c.companyName || "-"} />
            ),
        },
        {
          key: "type",
          header: "Tipo de cliente",
          render: (c) => (
            <InfoRow
              label=""
              value={c.customerType === "PERSON" ? "Individuo" : "Empresa"}
            />
          ),
        },
        {
          key: "email",
          header: "Correo",
          render: (c) => <InfoRow label="" value={c.email || "-"} />,
        },
        {
          key: "phone",
          header: "Teléfono",
          render: (c) => <InfoRow label="" value={c.phoneNumber || "-"} />,
        },
      ]}
      items={saleOrders}
      isLoading={isLoading}
      isError={isError}
      currentPage={currentPage}
      itemsPerPage={itemsPerPage}
      totalPages={saleOrdersPage?.totalPages ?? 1}
      totalElements={saleOrdersPage?.totalElements ?? 0}
      onPageChange={setCurrentPage}
      onItemsPerPageChange={setItemsPerPage}
    />
  );
}
