import { useEntityMutation } from "@/hooks/useEntityMutation";
import { exportBooks } from "@/api/modules/export";

interface UseExportBookOptions {
  fileName?: string; // nombre del archivo, por defecto "books_export.xlsx"
}

export const useExportBook = ({ fileName = "books_export.xlsx" }: UseExportBookOptions = {}) => {
  return useEntityMutation<Blob, void>({
    mutationFn: exportBooks,
    queryKeyToInvalidate: ['books'], // opcional
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
