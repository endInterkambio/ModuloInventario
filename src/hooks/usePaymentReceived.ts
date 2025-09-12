import {
  createPaymentReceived,
  deletePaymentReceived,
  fetchPaymentReceived,
} from "@/api/modules/paymentReceived";
import { UseMutationOptions, useQuery } from "@tanstack/react-query";
import { PaymentReceivedDTO } from "@/types/PaymentReceivedDTO";
import { useEntityMutation } from "./useEntityMutation";
import { Page } from "@/types/Pagination";

export const usePaymentReceived = (page = 0, size = 12, searchTerm: string = "") => {
  return useQuery<Page<PaymentReceivedDTO>>({
    queryKey: ["payment-received", page, size, searchTerm],
    queryFn: () => fetchPaymentReceived(page, size, searchTerm),
  });
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
