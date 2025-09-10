import { PdfOptions } from "../types";
import { format } from "date-fns";
import { SaleOrderDTO } from "@/types/SaleOrderDTO";

export function guiaRemisionOptions(order: SaleOrderDTO): PdfOptions {
  return {
    title: "Guía de Remisión",
    filePrefix: "Guia",
    columns: [
      { header: "#", accessor: (_, i) => String(i + 1) },
      {
        header: "Artículo & Descripción",
        accessor: (item) =>
          `${item.bookTitle ?? ""} - ${item.bookStockLocation?.bookSku ?? ""}${
            item.bookStockLocation?.bookCondition ?? ""
          }`,
      },
      { header: "Cant.", accessor: (item) => String(item.quantity ?? 0) },
    ],
    infoRows: [
      [
        { label: "N° de Guía:", value: String(order.id ?? "") },
        {
          label: "Fecha del pedido:",
          value: order.orderDate ? format(new Date(order.orderDate), "dd/MM/yyyy") : "",
        },
      ],
      [
        { label: "Tracking:", value: order.shipment?.trackingNumber ?? "" },
        { label: "Orden de venta:", value: order.orderNumber ?? "" },
      ],
    ],
    showTotal: true,
  };
}
