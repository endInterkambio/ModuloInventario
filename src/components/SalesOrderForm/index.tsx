import { ClientSearchSection } from "./sections/ClientSearchSection";
import ArticlesTable from "./sections/ItemsTable";
import { FormField } from "./ui/FormField";
import { Input } from "./ui/Input";
import { Select } from "./ui/Select";
import { useSalesOrderForm } from "./hooks/useSaleOrdersForm";
import BackButton from "@components/shared/BackButton";
import { SummarySection } from "./sections/SummarySection";
import { useShipmentMethods } from "@/hooks/useShipmentMethod";
import { mapSaleOrderCustomerToCustomer } from "@/mappers/mapSaleOrderCustomerToCustomer";
import { mapCustomerToSaleOrderCustomer } from "@/mappers/mapCustomerToSaleOrderCustomer";
import { SALES_CHANNELS } from "./constants/SaleOrderOptions";
import {
  useCreateSaleOrder,
  useNextSaleOrderNumber,
} from "@/hooks/useSaleOrders";
import toast from "react-hot-toast";
import { getErrorMessage } from "@/utils/getErrorMessage";

export const SalesOrderForm = () => {
  const {
    salesOrder,
    searchTerm,
    setSearchTerm,
    updateSalesOrder,
    updateArticle,
    addArticle,
    removeArticle,
    shippingCost,
    chargeDiscountCost,
    handleShippingCostChange,
    handleChargeDiscountChange,
    subtotal,
    total,
    toNum,
  } = useSalesOrderForm();

  const { data: shipmentMethods } = useShipmentMethods();
  const { data: nextOrderNumber, isLoading } = useNextSaleOrderNumber();

  const shipmentMethodOptions =
    shipmentMethods?.map((method) => ({
      label: method.name,
      value: method.id.toString(),
    })) ?? [];

  const createSaleOrder = useCreateSaleOrder({
    onSuccess: () => {
      toast.success("Orden creada correctamente");
      // TODO: redirigir a la lista de órdenes, limpiar el form, etc.
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });

  const handleSubmit = (sendNow: boolean) => {
    const now = new Date();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...orderWithoutId } = salesOrder; //

    createSaleOrder.mutate({
      ...orderWithoutId,
      orderDate: new Date(salesOrder.orderDate).toISOString(),
      createdAt: now.toISOString(),
      amount: subtotal,
      amountShipment: toNum(shippingCost),
      additionalFee: toNum(chargeDiscountCost),
      totalAmount: subtotal + toNum(shippingCost) + toNum(chargeDiscountCost),
      status: sendNow ? "PENDING" : "PENDING",
      paymentStatus: "UNPAID",
    });
  };

  return (
    <div className="mx-auto p-6 bg-white min-h-screen">
      <BackButton />

      {/* Header */}
      <div className="pt-5 flex items-center justify-between mb-6 pb-4 border-b">
        <h1 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          🛒 Nueva orden de venta
        </h1>
      </div>

      <ClientSearchSection
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCustomer={
          salesOrder.customer
            ? mapSaleOrderCustomerToCustomer(salesOrder.customer)
            : null
        }
        onCustomerSelect={(customer) =>
          updateSalesOrder(
            "customer",
            customer ? mapCustomerToSaleOrderCustomer(customer) : null
          )
        }
      />

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <FormField label="Orden de venta n°">
          <Input
            value={
              isLoading
                ? "Cargando..."
                : salesOrder.orderNumber || nextOrderNumber || ""
            }
            readonly
            onChange={(v) => updateSalesOrder("orderNumber", v)}
          />
        </FormField>
        <FormField label="Fecha de orden de venta">
          <Input
            value={salesOrder.orderDate}
            onChange={(v) => updateSalesOrder("orderDate", v)}
          />
        </FormField>
        {/* Shipment Method */}
        <FormField label="Método de envío">
          <Select
            value={salesOrder.shipment?.shipmentMethod?.id?.toString() ?? ""}
            onChange={(v) => {
              if (!v) {
                // ❌ Si el usuario limpia selección, eliminamos shipment
                updateSalesOrder("shipment", undefined);
                return;
              }

              // ✅ Solo si selecciona algo, armamos el objeto
              const selected = shipmentMethodOptions.find((o) => o.value === v);

              updateSalesOrder("shipment", {
                ...(salesOrder.shipment ?? {}),
                order: {
                  id: salesOrder.id,
                  name: salesOrder.orderNumber || "",
                }, // obligatorio para ShipmentDTO
                shipmentMethod: {
                  id: Number(v),
                  name: selected?.label ?? "",
                },
              });
            }}
            options={[
              { label: "Seleccionar método", value: "" }, // opción vacía
              ...shipmentMethodOptions,
            ]}
          />
        </FormField>

        <FormField label="Canal de Venta (+)">
          <Select
            value={salesOrder.saleChannel ?? ""}
            onChange={(v) => updateSalesOrder("saleChannel", v)}
            options={SALES_CHANNELS.map((channel) => ({
              label: channel,
              value: channel,
            }))}
          />
        </FormField>
      </div>

      {/* Articles Table */}
      <ArticlesTable
        articles={salesOrder.items}
        onItemUpdate={updateArticle}
        onAddArticle={addArticle}
        onRemoveArticle={removeArticle}
      />

      {/* Summary */}
      <SummarySection
        subtotal={subtotal}
        shippingFee={shippingCost}
        chargeDiscountCost={chargeDiscountCost}
        total={total}
        onShippingFeeChange={handleShippingCostChange}
        onChargeDiscountChange={handleChargeDiscountChange}
      />

      {/* Client Notes */}
      <FormField label="Notas del cliente">
        <textarea
          value={salesOrder.customerNotes}
          onChange={(e) => updateSalesOrder("customerNotes", e.target.value)}
          rows={3}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
        />
      </FormField>

      {/* File Upload Section */}
      {/* <FileUploadSection /> */}

      {/* Action Buttons */}
      <div className="flex gap-3 mt-4">
        <button
          type="button"
          onClick={() => handleSubmit(true)}
          className="px-6 py-2 bg-primary text-white rounded hover:bg-green-700"
        >
          Guardar y enviar
        </button>
        <button className="px-6 py-2 text-gray-600 hover:text-gray-800">
          Cancelar
        </button>
      </div>
    </div>
  );
};
