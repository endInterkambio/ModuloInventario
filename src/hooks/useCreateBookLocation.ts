import { useMutation } from "@tanstack/react-query";
import { createBookStockLocation } from "@/api/modules/bookLocations";
import { BookStockLocationDTO } from "@/types/BookStockLocationDTO";

export const useCreateBookLocation = () => {
  const mutation = useMutation({
    mutationFn: (data: Partial<BookStockLocationDTO>) =>
      createBookStockLocation(data),
  });

  return {
    createLocation: mutation.mutateAsync, // ⚡ Esto retorna BookStockLocationDTO
    isCreatingLocation: mutation.isPending,
    error: mutation.error,
  };
};
