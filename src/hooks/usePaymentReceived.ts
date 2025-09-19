import {
  createPaymentReceived,
  deletePaymentReceived,
  getPaymentReceived,
} from "@/api/modules/paymentReceived";
import { UseMutationOptions, useQuery } from "@tanstack/react-query";
import { PaymentReceivedDTO } from "@/types/PaymentReceivedDTO";
import { useEntityMutation } from "./useEntityMutation";
import { Page } from "@/types/Pagination";
import { usePaymentReceivedStore } from "@/stores/usePaymentReceivedStore";

export const usePaymentReceived = (
  page = 0,
  size = 12,
  sortBy: string = "paymentDate",
  sortDirection: "asc" | "desc" = "desc",
  filters?: Record<string, string>
) => {
  return useQuery<Page<PaymentReceivedDTO>>({
    queryKey: ["payment-received", page, size, sortBy, sortDirection, filters],
    queryFn: () => getPaymentReceived(page, size, sortBy, sortDirection, filters),
  });
};

export const usePaymentReceivedWithStore = () => {
  const { currentPage, itemsPerPage, sortBy, sortDirection, filters } = usePaymentReceivedStore();
  return usePaymentReceived(
    currentPage - 1,
    itemsPerPage,
    sortBy,
    sortDirection,
    filters
  );
};


export const useCreatePaymentReceived = (
  options?: UseMutationOptions<
    PaymentReceivedDTO,
    Error,
    Omit<PaymentReceivedDTO, "id">
  >
) => {
  return useEntityMutation<PaymentReceivedDTO, Omit<PaymentReceivedDTO, "id">>({
    mutationFn: createPaymentReceived,
    queryKeyToInvalidate: ["payment-received"],
    options,
  });
};

export const useDeletePaymentReceived = (
  options?: UseMutationOptions<void, Error, number>
) => {
  return useEntityMutation<void, number>({
    mutationFn: deletePaymentReceived,
    queryKeyToInvalidate: ["payment-received"],
    options,
  });
};
