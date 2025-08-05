import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadBooks } from "@/api/modules/books";
import axiosInstance from "@/api/axiosInstance";

import { useQuery } from "@tanstack/react-query";

export function useBooks(page: number, size: number, sort?: string, search?: string) {

  return useQuery({
    queryKey: ["books", page, size, sort, search],
    queryFn: async () => {
      const res = await axiosInstance.get("/books", {
        params: {
          page,
          size,
          sort,
          search: search || undefined,
        },
      });
      return res.data;
    },
    placeholderData: (prev) => prev,
  });
}

export const useUploadBooks = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadBooks,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
  });
};
