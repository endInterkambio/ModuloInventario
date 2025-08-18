import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createBookStockLocation } from "@/api/modules/bookLocations";
import { BookStockLocationDTO } from "@/types/BookDTO";

export const useCreateBookLocation = () => {
  const mutation = useMutation({
    mutationFn: (data: Partial<BookStockLocationDTO>) =>
      createBookStockLocation(data),
    onError: (err) => {
      console.error(err);
      toast.error("Error al crear ubicación");
    },
  });

  return {
    createLocation: mutation.mutateAsync, // ⚡ Esto retorna BookStockLocationDTO
    isCreatingLocation: mutation.status === "pending",
  };
};
