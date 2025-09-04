import { useQuery } from "@tanstack/react-query";
import { Page } from "@/types/Pagination";
import { CustomerDTO } from "@/types/CustomerDTO";
import {
  fetchCustomers,
  createCustomer,
  deleteCustomer,
} from "@/api/modules/customers";
import { useEntityMutation } from "@/hooks/useEntityMutation";
import { UseMutationOptions } from "@tanstack/react-query";

// Hook para obtener clientes con paginación
export const useCustomers = (page = 0, size = 12, searchTerm: string = "") => {
  return useQuery<Page<CustomerDTO>>({
    queryKey: ["customers", page, size, searchTerm],
    queryFn: () => fetchCustomers(page, size, searchTerm),
  });
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
