// hooks/useCreateStockAdjustment.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createStockAdjustment } from "@/api/modules/bookStockAdjustment";
import { BookStockAdjustmentDTO } from "@/types/BookStockAdjustmentDTO";
import toast from "react-hot-toast";

export function useCreateStockAdjustment() {
  const queryClient = useQueryClient();

  return useMutation<
    BookStockAdjustmentDTO,     // ✅ Respuesta del backend
    Error,                      // ✅ Tipo de error
    Omit<BookStockAdjustmentDTO, "id" | "performedAt"> // ✅ Variables que recibe
  >({
    mutationFn: (data) => createStockAdjustment(data),
    onSuccess: () => {
      toast.success("Ajuste de stock registrado correctamente");
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
    onError: (error) => {
      toast.error(`Error al registrar ajuste: ${error.message}`);
    },
  });
}
