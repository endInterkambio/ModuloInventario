import { WarehouseDTO } from "@/types/WarehouseDTO";
import axiosInstance from "../axiosInstance";
import { endpoints } from "../endpoints";

// 🔹 GET all warehouses
export const getWarehouses = async (): Promise<WarehouseDTO[]> => {
  const response = await axiosInstance.get(endpoints.warehouses);
  return response.data;
};

// 🔹 POST new warehouse
export const createWarehouse = async (
  data: Partial<WarehouseDTO>
): Promise<WarehouseDTO> => {
  const response = await axiosInstance.post(endpoints.warehouses, data);
  return response.data;
};

// 🔹 PATCH warehouse by ID (partial update)
export const updateWarehouse = async (
  id: number,
  data: Partial<WarehouseDTO>
): Promise<WarehouseDTO> => {
  const response = await axiosInstance.patch(`${endpoints.warehouses}/${id}`, data);
  return response.data;
};

// 🔹 DELETE warehouse by ID
export const deleteWarehouse = async (id: number): Promise<void> => {
  await axiosInstance.delete(`${endpoints.warehouses}/${id}`);
};
