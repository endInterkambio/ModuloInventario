import { Page } from "@/types/Pagination";
import { CustomerDTO } from "@/types/CustomerDTO";
import axiosInstance from "../axiosInstance";
import { endpoints } from "../endpoints";

export const getCustomers = async (
  page: number = 0,
  size: number = 12,
  sortBy: string = "name",
  sortDirection: "asc" | "desc" = "asc",
  filters?: Record<string, string>
): Promise<Page<CustomerDTO>> => {
  const response = await axiosInstance.get<Page<CustomerDTO>>(
    endpoints.customers,
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

// Create new customer
export const createCustomer = async (
  customer: Omit<CustomerDTO, "id">
): Promise<CustomerDTO> => {
  const response = await axiosInstance.post<CustomerDTO>(
    endpoints.customers,
    customer
  );
  return response.data;
};

// Update customer by ID (partially update)
export const updateCustomer = async (
  id: number,
  data: Partial<CustomerDTO>
): Promise<CustomerDTO> => {
  const response = await axiosInstance.patch(
    `${endpoints.customers}/${id}`,
    data
  );
  return response.data;
};

// Delete customer by ID
export const deleteCustomer = async (id: number): Promise<void> => {
  await axiosInstance.delete(`${endpoints.customers}/${id}`);
};
