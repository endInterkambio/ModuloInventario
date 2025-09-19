import { SaleOrderDTO } from "@/types/SaleOrderDTO";
import axiosInstance from "../axiosInstance";
import { Page } from "@/types/Pagination";
import { endpoints } from "../endpoints";

// Fetching all sale orders paginated
export const getSaleOrders = async (
  page: number = 0,
  size: number = 12,
  sortBy: string = "createdAt",
  sortDirection: "asc" | "desc" = "desc",
  filters?: Record<string, string>
): Promise<Page<SaleOrderDTO>> => {
  const response = await axiosInstance.get<Page<SaleOrderDTO>>(
    endpoints.saleOrders,
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

export const fetchSaleOrderById = async (id: number): Promise<SaleOrderDTO> => {
  const response = await axiosInstance.get<SaleOrderDTO>(
    `${endpoints.saleOrders}/${id}`
  );
  return response.data;
};

// Get next sale order number
export const getNextSaleOrderNumber = async (): Promise<string> => {
  const response = await axiosInstance.get<string>(
    `${endpoints.saleOrders}/next-order-number`
  );
  return response.data;
};

// Create new sale order
export const createSaleOrder = async (
  saleOrder: Omit<SaleOrderDTO, "id">
): Promise<SaleOrderDTO> => {
  const response = await axiosInstance.post<SaleOrderDTO>(
    endpoints.saleOrders,
    saleOrder
  );
  return response.data;
};

// Delele saleOrder by ID
export const deleteSaleOrder = async (id: number): Promise<void> => {
  await axiosInstance.delete(`${endpoints.saleOrders}/${id}`);
};
