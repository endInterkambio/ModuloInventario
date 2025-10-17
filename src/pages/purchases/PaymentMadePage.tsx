import { PaginatedTable } from "@components/shared/PaginatedTable";
import { InfoRow } from "../inventory/BookDetail/InfoRow";
import { format } from "date-fns";
import { useLocation } from "react-router-dom";
import { PaymentMadeForm } from "@components/PaymentMadeForm";
import { usePaymentMadeStore } from "@/stores/usePaymentMadeStore";
import { usePaymentMadeWithStore } from "@/hooks/usePaymentMade";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { PAYMENT_METHODS } from "@/types/paymentMethods";

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

  // 🔹 Mapear labels a values para búsqueda global
  const labelToValueMap = Object.fromEntries(
    PAYMENT_METHODS.map((m) => [m.label.toLowerCase(), m.value])
  );

  // 🔹 Actualiza el filtro de búsqueda general
  useEffect(() => {
    const mappedSearch =
      labelToValueMap[debouncedSearchTerm.toLowerCase()] || debouncedSearchTerm;
    setFilter("search", mappedSearch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm]);

  const dropdownOptions = ["Todos", ...PAYMENT_METHODS.map((m) => m.label)];
  const dropdownLabel = "Filtrar por método";
  const dropdownValue =
    PAYMENT_METHODS.find((m) => m.value === filters.paymentMethod)?.label ||
    dropdownLabel;

  const handleDropdownSelect = (label: string) => {
    if (label === "Todos") {
      setFilter("paymentMethod", "");
      return;
    }
    const method = PAYMENT_METHODS.find((m) => m.label === label)?.value;
    setFilter("paymentMethod", method || "");
  };

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
          render: (p) => <InfoRow label="" value={p.supplier.name || "-"} />,
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
          key: "method",
          header: "Método de pago",
          render: (p) => {
            const methodLabel =
              PAYMENT_METHODS.find((m) => m.value === p.paymentMethod)?.label ||
              p.paymentMethod ||
              "-";
            return <InfoRow label="" value={methodLabel} />;
          },
        },
      ]}
      dropdownOptions={dropdownOptions}
      dropdownLabel={dropdownLabel}
      dropdownValue={dropdownValue}
      onDropdownSelect={handleDropdownSelect}
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
