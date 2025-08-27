import React, { useState } from "react";
import { Article, SalesOrder } from "./constants/types";
import {
  DELIVERY_METHODS,
  SALES_CHANNELS,
  VENDORS,
} from "./constants/SaleOrderOptions";
import { ClientSearchSection } from "./sections/ClientSearchSection";
import { FormField } from "./ui/FormField";
import { Input } from "./ui/Input";
import { SummarySection } from "./sections/SummarySection";
import { Select } from "./ui/Select";
import FileUploadSection from "./sections/FileUploadSection";
import ArticlesTable from "./sections/ArticlesTable";
import toast from "react-hot-toast";

// Main Component
const SalesOrderForm: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [salesOrder, setSalesOrder] = useState<SalesOrder>({
    orderNumber: "SO-1310",
    reference: "",
    orderDate: "27 Apr 2025",
    deliveryDate: "",
    deliveryMethod: DELIVERY_METHODS[0],
    vendor: VENDORS[0],
    salesChannel: SALES_CHANNELS[0],
    clientNotes: "",
    articles: [],
  });

  const [shippingCost, setShippingCost] = useState<number | "">("");
  const [chargeDiscountCost, setChargeDiscountCost] = useState<number | "">("");

  const updateSalesOrder = (field: keyof SalesOrder, value: string) => {
    setSalesOrder((prev) => ({ ...prev, [field]: value }));
  };

  const calculateArticleAmount = (article: Article): number => {
    const subtotal = article.quantity * article.price;

    let discountAmount = 0;
    if (article.discountType === "%") {
      discountAmount = (subtotal * article.discount) / 100;
    } else {
      discountAmount = article.discount; // monto fijo en S/.
    }

    return subtotal - discountAmount;
  };

  const updateArticle = (
    index: number,
    field: keyof Article,
    value: string | number
  ) => {
    const updatedArticles = [...salesOrder.articles];
    updatedArticles[index] = { ...updatedArticles[index], [field]: value };

    // Recalcular amount
    updatedArticles[index].amount = calculateArticleAmount(
      updatedArticles[index]
    );

    setSalesOrder((prev) => ({ ...prev, articles: updatedArticles }));
  };

  const addArticle = () => {
    const newArticle: Article = {
      id: Date.now().toString(),
      description: "",
      quantity: 1,
      price: 0,
      discount: 0,
      tax: 0,
      amount: 0,
      discountType: "%",
    };
    setSalesOrder((prev) => ({
      ...prev,
      articles: [...prev.articles, newArticle],
    }));
  };

  const removeArticle = (index: number) => {
    setSalesOrder((prev) => ({
      ...prev,
      articles: prev.articles.filter((_, i) => i !== index),
    }));
  };

  const subtotal = salesOrder.articles.reduce(
    (sum, article) => sum + article.amount,
    0
  );

  // helper de normalización
  const toNum = (v: number | "") => (v === "" ? 0 : Number(v));

  // handlers con validación de total negativo

  const handleShippingCostChange = (value: number | "") => {
    const tentativeTotal = subtotal + toNum(value) + toNum(chargeDiscountCost);
    if (tentativeTotal < 0) {
      toast.error("El total no puede ser negativo");
      return;
    }
    setShippingCost(value);
  };

  const handleChargeDiscountChange = (value: number | "") => {
    const tentativeTotal = subtotal + toNum(shippingCost) + toNum(value);
    if (tentativeTotal < 0) {
      toast.error("El descuento no puede dejar el total en negativo");
      return;
    }
    setChargeDiscountCost(value);
  };

  // usa los números normalizados para cálculos
  const total = subtotal + toNum(shippingCost) + toNum(chargeDiscountCost);

  return (
    <div className=" mx-auto p-6 bg-white min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b">
        <h1 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          🛒 Nueva orden de venta
        </h1>
        <div className="flex gap-2">
          <button className="px-4 py-2 text-gray-600 hover:text-gray-800 text-sm">
            ✕
          </button>
        </div>
      </div>

      {/* Client Search */}
      <ClientSearchSection
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <FormField label="Orden de venta n°" required>
          <Input
            value={salesOrder.orderNumber}
            onChange={(value) => updateSalesOrder("orderNumber", value)}
          />
        </FormField>

        <FormField label="N° de referencia">
          <Input
            value={salesOrder.reference}
            onChange={(value) => updateSalesOrder("reference", value)}
          />
        </FormField>

        <FormField label="Fecha de orden de venta">
          <Input
            value={salesOrder.orderDate}
            onChange={(value) => updateSalesOrder("orderDate", value)}
            placeholder="DD MMM YYYY"
          />
        </FormField>

        <FormField label="Método de entrega">
          <Select
            value={salesOrder.deliveryMethod}
            onChange={(value) => updateSalesOrder("deliveryMethod", value)}
            options={DELIVERY_METHODS}
          />
        </FormField>

        <FormField label="Vendedor">
          <Select
            value={salesOrder.vendor}
            onChange={(value) => updateSalesOrder("vendor", value)}
            options={VENDORS}
          />
        </FormField>

        <FormField label="Canal de Venta (+)">
          <Select
            value={salesOrder.salesChannel}
            onChange={(value) => updateSalesOrder("salesChannel", value)}
            options={SALES_CHANNELS}
          />
        </FormField>
      </div>

      {/* Client Info */}
      <div className="mb-6">
        <FormField label="Almacén">
          <span className="text-sm text-gray-600">Quechuas</span>
        </FormField>
      </div>

      {/* Articles Table */}
      <ArticlesTable
        articles={salesOrder.articles}
        onArticleUpdate={updateArticle}
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
      <div className="mb-6">
        <FormField label="Notas del cliente">
          <textarea
            value={salesOrder.clientNotes}
            onChange={(e) => updateSalesOrder("clientNotes", e.target.value)}
            placeholder="Gracias por su preferencia."
            rows={3}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
          />
        </FormField>
      </div>

      {/* File Upload Section */}
      <FileUploadSection />

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors">
          Guardar como borrador
        </button>
        <button className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
          Guardar y enviar
        </button>
        <button className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors">
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default SalesOrderForm;
