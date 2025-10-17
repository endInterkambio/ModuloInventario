import { PaginatedTable } from "@components/shared/PaginatedTable";
import { InfoRow } from "../inventory/BookDetail/InfoRow";
import { format } from "date-fns";
import { useLocation } from "react-router-dom";
import { PaymentMadeForm } from "@components/PaymentMadeForm";
import { usePaymentMadeStore } from "@/stores/usePaymentMadeStore";
import { usePaymentMadeWithStore } from "@/hooks/usePaymentMade";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

export function PaymentMadePage() {
  const location = useLocation();
  const isNewPaymentMade = location.pathname.endsWith("/newPaymentMade");

  const {
    currentPage,
    itemsPerPage,
    filters,
    setCurrentPage,
    setItemsPerPage,
    setFilter,
  } = usePaymentMadeStore();

  const [searchTerm, setSearchTerm] = useState(filters.search || "");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

  // 🔹 Actualiza el filtro de búsqueda general
  useEffect(() => {
    setFilter("search", debouncedSearchTerm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm]);

  const { data: paymentsPage, isLoading, isError } = usePaymentMadeWithStore();

  const payments = paymentsPage?.content ?? [];

  if (isNewPaymentMade) {
    return <PaymentMadeForm />;
  }

  return (
    <PaginatedTable
      title="Pagos realizados"
      searchPlaceholder="Buscar pagos"
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      columns={[
        {
          key: "paymentDate",
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
        // {
        //   key: "id",
        //   header: "N° de pago",
        //   render: (p) => <InfoRow label="" value={p.id || "-"} />,
        // },
        {
          key: "purchaseOrderNumber",
          header: "N° de orden de compra",
          render: (p) => (
            <InfoRow label="" value={p.purchaseOrderNumber || "-"} />
          ),
        },
        {
          key: "supplier",
          header: "Proveedor",
          render: (p) => (
            <InfoRow
            label=""
            value={p.supplier.name || "-"}
            />
          )
        },
        {
          key: "referenceNumber",
          header: "N° de referencia",
          render: (p) => <InfoRow label="" value={p.referenceNumber || "-"} />,
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
          key: "paymentMethod",
          header: "Método de pago",
          render: (p) => <InfoRow label="" value={p.paymentMethod || "-"} />,
        },
      ]}
      items={payments}
      isLoading={isLoading}
      isError={isError}
      currentPage={currentPage}
      itemsPerPage={itemsPerPage}
      totalPages={paymentsPage?.totalPages ?? 1}
      totalElements={paymentsPage?.totalElements ?? 0}
      onPageChange={setCurrentPage}
      onItemsPerPageChange={setItemsPerPage}
    />
  );
}
