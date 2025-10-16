import { SupplierDTO } from "@/types/SupplierDTO";
import axiosInstance from "../axiosInstance";
import { endpoints } from "../endpoints";
import { Page } from "@/types/Pagination";

// 🔹 Obtener lista paginada de proveedores
export const getSuppliers = async (
  page: number = 0,
  size: number = 12,
  sortBy: string = "createdAt",
  sortDirection: "asc" | "desc" = "desc",
  filters?: Record<string, string>
): Promise<Page<SupplierDTO>> => {
  const response = await axiosInstance.get<Page<SupplierDTO>>(
    endpoints.suppliers,
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

// 🔹 Crear nuevo proveedor
export const createSupplier = async (
  supplier: Omit<SupplierDTO, "id">
): Promise<SupplierDTO> => {
  const response = await axiosInstance.post<SupplierDTO>(
    endpoints.suppliers,
    supplier
  );
  return response.data;
};

// 🔹 Actualizar proveedor parcialmente por ID
export const updateSupplier = async (
  id: number,
  data: Partial<SupplierDTO>
): Promise<SupplierDTO> => {
  const response = await axiosInstance.patch<SupplierDTO>(
    `${endpoints.suppliers}/${id}`,
    data
  );
  return response.data;
};

// 🔹 Eliminar proveedor por ID
export const deleteSupplier = async (id: number): Promise<void> => {
  await axiosInstance.delete(`${endpoints.suppliers}/${id}`);
};
