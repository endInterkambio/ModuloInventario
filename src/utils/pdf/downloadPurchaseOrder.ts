import jsPDF from "jspdf";
import autoTable, { CellInput } from "jspdf-autotable";
import { PurchaseOrderDTO } from "@/types/PurchaseOrderDTO";
import logo from "@assets/LOGO-GUSANITO-LECTOR.png";
import { format } from "date-fns";
import { loadImageAsBase64 } from "../loadImageAsBase64";

export async function downloadPurchaseOrder(order: PurchaseOrderDTO) {
  const doc = new jsPDF();

  // Cargar logo con dimensiones reales
  const { base64, width, height } = await loadImageAsBase64(logo);

  // Escalar manteniendo proporción
  const maxWidth = 60; // ancho máximo en mm
  const ratio = width / height;
  const finalWidth = maxWidth;
  const finalHeight = maxWidth / ratio;

  doc.addImage(base64, "PNG", 15, 5, finalWidth, finalHeight); // x, y, w, h

  let currentY = finalHeight + 10; // dejar un espacio debajo del logo

  // Empresa
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text("Gusanito Lector E.I.R.L", 15, currentY);
  currentY += 4;
  doc.setFont("helvetica", "normal");
  doc.text("RUC: 20603275820", 15, currentY);
  currentY += 4;
  doc.text(
    "Av. Los Quechuas 1372 | Urb. Los Parques de Monterrico - 15022",
    15,
    currentY
  );
  currentY += 4;
  doc.text("Lima - Perú", 15, currentY);
  currentY += 4;
  doc.text("+51 (01) 707 1336 | ventas@gusanitolector.pe", 15, currentY);
  currentY += 4;
  doc.text("Website: https://gusanitolector.pe", 15, currentY);

  // --- TÍTULO EN ESQUINA SUPERIOR DERECHA ---
  doc.setFontSize(16);
  doc.text("Orden de compra", 200, 10, { align: "right" });

  // Subtítulo con número de guía
  doc.setFontSize(12);
  doc.text(`N° ${order.purchaseOrderNumber}`, 200, 18, { align: "right" });

  const infoStartY = currentY + 10;

  // Cliente
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text(
    `Comprado a: ${order.supplier?.name || "-"}`,
    15,
    infoStartY
  );

  const infoBody: CellInput[][] = [];

  const fechaPedido = order.purchaseDate
    ? `Fecha de compra: ${format(new Date(order.purchaseDate), "dd/MM/yyyy")}`
    : "";

  const fechaEntrega = order.deliveryDate
    ? `Fecha de entrega: ${format(new Date(order.deliveryDate), "dd/MM/yyyy")}`
    : "";

  const canalVenta = order.purchaseChannel
    ? `Canal de compra: ${order.purchaseChannel}`
    : "";

  // Una sola fila con 3 columnas
  infoBody.push([fechaPedido, fechaEntrega, canalVenta]);

  autoTable(doc, {
    startY: infoStartY + 5,
    theme: "plain",
    styles: { fontSize: 10, cellPadding: 1, valign: "top" },
    columnStyles: {
      0: { cellWidth: 60 },
      1: { cellWidth: 60 },
      2: { cellWidth: 60 },
    },
    body: infoBody,
  });

  // --- ITEMS Y TOTAL ---
  const totalQuantity = order.items.reduce(
    (sum, item) => sum + (item.quantity ?? 0),
    0
  );
  const totalDiscount = order.items.reduce(
    (sum, item) => sum + (item.discount ?? 0),
    0
  );
  const totalSubtotal = order.items.reduce(
    (sum, item) =>
      sum +
      ((item.customPrice ?? 0) * (item.quantity ?? 0) - (item.discount ?? 0)),
    0
  );

  const itemsBody: CellInput[][] = [
    ...order.items.map((item, i) => [
      String(i + 1),
      `${item.bookTitle ?? ""} - ${item.bookStockLocation?.bookSku ?? ""}${
        item.bookStockLocation?.bookSku?.match(/[ABCDXU]$/)
          ? ""
          : item.bookStockLocation?.bookCondition ?? ""
      }`,
      {
        content: String(item.quantity ?? 0),
        styles: { halign: "left" as const },
      },
      {
        content: item.customPrice
          ? `S/.${item.customPrice.toFixed(2)}`
          : "S/.0.00",
        styles: { halign: "left" as const },
      },
      {
        content: item.discount ? `(-S/.${item.discount.toFixed(2)})` : "-",
        styles: { halign: "left" as const },
      },
      {
        content:
          item.customPrice && item.quantity
            ? `S/.${(
                item.customPrice * item.quantity -
                (item.discount ?? 0)
              ).toFixed(2)}`
            : "S/.0.00",
        styles: { halign: "left" as const },
      },
    ]),
  ];

  // --- FILA ENVÍO ---
  if (order.amountShipment && order.amountShipment > 0) {
    itemsBody.push([
      {
        content: "Envío",
        colSpan: 5,
        styles: { halign: "left", fontStyle: "bold" },
      },
      {
        content: `S/.${order.amountShipment.toFixed(2)}`,
        styles: { halign: "left", fontStyle: "bold" },
      },
    ]);
  }

  // --- FILA CARGO ADICIONAL / DESCUENTO ADICIONAL ---
  if (order.additionalFee && order.additionalFee !== 0) {
    const isDiscount = order.additionalFee < 0;
    itemsBody.push([
      {
        content: isDiscount ? "Descuento adicional" : "Cargo adicional",
        colSpan: 5,
        styles: {
          halign: "left",
          fontStyle: "bold",
          textColor: isDiscount ? "#ff0000" : 0,
        },
      },
      {
        content: `S/.${Math.abs(order.additionalFee).toFixed(2)}`,
        styles: {
          halign: "left",
          fontStyle: "bold",
          textColor: isDiscount ? "#ff0000" : 0,
        },
      },
    ]);
  }

  // --- FILA TOTAL ---
  const grandTotal =
    totalSubtotal + (order.amountShipment ?? 0) + (order.additionalFee ?? 0);

  itemsBody.push([
    {
      content: "TOTAL",
      colSpan: 2,
      styles: { halign: "left", fontStyle: "bold" },
    },
    {
      content: String(totalQuantity),
      styles: { halign: "left", fontStyle: "bold" },
    },
    { content: "", styles: { lineWidth: 0 } },
    {
      content: `-S/.${totalDiscount.toFixed(2)}`,
      styles: { halign: "left", fontStyle: "bold", textColor: "#ff0000" },
    },
    {
      content: `S/.${grandTotal.toFixed(2)}`,
      styles: { halign: "left", fontStyle: "bold" },
    },
  ]);

  autoTable(doc, {
    startY: 85,
    headStyles: { fillColor: "#00ab55", textColor: 255, fontStyle: "bold" },
    head: [
      [
        "#",
        "Artículo & Descripción",
        "Cant.",
        "Precio",
        "Descuento",
        "Subtotal",
      ],
    ],
    body: itemsBody,
  });

  // --- GUARDAR PDF ---
  doc.save(`Orden_${order.purchaseOrderNumber}.pdf`);
}
