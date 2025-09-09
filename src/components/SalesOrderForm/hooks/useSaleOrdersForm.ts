import { useState } from "react";
import toast from "react-hot-toast";
import {
  SaleOrderDTO,
  OrderStatus,
  OrderPaymentStatus,
} from "@/types/SaleOrderDTO"; // importa desde donde tienes el DTO real
import { SimpleIdNameDTO } from "@/types/SimpleIdNameDTO";
import { SaleOrderItemDTO } from "@/types/SaleOrderItemDTO";

export const useSalesOrderForm = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const [salesOrder, setSalesOrder] = useState<SaleOrderDTO>({
    id: 0, // nuevo → lo defines vacío hasta que lo cree backend
    orderNumber: "",
    orderDate: new Date().toISOString().split("T")[0], // yyyy-MM-dd
    createdAt: new Date().toISOString(),
    createdBy: { id: 1, name: "Admin" } as SimpleIdNameDTO,
    saleChannel: "Online",
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
    setSalesOrder((prev) => ({ ...prev, [field]: value }));
  };

  const calculateArticleAmount = (item: SaleOrderItemDTO) => {
    const quantity = item.quantity ?? 0;
    const price = item.customPrice ?? 0;
    const subtotal = quantity * price;
    const discountAmount = item.discount ? (subtotal * item.discount) / 100 : 0;
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
          bookStockLocation: {
            id: 0,
            name: "",
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
  };
};
