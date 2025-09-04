import { PaymentReceivedDTO } from "@/types/PaymentReceivedDTO";
import axiosInstance from "../axiosInstance";
import { endpoints } from "../endpoints";
import { Page } from "@/types/Pagination";

export const fetchPaymentReceived = async (
  page: number = 0,
  size: number = 12,
  searchTerm: string = ""
): Promise<Page<PaymentReceivedDTO>> => {
  const response = await axiosInstance.get<Page<PaymentReceivedDTO>>(
    endpoints.paymentReceived + "/search",
    {
      params: { page, size, name: searchTerm },
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
