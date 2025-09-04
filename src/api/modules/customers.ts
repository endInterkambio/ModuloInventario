import { Page } from "@/types/Pagination";
import { CustomerDTO } from "@/types/CustomerDTO";
import axiosInstance from "../axiosInstance";
import { endpoints } from "../endpoints";

export const fetchCustomers = async (
  page: number = 0,
  size: number = 12,
  searchTerm: string = ""
): Promise<Page<CustomerDTO>> => {
  const response = await axiosInstance.get<Page<CustomerDTO>>(
    endpoints.customers + "/search",
    {
      params: { page, size, name: searchTerm },
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

// Delete customer by ID
export const deleteCustomer = async (id: number): Promise<void> => {
  await axiosInstance.delete(`${endpoints.customers}/${id}`);
};
