import { PaginatedTable } from "@components/shared/PaginatedTable";
import { usePaymentReceived } from "@/hooks/usePaymentReceived"; // <-- deberías crearlo igual que useCustomers
import { InfoRow } from "../inventory/BookDetail/InfoRow";
import { format } from "date-fns";
import { useLocation } from "react-router-dom";
import { PaymentReceivedCreationForm } from "@components/PaymentReceivedCreationForm";

export function PaymentReceivedPage() {
  const location = useLocation();
  const isNewPaymentReceived = location.pathname.endsWith(
    "/newPaymentReceived"
  );

  if (isNewPaymentReceived) {
    return <PaymentReceivedCreationForm />;
  }

  return (
    <PaginatedTable
      title="Pagos recibidos"
      dropdownOptions={["Todos", "Efectivo", "Transferencia", "Tarjeta"]}
      dropdownLabel="Filtrar por método"
      searchPlaceholder="Buscar pagos"
      usePaginatedHook={usePaymentReceived}
      columns={[
        {
          key: "date",
          header: "Fecha",
          render: (p) => (
            <InfoRow
              label=""
              value={
                p.paymentDate
                  ? format(new Date(p.paymentDate), "dd/MM/yyyy")
                  : "-"
              }
            />
          ),
        },
        {
          key: "id",
          header: "N° de pago",
          render: (p) => <InfoRow label="" value={p.id || "-"} />,
        },
        {
          key: "orden",
          header: "N° de orden",
          render: (p) => <InfoRow label="" value={p.saleOrderNumber || "-"} />,
        },
        {
          key: "reference",
          header: "N° de referencia",
          render: (p) => <InfoRow label="" value={p.referenceNumber || "-"} />,
        },
        {
          key: "customer",
          header: "Cliente",
          render: (p) => (
            <InfoRow
              label=""
              value={
                p.customer.customerType == "PERSON"
                  ? p.customer.name
                  : p.customer.companyName || "-"
              }
            />
          ),
        },
        {
          key: "amount",
          header: "Monto",
          render: (p) => (
            <InfoRow
              label=""
              value={p.amount ? `S/. ${p.amount.toFixed(2)}` : "-"}
            />
          ),
        },
        {
          key: "method",
          header: "Método de pago",
          render: (p) => <InfoRow label="" value={p.paymentMethod || "-"} />,
        },
      ]}
    />
  );
}
