import { useQuery, UseQueryOptions, QueryKey } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance";

export function useApiQuery<T>(
  queryKey: QueryKey,
  url: string,
  options?: Omit<UseQueryOptions<T, Error>, "queryKey" | "queryFn">
) {
  return useQuery<T, Error>({
    queryKey,
    queryFn: async () => {
      const { data } = await axiosInstance.get<T>(url);
      return data;
    },
    ...options,
  });
}
