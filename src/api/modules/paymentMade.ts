import { PaymentMadeDTO } from "@/types/PaymentMadeDTO";
import axiosInstance from "../axiosInstance";
import { endpoints } from "../endpoints";
import { Page } from "@/types/Pagination";

// Fetch all payments made (paginated)
export const getPaymentMade = async (
  page: number = 0,
  size: number = 12,
  sortBy: string = "paymentDate",
  sortDirection: "asc" | "desc" = "desc",
  filters?: Record<string, string>
): Promise<Page<PaymentMadeDTO>> => {
  const response = await axiosInstance.get<Page<PaymentMadeDTO>>(
    endpoints.paymentMade,
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

// Create a new payment made
export const createPaymentMade = async (
  paymentMade: Omit<PaymentMadeDTO, "id">
): Promise<PaymentMadeDTO> => {
  const response = await axiosInstance.post<PaymentMadeDTO>(
    endpoints.paymentMade,
    paymentMade
  );
  return response.data;
};

// Delete payment made by ID
export const deletePaymentMade = async (id: number): Promise<void> => {
  await axiosInstance.delete(`${endpoints.paymentMade}/${id}`);
};
