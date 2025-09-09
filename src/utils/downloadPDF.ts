import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { SaleOrderDTO } from "@/types/SaleOrderDTO";

export function downloadPDF(order: SaleOrderDTO) {
  const doc = new jsPDF();

  // Título
  doc.setFontSize(18);
  doc.text("Guía de Remisión", 105, 20, { align: "center" });

  // Info general
  doc.setFontSize(12);
  doc.text(`N° de Guía: ${order.id}`, 10, 40);
  doc.text(`Fecha del pedido: ${order.orderDate ?? ""}`, 10, 48);
  doc.text(`Fecha de paquete: ${order.shipment?.trackingNumber ?? ""}`, 10, 56);
  doc.text(`Orden de venta: ${order.orderNumber ?? ""}`, 10, 64);

  // Cliente
  doc.text(`Facturar a: ${order.customer?.name ?? ""}`, 10, 80);

  // Tabla de items
  autoTable(doc, {
    startY: 95,
    head: [["#", "Artículo & Descripción", "Cant."]],
    body: order.items.map((item, i) => [
      String(i + 1),
      `${item.bookStockLocation?.name ?? ""} - ${
        item.bookStockLocation?.warehouse ?? ""
      }`,
      String(item.quantity ?? 0),
    ]),
  });

  // Guardar PDF
  doc.save(`Guia-${order.id}.pdf`);
}
