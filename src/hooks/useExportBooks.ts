import { useEntityMutation } from "@/hooks/useEntityMutation";
import { exportBooks } from "@/api/modules/export";

interface UseExportBookOptions {
  fileName?: string; 
}

export const useExportBook = ({
  fileName = "books_export.xlsx",
}: UseExportBookOptions = {}) => {
  return useEntityMutation<Blob, void>({
    mutationFn: () => exportBooks("all"),
    queryKeyToInvalidate: ["books"],
    options: {
      onSuccess: (data) => {
        const url = window.URL.createObjectURL(new Blob([data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
      },
      onError: (error) => {
        console.error("Error exportando libros:", error);
      },
    },
  });
};

export const useExportBestStockBooks = ({
  fileName = "best_stock_books_export.xlsx",
}: UseExportBookOptions = {}) => {
  return useEntityMutation<Blob, void>({
    mutationFn: () => exportBooks("best-stock"),
    queryKeyToInvalidate: ["books"],
    options: {
      onSuccess: (data) => {
        const url = window.URL.createObjectURL(new Blob([data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
      },
      onError: (error) => {
        console.error("Error exportando libros con mejor stock:", error);
      },
    },
  });
};
