// src/hooks/useBookLocations.ts
import { useQuery } from "@tanstack/react-query";
import { getBookStockLocations } from "@/api/modules/bookLocations";
import { BookStockLocationDTO } from "@/types/BookStockLocationDTO";

export function useBookLocations(sort?: string) {
  return useQuery<BookStockLocationDTO[]>({
    queryKey: ["bookLocations", sort],
    queryFn: () => getBookStockLocations(sort),
  });
}

