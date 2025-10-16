import {
  createPaymentMade,
  deletePaymentMade,
  getPaymentMade,
} from "@/api/modules/paymentMade";
import { UseMutationOptions, useQuery } from "@tanstack/react-query";
import { PaymentMadeDTO } from "@/types/PaymentMadeDTO";
import { useEntityMutation } from "./useEntityMutation";
import { Page } from "@/types/Pagination";
import { usePaymentMadeStore } from "@/stores/usePaymentMadeStore";

// Hook for fetching paginated payments made
export const usePaymentMade = (
  page = 0,
  size = 12,
  sortBy: string = "paymentDate",
  sortDirection: "asc" | "desc" = "desc",
  filters?: Record<string, string>
) => {
  return useQuery<Page<PaymentMadeDTO>>({
    queryKey: ["payment-made", page, size, sortBy, sortDirection, filters],
    queryFn: () => getPaymentMade(page, size, sortBy, sortDirection, filters),
  });
};

// Hook that uses Zustand store for pagination, sorting, and filters
export const usePaymentMadeWithStore = () => {
  const { currentPage, itemsPerPage, sortBy, sortDirection, filters } =
    usePaymentMadeStore();
  return usePaymentMade(
    currentPage - 1,
    itemsPerPage,
    sortBy,
    sortDirection,
    filters
  );
};

// Hook for creating a new payment made
export const useCreatePaymentMade = (
  options?: UseMutationOptions<
    PaymentMadeDTO,
    Error,
    Omit<PaymentMadeDTO, "id">
  >
) => {
  return useEntityMutation<PaymentMadeDTO, Omit<PaymentMadeDTO, "id">>({
    mutationFn: createPaymentMade,
    queryKeyToInvalidate: ["payment-made"],
    options,
  });
};

// Hook for deleting a payment made
export const useDeletePaymentMade = (
  options?: UseMutationOptions<void, Error, number>
) => {
  return useEntityMutation<void, number>({
    mutationFn: deletePaymentMade,
    queryKeyToInvalidate: ["payment-made"],
    options,
  });
};
