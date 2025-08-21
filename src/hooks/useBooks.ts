import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { uploadBooks } from "@/api/modules/books";
import axiosInstance from "@/api/axiosInstance";
import { BookDTO } from "@/types/BookDTO";
import { endpoints } from "@/api/endpoints";
import { useBookStore } from "@/stores/useBookStore";

export function useBooks(
  page: number = 0, // por defecto página 0
  size: number = 10, // por defecto 10 items
  sort?: string,
  search?: string,
  minStock?: number,
  maxStock?: number
) {
  const { filters } = useBookStore.getState();
  return useQuery({
    queryKey: ["books", page, size, filters, sort, search, minStock, maxStock],
    queryFn: async () => {
      const params: Record<string, string | number> = { page, size };

      if (sort) params.sort = sort;
      if (search) params.search = search;
      if (minStock !== undefined) params.minStock = minStock;
      if (maxStock !== undefined) params.maxStock = maxStock;
      if (filters.minPrice !== undefined) params.minPrice = filters.minPrice;
      if (filters.maxPrice !== undefined) params.maxPrice = filters.maxPrice;
      if (filters.categories) params.categories = filters.categories;

      const res = await axiosInstance.get("/books", { params });
      return res.data;
    },
    placeholderData: (prev) => prev,
  });
}

export const useBook = (sku: string | undefined) => {
  return useQuery<BookDTO | null>({
    queryKey: ["book", sku],
    queryFn: async () => {
      const { data } = await axiosInstance.get<BookDTO>(
        endpoints.getBookBySku(sku || "")
      );
      return data ?? null; // devuelve null si el backend responde vacío
    },
    enabled: !!sku,
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
