import { useState } from "react";
import { Article, SalesOrder } from "../constants/types";
import toast from "react-hot-toast";

export const useSalesOrderForm = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [salesOrder, setSalesOrder] = useState<SalesOrder>({
    orderNumber: "SO-1310",
    reference: "",
    orderDate: "27 Apr 2025",
    deliveryDate: "",
    deliveryMethod: "Standard",
    vendor: "Juan Perez",
    salesChannel: "Online",
    clientNotes: "",
    articles: [],
    customer: null,
  });

  const [shippingCost, setShippingCost] = useState<number | "">("");
  const [chargeDiscountCost, setChargeDiscountCost] = useState<number | "">("");

  const updateSalesOrder = <K extends keyof SalesOrder>(
    field: K,
    value: SalesOrder[K] // toma el tipo correcto según la clave
  ) => {
    setSalesOrder((prev) => ({ ...prev, [field]: value }));
  };

  const calculateArticleAmount = (article: Article) => {
    const subtotal = article.quantity * article.price;
    const discountAmount =
      article.discountType === "%"
        ? (subtotal * article.discount) / 100
        : article.discount;
    return subtotal - discountAmount;
  };

  const updateArticle = (
    index: number,
    field: keyof Article,
    value: string | number
  ) => {
    const updatedArticles = [...salesOrder.articles];
    updatedArticles[index] = { ...updatedArticles[index], [field]: value };
    updatedArticles[index].amount = calculateArticleAmount(
      updatedArticles[index]
    );
    setSalesOrder((prev) => ({ ...prev, articles: updatedArticles }));
  };

  const addArticle = () => {
    setSalesOrder((prev) => ({
      ...prev,
      articles: [
        ...prev.articles,
        {
          id: Date.now().toString(),
          description: "",
          quantity: 1,
          price: 0,
          discount: 0,
          discountType: "%",
          tax: 0,
          amount: 0,
        },
      ],
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
  };
};
