import { PaymentReceivedDTO } from "@/types/PaymentReceivedDTO";
import axiosInstance from "../axiosInstance";
import { endpoints } from "../endpoints";
import { Page } from "@/types/Pagination";

export const getPaymentReceived = async (
  page: number = 0,
  size: number = 12,
  sortBy: string = "paymentDate",
  sortDirection: "asc" | "desc" = "desc",
  filters?: Record<string, string>
): Promise<Page<PaymentReceivedDTO>> => {
  const response = await axiosInstance.get<Page<PaymentReceivedDTO>>(
    endpoints.paymentReceived,
    {
      params: {
        page,
        size,
        sort: `${sortBy},${sortDirection}`,
        ...filters,
      },
    }
  );
  return response.data;
};

export const createPaymentReceived = async (
  paymentReceived: Omit<PaymentReceivedDTO, "id">
): Promise<PaymentReceivedDTO> => {
  const response = await axiosInstance.post<PaymentReceivedDTO>(
    endpoints.paymentReceived,
    paymentReceived
  );
  return response.data;
};

export const deletePaymentReceived = async (id: number): Promise<void> => {
  await axiosInstance.delete(`${endpoints.paymentReceived}/${id}`);
};
