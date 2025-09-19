import { useLocation } from "react-router-dom";
import { PaginatedTable } from "@components/shared/PaginatedTable";
import { InfoRow } from "../inventory/BookDetail/InfoRow";
import { format } from "date-fns";
import { ShipmentCreationForm } from "@components/ShipmentForm";
import { useShipmentsWithStore } from "@/hooks/useShipments";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { useShipmentStore } from "@/stores/useShipmentStore";

export function ShipmentPage() {
  const location = useLocation();
  const isNewShipment = location.pathname.endsWith("/newShipment");

  const {
    currentPage,
    itemsPerPage,
    filters,
    setCurrentPage,
    setItemsPerPage,
    setFilter,
  } = useShipmentStore();

  // --- Estado local para la búsqueda global ---
  const [searchTerm, setSearchTerm] = useState(filters.search || "");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

  useEffect(() => {
    setFilter("search", debouncedSearchTerm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm]);

  // Opciones de métodos de envío (por ahora solo "Todos")
  const dropdownOptions = ["Todos"];
  const dropdownLabel = "Todos los envíos";

  const handleDropdownSelect = (label: string) => {
    // 🚨 Filtro aún no implementado, siempre reseteamos a vacío
    setFilter("shippingMethodId", label === "Todos" ? "" : label);
  };

  const { data: shipmentsPage, isLoading, isError } = useShipmentsWithStore();
  const shipments = shipmentsPage?.content ?? [];

  if (isNewShipment) {
    return <ShipmentCreationForm />;
  }

  return (
    <PaginatedTable
      title="Envíos"
      dropdownOptions={dropdownOptions}
      dropdownLabel={dropdownLabel}
      dropdownValue={dropdownLabel} // siempre muestra "Todos los métodos"
      onDropdownSelect={handleDropdownSelect} 
      searchPlaceholder="Buscar envíos"
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      newButtonClassName="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2"
      columns={[
        {
          key: "date",
          header: "Fecha",
          render: (s) => (
            <InfoRow
              label=""
              value={
                s.shipmentDate
                  ? format(new Date(s.shipmentDate), "dd/MM/yyyy")
                  : "-"
              }
            />
          ),
        },
        {
          key: "id",
          header: "N° de envío",
          render: (s) => <InfoRow label="" value={s.id || "-"} />,
        },
        {
          key: "trackingNumber",
          header: "N° de rastreo",
          render: (s) => <InfoRow label="" value={s.trackingNumber || "-"} />,
        },
        {
          key: "address",
          header: "Dirección",
          render: (s) => <InfoRow label="" value={s.address || "-"} />,
        },
        {
          key: "shipmentFee",
          header: "Costo de envío",
          render: (s) => (
            <InfoRow
              label=""
              value={
                s.shippingFee !== undefined
                  ? `S/. ${s.shippingFee.toFixed(2)}`
                  : "-"
              }
            />
          ),
        },
        {
          key: "shipmentMethod",
          header: "Método de envío",
          render: (s) => (
            <InfoRow label="" value={s.shipmentMethod?.name || "-"} />
          ),
        },
      ]}
      items={shipments}
      isLoading={isLoading}
      isError={isError}
      currentPage={currentPage}
      itemsPerPage={itemsPerPage}
      totalPages={shipmentsPage?.totalPages ?? 1}
      totalElements={shipmentsPage?.totalElements ?? 0}
      onPageChange={setCurrentPage}
      onItemsPerPageChange={setItemsPerPage}
    />
  );
}
