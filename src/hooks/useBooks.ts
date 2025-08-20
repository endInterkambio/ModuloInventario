import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { uploadBooks } from "@/api/modules/books";
import axiosInstance from "@/api/axiosInstance";

export function useBooks(
  page: number = 0, // por defecto página 0
  size: number = 10, // por defecto 10 items
  sort?: string,
  search?: string,
  minStock?: number,
  maxStock?: number
) {
  return useQuery({
    queryKey: ["books", page, size, sort, search, minStock, maxStock],
    queryFn: async () => {
      const params: Record<string, string | number> = { page, size };

      if (sort) params.sort = sort;
      if (search) params.search = search;
      if (minStock !== undefined) params.minStock = minStock;
      if (maxStock !== undefined) params.maxStock = maxStock;

      const res = await axiosInstance.get("/books", { params });
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
