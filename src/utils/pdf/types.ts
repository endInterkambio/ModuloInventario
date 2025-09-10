import { SaleOrderDTO } from "@/types/SaleOrderDTO";
import { CellDef, Styles } from "jspdf-autotable";

export interface InfoRow {
  label: string;
  value: string;
}

/**
 * Celda que acepta texto, número o definición avanzada de AutoTable
 */
export type TableCell =
  | string
  | number
  | CellDef & {
      content: string | number;
      colSpan?: number;
      rowSpan?: number;
      styles?: Partial<Styles>;
    };

export interface TableColumn {
  header: string;
  accessor: (item: SaleOrderDTO["items"][number], index: number) => TableCell;
}

export interface PdfOptions {
  title: string;
  columns: TableColumn[];
  infoRows: InfoRow[][];
  showTotal?: boolean;
  filePrefix?: string;
}
