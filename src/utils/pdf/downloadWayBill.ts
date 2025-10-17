import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { SaleOrderDTO } from "@/types/SaleOrderDTO";
import logo from "@assets/LOGO-GUSANITO-LECTOR.png";
import { loadImageAsBase64 } from "../loadImageAsBase64";
import { format } from "date-fns";

export async function downloadWayBill(order: SaleOrderDTO) {
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
  doc.text("Guía de Remisión", 200, 10, { align: "right" });

  // Subtítulo con número de guía
  doc.setFontSize(12);
  doc.text(`N° ${order.orderNumber.replace(/^SO-/, "WB-")}`, 200, 18, {
    align: "right",
  });

  const infoStartY = currentY + 10;

  // Info general con tabla invisible
  autoTable(doc, {
    startY: infoStartY,
    theme: "plain",
    styles: { fontSize: 10, cellPadding: 1, valign: "top" },
    columnStyles: {
      0: { cellWidth: 40 }, // N° de guía
      1: { cellWidth: 50 }, // Fecha del pedido
      2: { cellWidth: 50 }, // Fecha de paquete
      3: { cellWidth: 50 }, // Orden de venta
    },
    head: [
      ["N° de guía", "Fecha del pedido", "Fecha de paquete", "Orden de venta"],
    ],
    body: [
      [
        String(order.orderNumber.replace(/^SO-/, "WB-") ?? ""),
        order.orderDate ? format(new Date(order.orderDate), "dd/MM/yyyy") : "",
        order.shipment?.shipmentDate
          ? format(new Date(order.shipment.shipmentDate), "dd/MM/yyyy")
          : "",
        order.orderNumber ?? "",
      ],
    ],
  });

  // Cliente
  doc.setFontSize(10);
  doc.text(
    `Facturar a: ${order.customer?.name ?? order.customer?.companyName}`,
    15,
    85
  );

  // Dirección de envío (si existe)
  if (order.shipment?.address) {
    const parts = order.shipment.address.split(",").map((p) => p.trim());
    let addressY = 95;
    doc.text("Enviar a:", 15, addressY);
    addressY += 4;

    // Mostrar cada parte en una línea
    parts.forEach((part) => {
      doc.text(part, 15, addressY);
      addressY += 4;
    });
  }

  // Calcular el total de cantidades
  const totalQuantity = order.items.reduce(
    (sum, item) => sum + (item.quantity ?? 0),
    0
  );

  // Tabla de items
  autoTable(doc, {
    startY: 120,
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
  doc.save(
    `Guia_${String(order.orderNumber.replace(/^SO-/, "WB-") ?? "")}.pdf`
  );
}
