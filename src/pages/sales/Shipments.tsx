import { PaginatedTable } from "@components/shared/PaginatedTable";
import { useShipments } from "@/hooks/useShipments";
import { InfoRow } from "../inventory/BookDetail/InfoRow";
import { format } from "date-fns";
import { useLocation } from "react-router-dom";
import { ShipmentCreationForm } from "@components/ShipmentForm";

export function ShipmentPage() {
  const location = useLocation();
  const isNewShipment = location.pathname.endsWith("/newShipment");

  if (isNewShipment) {
    return <ShipmentCreationForm />;
  }

  return (
    <PaginatedTable
      title="Envíos"
      dropdownOptions={["Todos", "Pendiente", "En proceso", "Enviado"]}
      dropdownLabel="Filtrar por método"
      searchPlaceholder="Buscar envíos"
      usePaginatedHook={useShipments}
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
                s.shippingFee || 0 === 0
                  ? `S/. ${s.shippingFee?.toFixed(2)}`
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
    />
  );
}
