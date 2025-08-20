import { BookStockAdjustmentDTO } from "@/types/BookStockAdjustmentDTO";
import axiosInstance from "@/api/axiosInstance";
import { endpoints } from "../endpoints";

// ✅ Crear ajuste de stock
export const createStockAdjustment = async (
  data: Omit<BookStockAdjustmentDTO, "id" | "performedAt">
): Promise<BookStockAdjustmentDTO> => {
  const response = await axiosInstance.post(endpoints.bookStockAdjustments, data);
  return response.data;
};
