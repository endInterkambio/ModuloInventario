import { PdfOptions } from "../types";
import { format } from "date-fns";
import { SaleOrderDTO } from "@/types/SaleOrderDTO";

export function ordenVentaOptions(order: SaleOrderDTO): PdfOptions {
  return {
    title: "Orden de Venta",
    filePrefix: "Orden",
    columns: [
      { header: "#", accessor: (_, i) => String(i + 1) },
      { header: "Artículo", accessor: (item) => item.bookTitle ?? "" },
      { header: "Cant.", accessor: (item) => String(item.quantity ?? 0) },
      { header: "Precio Unit.", accessor: (item) => `$${item.customPrice ?? 0}` },
      {
        header: "Subtotal",
        accessor: (item) =>
          `$${((item.customPrice ?? 0) * (item.quantity ?? 0)).toFixed(2)}`,
      },
    ],
    infoRows: [
      [
        { label: "N° de Orden:", value: String(order.id ?? "") },
        {
          label: "Fecha:",
          value: order.orderDate ? format(new Date(order.orderDate), "dd/MM/yyyy") : "",
        },
      ],
      [
        { label: "Cliente:", value: order.customer?.name ?? "" },
        { label: "RUC:", value: order.customer?.companyName ?? "" },
      ],
    ],
    showTotal: true,
  };
}
