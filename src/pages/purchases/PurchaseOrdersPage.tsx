import { PaginatedTable } from "@components/shared/PaginatedTable";
import { InfoRow } from "../inventory/BookDetail/InfoRow";
import { format } from "date-fns";
import { useLocation } from "react-router-dom";
import { PaymentMadeForm } from "@components/PaymentMadeForm";
import { usePurchaseOrderStore } from "@/stores/usePurchaseOrder";
import { usePurchaseOrdersWithStore } from "@/hooks/usePurchaseOrders";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { downloadPurchaseOrder } from "@/utils/pdf/downloadPurchaseOrder";
import {
  OrderPaymentStatus,
  orderPaymentStatusConfig,
  OrderStatus,
  orderStatusConfig,
} from "@/types/orderStatusConfig";

// Opciones de estado de orden (puedes sincronizar con el backend)
const ORDER_STATUS_OPTIONS = [
  { label: "Todas", value: "" },
  { label: "Pendiente", value: "PENDING" },
  { label: "En progreso", value: "IN_PROGRESS" },
  { label: "Enviado", value: "SHIPPED" },
  { label: "Completado", value: "COMPLETED" },
  { label: "Cancelado", value: "CANCELLED" },
];

export const PurchaseOrdersPage = () => {
  const location = useLocation();
  const isNewPaymentMade = location.pathname.endsWith("/newPaymentMade");

  const {
    currentPage,
    itemsPerPage,
    filters,
    setCurrentPage,
    setItemsPerPage,
    setFilter,
  } = usePurchaseOrderStore();

  const [searchTerm, setSearchTerm] = useState(filters.search || "");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

  // 🔹 Actualizar filtro de búsqueda con debounce
  useEffect(() => {
    setFilter("search", debouncedSearchTerm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm]);

  // 🔹 Dropdown de estado de orden
  const dropdownOptions = ORDER_STATUS_OPTIONS.map((o) => o.label);
  const dropdownLabel = "Filtrar por estado";
  const dropdownValue =
    ORDER_STATUS_OPTIONS.find((s) => s.value === filters.status)?.label ||
    dropdownLabel;

  const handleDropdownSelect = (label: string) => {
    const status = ORDER_STATUS_OPTIONS.find((s) => s.label === label)?.value;
    setFilter("status", status || "");
  };

  // 🔹 Obtener datos desde el backend (React Query)
  const {
    data: purchaseOrdersPage,
    isLoading,
    isError,
  } = usePurchaseOrdersWithStore();

  const orders = purchaseOrdersPage?.content ?? [];

  if (isNewPaymentMade) {
    return <PaymentMadeForm />;
  }

  return (
    <PaginatedTable
      title="Órdenes de compra"
      dropdownOptions={dropdownOptions}
      dropdownLabel={dropdownLabel}
      dropdownValue={dropdownValue}
      onDropdownSelect={handleDropdownSelect}
      searchPlaceholder="Buscar órdenes de compra"
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      columns={[
        {
          key: "purchaseDate",
          header: "Fecha de compra",
          render: (p) => (
            <InfoRow
              label=""
              value={
                p.purchaseDate
                  ? format(new Date(p.purchaseDate), "dd/MM/yyyy")
                  : "-"
              }
            />
          ),
        },
        {
          key: "purchaseOrderNumber",
          header: "N° de orden",
          render: (p) => (
            <InfoRow label="" value={p.purchaseOrderNumber || "-"} />
          ),
        },
        {
          key: "supplier",
          header: "Proveedor",
          render: (p) => <InfoRow label="" value={p.supplier?.name || "-"} />,
        },
        {
          key: "purchaseChannel",
          header: "Canal de compra",
          render: (p) => <InfoRow label="" value={p.purchaseChannel || "-"} />,
        },
        {
          key: "status",
          header: "Estado de orden",
          render: (p) => {
            // Tipamos el estado
            const status = p.status as OrderStatus;

            // Obtenemos la configuración correspondiente
            const config = orderStatusConfig[status];

            // Si no existe, mostramos valor por defecto
            if (!config) return <InfoRow label="" value="-" />;

            return (
              <div className="flex items-center space-x-2">
                {/* círculo de color */}
                <span
                  className={`w-3 h-3 rounded-full ${config.color}`}
                  title={config.label}
                />
                {/* texto con color */}
                <InfoRow label="" value={config.label} />
              </div>
            );
          },
        },
        {
          key: "paymentStatus",
          header: "Estado de pago",
          render: (p) => {
            const paymentStatus = p.paymentStatus as OrderPaymentStatus;
            const config = orderPaymentStatusConfig[paymentStatus];
            if (!config) return <InfoRow label="" value="-" />;

            return (
              <div className="flex items-center space-x-2">
                <span className={`w-3 h-3 rounded-full ${config.color}`} />
                <InfoRow label="" value={config.label} />
              </div>
            );
          },
        },
        {
          key: "amount",
          header: "Total",
          render: (p) => (
            <InfoRow
              label=""
              value={p.totalAmount ? `S/. ${p.totalAmount.toFixed(2)}` : "-"}
            />
          ),
        },
        {
          key: "paid",
          header: "Pagado",
          render: (p) => (
            <InfoRow
              label=""
              value={p.totalPaid ? `S/. ${p.totalPaid.toFixed(2)}` : "-"}
            />
          ),
        },
        {
          key: "button",
          header: "Acciones",
          render: (p) => (
            <div className="flex gap-2">
              <button
                title="Descargar"
                onClick={() => downloadPurchaseOrder(p)}
                className="items-center px-4 py-2 bg-[--color-button] hover:bg-primary rounded transition-all text-white"
              >
                Descargar
              </button>
            </div>
          ),
        },
      ]}
      items={orders}
      isLoading={isLoading}
      isError={isError}
      currentPage={currentPage}
      itemsPerPage={itemsPerPage}
      totalPages={purchaseOrdersPage?.totalPages ?? 1}
      totalElements={purchaseOrdersPage?.totalElements ?? 0}
      onPageChange={setCurrentPage}
      onItemsPerPageChange={setItemsPerPage}
    />
  );
};
