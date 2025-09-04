import { SaleOrderDTO } from "@/types/SaleOrderDTO";
import axiosInstance from "../axiosInstance";
import { Page } from "@/types/Pagination";
import { endpoints } from "../endpoints";

// Fetching all sale orders paginated
export const getSaleOrders = async (
  page: number = 0,
  size: number = 12
): Promise<Page<SaleOrderDTO>> => {
  const response = await axiosInstance.get<Page<SaleOrderDTO>>(
    endpoints.saleOrders,
    {
      params: { page, size },
    }
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
