import { useState } from "react";
import toast from "react-hot-toast";
import {
  SaleOrderDTO,
  OrderStatus,
  OrderPaymentStatus,
} from "@/types/SaleOrderDTO";
import { SimpleIdNameDTO } from "@/types/SimpleIdNameDTO";
import { SaleOrderItemDTO } from "@/types/SaleOrderItemDTO";

export const useSalesOrderForm = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const [salesOrder, setSalesOrder] = useState<SaleOrderDTO>({
    id: 0,
    orderNumber: "",
    orderDate: new Date().toISOString().split("T")[0],
    createdAt: new Date().toISOString(),
    createdBy: { id: 1, name: "Admin" } as SimpleIdNameDTO,
    saleChannel: undefined, // empieza vacío
    amount: 0,
    totalAmount: 0,
    status: "PENDING" as OrderStatus,
    paymentStatus: "UNPAID" as OrderPaymentStatus,
    customer: {
      id: 0,
      name: "",
      customerType: "PERSON",
      companyName: "",
    },
    items: [],
    amountShipment: 0,
    additionalFee: 0,
    totalPaid: 0,
    customerNotes: "",
  });

  const [shippingCost, setShippingCost] = useState<number | "">("");
  const [chargeDiscountCost, setChargeDiscountCost] = useState<number | "">("");

  const updateSalesOrder = <K extends keyof SaleOrderDTO>(
    field: K,
    value: SaleOrderDTO[K]
  ) => {
    setSalesOrder((prev) => {
      const updated = { ...prev };
      if (value === undefined || value === "" || value === "Seleccionar") {
        delete updated[field]; // no enviar valores vacíos o placeholders
      } else {
        updated[field] = value;
      }
      return updated;
    });
  };

  const calculateArticleAmount = (item: SaleOrderItemDTO) => {
    const quantity = item.quantity ?? 0;
    const price = item.customPrice ?? 0;
    const subtotal = quantity * price;
    const discountAmount = item.discount ?? 0;
    return subtotal - discountAmount;
  };

  const updateArticle = (index: number, patch: Partial<SaleOrderItemDTO>) => {
    setSalesOrder((prev) => {
      const updatedItems = prev.items.map((it, i) =>
        i === index ? { ...it, ...patch } : it
      );

      const newAmount = updatedItems.reduce(
        (sum, it) => sum + calculateArticleAmount(it),
        0
      );

      return { ...prev, items: updatedItems, amount: newAmount };
    });
  };

  const addArticle = () => {
    setSalesOrder((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          id: undefined,
          bookTitle: "",
          bookStockLocation: {
            id: 0,
            bookSku: "",
            stock: 0,
            warehouse: undefined,
            bookcase: undefined,
            bookcaseFloor: undefined,
          },
          quantity: 1,
          discount: 0,
          customPrice: 0,
        },
      ],
    }));
  };

  const removeArticle = (index: number) => {
    const updated = salesOrder.items.filter((_, i) => i !== index);
    setSalesOrder((prev) => ({
      ...prev,
      items: updated,
      amount: updated.reduce((sum, it) => sum + calculateArticleAmount(it), 0),
    }));
  };

  const subtotal = salesOrder.items.reduce(
    (sum, item) => sum + calculateArticleAmount(item),
    0
  );

  const toNum = (v: number | "") => (v === "" ? 0 : Number(v));

  const handleShippingCostChange = (value: number | "") => {
    if (subtotal + toNum(value) + toNum(chargeDiscountCost) < 0) {
      toast.error("El total no puede ser negativo");
      return;
    }
    setShippingCost(value);
  };

  const handleChargeDiscountChange = (value: number | "") => {
    if (subtotal + toNum(shippingCost) + toNum(value) < 0) {
      toast.error("El descuento no puede dejar el total en negativo");
      return;
    }
    setChargeDiscountCost(value);
  };

  const total = subtotal + toNum(shippingCost) + toNum(chargeDiscountCost);

  // Función de validación
  const validateSalesOrder = (): boolean => {
    const errors: string[] = [];

    if (!salesOrder.customer?.id || salesOrder.customer.id === 0) {
      errors.push("Debe seleccionar un cliente válido.");
    }

    if (!salesOrder.orderDate) {
      errors.push("Debe ingresar una fecha de pedido.");
    }

    if (!salesOrder.items || salesOrder.items.length === 0) {
      errors.push("Debe agregar al menos un artículo al pedido.");
    }

    salesOrder.items.forEach((item, i) => {
      if (!item.bookStockLocation?.bookSku) {
        errors.push(`El artículo #${i + 1} no tiene libro seleccionado.`);
      }
      if (!item.quantity || item.quantity <= 0) {
        errors.push(`El artículo #${i + 1} tiene cantidad inválida.`);
      }
      if (!item.customPrice || item.customPrice <= 0) {
        errors.push(`El artículo #${i + 1} tiene precio inválido.`);
      }
    });

    if (subtotal <= 0) {
      errors.push("El subtotal no puede ser cero.");
    }

    if (!salesOrder.saleChannel) {
      errors.push("Debe seleccionar un canal de venta.");
    } else {
      // Si el canal de venta NO es "Tienda Quechuas", exigir método de envío
      if (
        salesOrder.saleChannel !== "Tienda Quechuas" &&
        (!salesOrder.shipment || !salesOrder.shipment.shipmentMethod?.id)
      ) {
        errors.push(
          "Debe seleccionar un método de envío para este canal de venta."
        );
      }
    }

    if (errors.length > 0) {
      errors.forEach((err) => toast.error(err));
      return false;
    }

    return true;
  };

  return {
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
    validateSalesOrder, // ✅ expuesto para usar antes de enviar
  };
};
