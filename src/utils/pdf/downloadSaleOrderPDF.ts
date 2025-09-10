import { generatePDF } from "./generatePDF";
import { SaleOrderDTO } from "@/types/SaleOrderDTO";
import { format } from "date-fns";

export async function downloadSaleOrderPDF(order: SaleOrderDTO) {
  await generatePDF(order, {
    title: "Orden de Venta",
    filePrefix: "Orden",
    showTotal: true,
    infoRows: [
      [
        // { label: "N° Orden:", value: order.orderNumber ?? "" },
        {
          label: "Fecha del pedido:",
          value: order.orderDate
            ? format(new Date(order.orderDate), "dd/MM/yyyy")
            : "",
        },
      ],
      [
        { label: "Método de entrega:", value: order.shipment?.shipmentMethod?.name ?? "" },
        { label: "Canal de venta:", value: order.saleChannel ?? "" },
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
      {
        header: "Precio",
        accessor: (item) =>
          item.customPrice ? `S/ ${item.customPrice.toFixed(2)}` : "-",
      },
      {
        header: "Subtotal",
        accessor: (item) =>
          item.customPrice && item.quantity
            ? `S/ ${(item.customPrice * item.quantity).toFixed(2)}`
            : "-",
      },
    ],
  });
}
