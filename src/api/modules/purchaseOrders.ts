import { PurchaseOrderDTO } from "@/types/PurchaseOrderDTO";
import axiosInstance from "../axiosInstance";
import { Page } from "@/types/Pagination";
import { endpoints } from "../endpoints";

// Fetch all purchase orders paginated
export const getPurchaseOrders = async (
  page: number = 0,
  size: number = 12,
  sortBy: string = "createdAt",
  sortDirection: "asc" | "desc" = "desc",
  filters?: Record<string, string>
): Promise<Page<PurchaseOrderDTO>> => {
  const response = await axiosInstance.get<Page<PurchaseOrderDTO>>(
    endpoints.purchaseOrders,
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

// Fetch a single purchase order by ID
export const fetchPurchaseOrderById = async (
  id: number
): Promise<PurchaseOrderDTO> => {
  const response = await axiosInstance.get<PurchaseOrderDTO>(
    `${endpoints.purchaseOrders}/${id}`
  );
  return response.data;
};

// Get next purchase order number
export const getNextPurchaseOrderNumber = async (): Promise<string> => {
  const response = await axiosInstance.get<string>(
    `${endpoints.purchaseOrders}/next-order-number`
  );
  return response.data;
};

// Create new purchase order
export const createPurchaseOrder = async (
  purchaseOrder: Omit<PurchaseOrderDTO, "id">
): Promise<PurchaseOrderDTO> => {
  const response = await axiosInstance.post<PurchaseOrderDTO>(
    endpoints.purchaseOrders,
    purchaseOrder
  );
  return response.data;
};

// Delete purchase order by ID
export const deletePurchaseOrder = async (id: number): Promise<void> => {
  await axiosInstance.delete(`${endpoints.purchaseOrders}/${id}`);
};
