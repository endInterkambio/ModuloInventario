import { useLocation } from "react-router-dom";
import { PaginatedTable } from "@components/shared/PaginatedTable";
import { InfoRow } from "../inventory/BookDetail/InfoRow";
import { useSuppliersWithStore, useUpdateSupplier } from "@/hooks/useSuppliers";
import { useSupplierStore } from "@/stores/useSupplierStore";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import toast from "react-hot-toast";
import { SupplierForm } from "@components/SupplierForm";

// Puedes adaptar estos tipos según tu backend
const SUPPLIER_TYPES = [
  { label: "Nacional", value: "NATIONAL" },
  { label: "Internacional", value: "INTERNATIONAL" },
];

export function SuppliersPage() {
  const location = useLocation();
  const isNewSupplier = location.pathname.endsWith("/newSupplier");

  const {
    currentPage,
    itemsPerPage,
    filters,
    setCurrentPage,
    setItemsPerPage,
    setFilter,
  } = useSupplierStore();

  const { mutate: updateSupplier } = useUpdateSupplier({
    onSuccess: () => toast.success("Proveedor actualizado correctamente"),
  });

  // --- Estado local para la búsqueda global ---
  const [searchTerm, setSearchTerm] = useState(filters.search || "");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

  useEffect(() => {
    setFilter("search", debouncedSearchTerm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm]);

  // --- Opciones de dropdown (ejemplo: tipo de proveedor) ---
  const dropdownOptions = ["Todos", ...SUPPLIER_TYPES.map((t) => t.label)];
  const dropdownLabel = "Todos los proveedores";
  const dropdownValue =
    SUPPLIER_TYPES.find((t) => t.value === filters.supplierType)?.label ||
    dropdownLabel;

  const handleDropdownSelect = (label: string) => {
    if (label === "Todos") {
      setFilter("supplierType", "");
      return;
    }
    const supplierType = SUPPLIER_TYPES.find((t) => t.label === label)?.value;
    setFilter("supplierType", supplierType || "");
  };

  const { data: suppliersPage, isLoading, isError } = useSuppliersWithStore();
  const suppliers = suppliersPage?.content ?? [];

  if (isNewSupplier) {
    return <SupplierForm />;
  }

  return (
    <PaginatedTable
      title="Proveedores"
      dropdownOptions={dropdownOptions}
      dropdownLabel={dropdownLabel}
      dropdownValue={dropdownValue}
      onDropdownSelect={handleDropdownSelect}
      searchPlaceholder="Buscar proveedores"
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      newButtonLabel="Nuevo"
      newButtonTo="/dashboard/suppliers/newSupplier"
      newButtonClassName="flex items-center gap-2 bg-[--color-button] hover:bg-primary text-white px-4 py-2"
      columns={[
        {
          key: "name",
          header: "Nombre / Empresa",
          render: (s) => (
            <InfoRow
              label=""
              value={s.name || "-"}
              editable={true}
              onSave={(newValue) =>
                updateSupplier({ id: s.id, data: { name: newValue } })
              }
            />
          ),
        },
        {
          key: "contactPerson",
          header: "Persona de contacto",
          render: (s) => (
            <InfoRow
              label=""
              value={s.contactPerson || "-"}
              editable={true}
              onSave={(newValue) =>
                updateSupplier({ id: s.id, data: { contactPerson: newValue } })
              }
            />
          ),
        },
        {
          key: "email",
          header: "Correo electrónico",
          render: (s) => (
            <InfoRow
              label=""
              value={s.email || "-"}
              editable={true}
              onSave={(newValue) =>
                updateSupplier({ id: s.id, data: { email: newValue } })
              }
            />
          ),
        },
        {
          key: "phoneNumber",
          header: "Teléfono",
          render: (s) => (
            <InfoRow
              label=""
              value={s.phoneNumber || "-"}
              editable={true}
              onSave={(newValue) =>
                updateSupplier({ id: s.id, data: { phoneNumber: newValue } })
              }
            />
          ),
        },
        {
          key: "address",
          header: "Dirección",
          render: (s) => (
            <InfoRow
              label=""
              value={s.address || "-"}
              editable={true}
              onSave={(newValue) =>
                updateSupplier({ id: s.id, data: { address: newValue } })
              }
            />
          ),
        },
      ]}
      items={suppliers}
      isLoading={isLoading}
      isError={isError}
      currentPage={currentPage}
      itemsPerPage={itemsPerPage}
      totalPages={suppliersPage?.totalPages ?? 1}
      totalElements={suppliersPage?.totalElements ?? 0}
      onPageChange={setCurrentPage}
      onItemsPerPageChange={setItemsPerPage}
    />
  );
}
