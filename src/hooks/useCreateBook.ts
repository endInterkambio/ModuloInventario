import { toast } from "react-hot-toast";
import { createBook } from "@/api/modules/books";
import { BookDTO } from "@/types/BookDTO";
import { useEntityMutation } from "@/hooks/useEntityMutation";

export const useCreateBook = () => {
  const mutation = useEntityMutation<BookDTO, Partial<BookDTO>>({
    mutationFn: (data) => createBook(data as Omit<BookDTO, "id">),
    queryKeyToInvalidate: ["books"],
    options: {
      onError: (err) => {
        console.error(err);
        toast.error("Error al crear libro");
      },
      onSuccess: () => {
        toast.success("Libro creado exitosamente");
      },
    },
  });

  return {
    createBook: mutation.mutateAsync,
    isCreatingBook: mutation.status === "pending",
  };
};
