import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { SaleOrderDTO } from "@/types/SaleOrderDTO";
import logo from "@assets/LOGO-GUSANITO-LECTOR.png";
import { loadImageAsBase64 } from "./loadImageAsBase64";
import { format } from "date-fns";

export async function downloadPDF(order: SaleOrderDTO) {
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

  // Primer párrafo en negrita
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text(
    "Gusanito Lector E.I.R.L",
    15, // X = 15
    currentY
  );

  // Segundo párrafo normal
  currentY += 4;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text("ATE Lima 15022", 15, currentY);

  // Tercer párrafo normal
  currentY += 4;
  doc.text("Perú", 15, currentY);

  // --- TÍTULO EN ESQUINA SUPERIOR DERECHA ---
  doc.setFontSize(16);
  doc.text("Guía de Remisión", 200, 10, { align: "right" });

  // Subtítulo con número de guía
  doc.setFontSize(12);
  doc.text(`N° ${order.id}`, 200, 18, { align: "right" });

  const infoStartY = currentY + 10;

  // Info general con tabla invisible
  autoTable(doc, {
    startY: infoStartY,
    theme: "plain", // sin bordes ni líneas
    styles: { fontSize: 10, cellPadding: 1 },
    columnStyles: {
      0: { cellWidth: 40 }, // primera columna (labels)
      1: { cellWidth: 60 }, // segunda columna (valores)
      2: { cellWidth: 40 },
      3: { cellWidth: 50 },
    },
    body: [
      [
        { content: "N° de Guía:", styles: { fontStyle: "bold" } },
        String(order.id ?? ""),
        { content: "Fecha del pedido:", styles: { fontStyle: "bold" } },
        order.orderDate ? format(new Date(order.orderDate), "dd/MM/yyyy") : "",
      ],
      [
        { content: "Fecha de paquete:", styles: { fontStyle: "bold" } },
        order.shipment?.trackingNumber ?? "",
        { content: "Orden de venta:", styles: { fontStyle: "bold" } },
        order.orderNumber ?? "",
      ],
    ],
  });

  // Cliente
  doc.setFontSize(10);
  doc.text(
    `Facturar a: ${order.customer?.name ?? order.customer?.companyName}`,
    15,
    80
  );

  // Calcular el total de cantidades
  const totalQuantity = order.items.reduce(
    (sum, item) => sum + (item.quantity ?? 0),
    0
  );

  // Tabla de items
  autoTable(doc, {
    startY: 95,
    headStyles: {
      fillColor: "#00ab55", // 
      textColor: 255, // texto blanco
      fontStyle: "bold", // negrita
    },
    head: [["#", "Artículo & Descripción", "Cant."]],
    body: [
      ...order.items.map((item, i) => [
        String(i + 1),
        `${item.bookTitle ?? ""} - ${item.bookStockLocation?.bookSku ?? ""}${
          item.bookStockLocation?.bookCondition ?? ""
        }`,
        String(item.quantity ?? 0),
      ]),
      // Fila de TOTAL sin bordes ni colores
      [
        {
          content: "TOTAL",
          colSpan: 2,
          styles: {
            halign: "right",
            fontStyle: "bold",
            lineWidth: 0, // sin bordes
            fillColor: undefined, // sin fondo
            textColor: 0, // texto negro
          },
        },
        {
          content: String(totalQuantity),
          styles: {
            fontStyle: "bold",
            lineWidth: 0,
            fillColor: undefined,
            textColor: 0,
          },
        },
      ],
    ],
  });
  // Guardar PDF
  doc.save(`Guia-${order.id}.pdf`);
}
