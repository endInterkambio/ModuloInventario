import { updateBook } from "@/api/modules/books";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BookDTO } from "@/types/BookDTO";

export function useUpdateBook() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<BookDTO> }) =>
      updateBook(id, data),
    onSuccess: (updatedBook) => {
      // ✅ Optimistic update del detalle
      queryClient.setQueryData(["book", updatedBook.sku], updatedBook);

      // ✅ Invalidar lista para que se actualice
      queryClient.invalidateQueries({ queryKey: ["books"] });

      // ✅ Invalidar detalle para garantizar consistencia (si el backend devuelve más datos)
      queryClient.invalidateQueries({ queryKey: ["book", updatedBook.sku] });
    },
  });
}