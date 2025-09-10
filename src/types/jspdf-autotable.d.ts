import "jspdf";
import "jspdf-autotable";

declare module "jspdf" {
  interface jsPDF {
    lastAutoTable?: {
      finalY: number;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [key: string]: any;
    };
  }
}
