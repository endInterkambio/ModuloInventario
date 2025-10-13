import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Page } from "@/types/Pagination";
import { CustomerDTO } from "@/types/CustomerDTO";
import {
  createCustomer,
  deleteCustomer,
  getCustomers,
  updateCustomer,
} from "@/api/modules/customers";
import { useEntityMutation } from "@/hooks/useEntityMutation";
import { UseMutationOptions } from "@tanstack/react-query";
import { useCustomerStore } from "@/stores/useCustomerStore";

interface UpdateCustomerVariables {
  id: number;
  data: Partial<CustomerDTO>;
}

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
  const { currentPage, itemsPerPage, sortBy, sortDirection, filters } =
    useCustomerStore();
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

// Hook para actualizar un cliente (actualización parcial)
export function useUpdateCustomer(
  options?: UseMutationOptions<CustomerDTO, Error, UpdateCustomerVariables>
) {
  const queryClient = useQueryClient();

  return useEntityMutation<CustomerDTO, UpdateCustomerVariables>({
    mutationFn: ({ id, data }) => updateCustomer(id, data),
    queryKeyToInvalidate: ["customers"],
    options: {
      ...options,
      onSuccess: (updatedCustomer, variables, context, mutateResult) => {
        // Actualizar la caché individual del cliente
        queryClient.setQueryData<CustomerDTO>(
          ["customer", updatedCustomer.id],
          updatedCustomer
        );

        // Invalidar lista general
        queryClient.invalidateQueries({ queryKey: ["customers"] });

        // Invalidar detalle (por consistencia)
        queryClient.invalidateQueries({
          queryKey: ["customer", updatedCustomer.id],
        });

        // Ejecutar onSuccess adicional si existe
        options?.onSuccess?.(updatedCustomer, variables, context, mutateResult);
      },
    },
  });
}

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
