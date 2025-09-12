import { useLocation } from "react-router-dom";
import CustomerCreationForm from "@components/CustomerForm/CustomerCreationForm";
import { PaginatedTable } from "@components/shared/PaginatedTable";
import { InfoRow } from "../inventory/BookDetail/InfoRow";
import { useCustomers } from "@/hooks/useCustomers";

export function CustomerPage() {
  const location = useLocation();
  const isNewCustomer = location.pathname.endsWith("/newCustomer");

  if (isNewCustomer) {
    return <CustomerCreationForm />;
  }

  return (
    <PaginatedTable
      title="Clientes"
      dropdownOptions={["Todos", "Activos", "Inactivos"]}
      dropdownLabel="Todos los clientes"
      searchPlaceholder="Buscar clientes"
      newButtonLabel="Nuevo"
      newButtonTo="/dashboard/customer/newCustomer"
      newButtonClassName="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2"
      usePaginatedHook={useCustomers}
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
    />
  );
}
