import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import logo from "@assets/LOGO-GUSANITO-LECTOR.png";
import { loadImageAsBase64 } from "../loadImageAsBase64";
import { SaleOrderDTO } from "@/types/SaleOrderDTO";
import { PdfOptions } from "./types";

export async function generatePDF(order: SaleOrderDTO, options: PdfOptions) {
  const doc = new jsPDF();

  // Logo
  const { base64, width, height } = await loadImageAsBase64(logo);
  const maxWidth = 60;
  const ratio = width / height;
  const finalHeight = maxWidth / ratio;
  doc.addImage(base64, "PNG", 15, 5, maxWidth, finalHeight);

  let currentY = finalHeight + 10;

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

  // Título
  doc.setFontSize(16);
  doc.text(options.title, 200, 10, { align: "right" });
  doc.setFontSize(12);
  doc.text(`N° ${order.id}`, 200, 18, { align: "right" });

  const infoStartY = currentY + 10;

  const normalizedInfoRows = options.infoRows.map((row) => {
    while (row.length < 3) {
      row.push({ label: "", value: "" });
    }
    return row;
  });

  // Info general
  autoTable(doc, {
    startY: infoStartY,
    theme: "plain",
    styles: { fontSize: 10, cellPadding: 1 },
    body: normalizedInfoRows.map((row) => [
      { content: row[0].label, styles: { fontStyle: "bold" } },
      row[0].value,
      { content: row[1].label, styles: { fontStyle: "bold" } },
      row[1].value,
      { content: row[2].label, styles: { fontStyle: "bold" } },
      row[2].value,
    ]),
  });

  // Cliente
  doc.setFontSize(10);
  doc.text(
    `Facturar a: ${order.customer?.name ?? order.customer?.companyName}`,
    15,
    80
  );

  // Tabla de items
  const body = order.items.map((item, i) =>
    options.columns.map((c) => c.accessor(item, i))
  );

  if (options.showTotal) {
    const totalQuantity = order.items.reduce(
      (sum, item) => sum + (item.quantity ?? 0),
      0
    );
    body.push([
      {
        content: "TOTAL",
        colSpan: options.columns.length - 1,
        styles: { halign: "right", fontStyle: "bold", lineWidth: 0 },
      },
      {
        content: String(totalQuantity),
        styles: { fontStyle: "bold", lineWidth: 0 },
      },
    ]);
  }

  autoTable(doc, {
    startY: 95,
    head: [options.columns.map((c) => c.header)],
    body,
    headStyles: { fillColor: "#00ab55", textColor: 255, fontStyle: "bold" },
  });

  doc.save(`${options.filePrefix ?? "Documento"}-${order.id}.pdf`);
}
