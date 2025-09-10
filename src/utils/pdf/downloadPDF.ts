import { SaleOrderDTO } from "@/types/SaleOrderDTO";
import { format } from "date-fns";
import { generatePDF } from "./generatePDF";

export async function downloadPDF(order: SaleOrderDTO) {
  await generatePDF(order, {
    title: "Guía de Remisión",
    filePrefix: "Guia",
    showTotal: true,
    infoRows: [
      [
        { label: "N° de Guía:", value: String(order.id ?? "") },
        {
          label: "Fecha del pedido:",
          value: order.orderDate
            ? format(new Date(order.orderDate), "dd/MM/yyyy")
            : "",
        },
      ],
      [
        {
          label: "Fecha de paquete:",
          value: order.shipment?.trackingNumber ?? "",
        },
        { label: "Orden de venta:", value: order.orderNumber ?? "" },
      ],
    ],
    columns: [
      { header: "#", accessor: (_item, i) => String(i + 1) },
      {
        header: "Artículo & Descripción",
        accessor: (item) =>
          `${item.bookTitle ?? ""} - ${item.bookStockLocation?.bookSku ?? ""}${
            item.bookStockLocation?.bookCondition ?? ""
          }`,
      },
      { header: "Cant.", accessor: (item) => String(item.quantity ?? 0) },
    ],
  });
}
