import { ClientSearchSection } from "./sections/ClientSearchSection";
import ArticlesTable from "./sections/ItemsTable";
import FileUploadSection from "./sections/FileUploadSection";
import { FormField } from "./ui/FormField";
import { Input } from "./ui/Input";
import { Select } from "./ui/Select";
import {
  DELIVERY_METHODS,
  SALES_CHANNELS,
  VENDORS,
} from "./constants/SaleOrderOptions";
import { useSalesOrderForm } from "./hooks/useSaleOrdersForm";
import BackButton from "@components/shared/BackButton";
import { SummarySection } from "./sections/SummarySection";

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
  } = useSalesOrderForm();

  return (
    <div className="mx-auto p-6 bg-white min-h-screen">
      <BackButton />

      {/* Header */}
      <div className="pt-5 flex items-center justify-between mb-6 pb-4 border-b">
        <h1 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          🛒 Nueva orden de venta
        </h1>
      </div>

      {/* Client Search */}
      <ClientSearchSection
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCustomer={salesOrder.customer || null} // ahora existe en SalesOrder
        onCustomerSelect={(customer) => updateSalesOrder("customer", customer)}
      />

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <FormField label="Orden de venta n°" required>
          <Input
            value={salesOrder.orderNumber}
            onChange={(v) => updateSalesOrder("orderNumber", v)}
          />
        </FormField>
        <FormField label="N° de referencia">
          <Input
            value={salesOrder.referenceNumber}
            onChange={(v) => updateSalesOrder("referenceNumber", v)}
          />
        </FormField>
        <FormField label="Fecha de orden de venta">
          <Input
            value={salesOrder.orderDate}
            onChange={(v) => updateSalesOrder("orderDate", v)}
          />
        </FormField>
        <FormField label="Método de entrega">
          <Select
            value={salesOrder.deliveryMethod}
            onChange={(v) => updateSalesOrder("deliveryMethod", v)}
            options={DELIVERY_METHODS}
          />
        </FormField>
        <FormField label="Vendedor">
          <Select
            value={salesOrder.createdBy}
            onChange={(v) => updateSalesOrder("createdBy", v)}
            options={VENDORS}
          />
        </FormField>
        <FormField label="Canal de Venta (+)">
          <Select
            value={salesOrder.saleChannel}
            onChange={(v) => updateSalesOrder("saleChannel", v)}
            options={SALES_CHANNELS}
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
        shippingCost={shippingCost}
        chargeDiscountCost={chargeDiscountCost}
        total={total}
        onShippingCostChange={handleShippingCostChange}
        onChargeDiscountChange={handleChargeDiscountChange}
      />

      {/* Client Notes */}
      <FormField label="Notas del cliente">
        <textarea
          value={salesOrder.clientNotes}
          onChange={(e) => updateSalesOrder("clientNotes", e.target.value)}
          rows={3}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
        />
      </FormField>

      {/* File Upload Section */}
      <FileUploadSection />

      {/* Action Buttons */}
      <div className="flex gap-3 mt-4">
        <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
          Guardar como borrador
        </button>
        <button className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700">
          Guardar y enviar
        </button>
        <button className="px-6 py-2 text-gray-600 hover:text-gray-800">
          Cancelar
        </button>
      </div>
    </div>
  );
};
