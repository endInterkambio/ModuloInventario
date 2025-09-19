import { useQuery } from "@tanstack/react-query";
import { Page } from "@/types/Pagination";
import { CustomerDTO } from "@/types/CustomerDTO";
import {
  createCustomer,
  deleteCustomer,
  getCustomers,
} from "@/api/modules/customers";
import { useEntityMutation } from "@/hooks/useEntityMutation";
import { UseMutationOptions } from "@tanstack/react-query";
import { useCustomerStore } from "@/stores/useCustomerStore";

export const useCustomers = (
  page = 0,
  size = 12,
  sortBy: string = "name",
  sortDirection: "asc" | "desc" = "asc",
  filters?: Record<string, string>
) => {
  return useQuery<Page<CustomerDTO>>({
    queryKey: ["customers", page, size, sortBy, sortDirection, filters],
    queryFn: () => getCustomers(page, size, sortBy, sortDirection, filters),
  });
};

export const useCustomersWithStore = () => {
  const { currentPage, itemsPerPage, sortBy, sortDirection, filters } = useCustomerStore();
  return useCustomers(
    currentPage - 1,
    itemsPerPage,
    sortBy,
    sortDirection,
    filters
  );
};

// Hook para crear un cliente
export const useCreateCustomer = (
  options?: UseMutationOptions<CustomerDTO, Error, Omit<CustomerDTO, "id">>
) => {
  return useEntityMutation<CustomerDTO, Omit<CustomerDTO, "id">>({
    mutationFn: createCustomer,
    queryKeyToInvalidate: ["customers"],
    options,
  });
};

// Hook para eliminar un cliente
export const useDeleteCustomer = (
  options?: UseMutationOptions<void, Error, number>
) => {
  return useEntityMutation<void, number>({
    mutationFn: deleteCustomer,
    queryKeyToInvalidate: ["customers"],
    options,
  });
};
