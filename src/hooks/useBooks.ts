import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchBooks, uploadBooks } from "@/api/modules/books";
import { BookDTO } from "@/types/BookDTO";

export const useBooks = () => {
  return useQuery<BookDTO[]>({
    queryKey: ["books"],
    queryFn: fetchBooks,
  });
};

export const useUploadBooks = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadBooks,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
  });
};
