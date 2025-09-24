import { useQuery } from "@tanstack/react-query";
import {
  getCustomerContacts,
  createCustomerContact,
  updateCustomerContact,
  deleteCustomerContact,
  createCustomerContactsBulk,
} from "@/api/modules/customerContacts";
import { CustomerContactDTO } from "@/types/CustomerContactDTO";
import { useEntityMutation } from "@/hooks/useEntityMutation";
import { UseMutationOptions } from "@tanstack/react-query";

// Hook para traer contactos de un cliente
export const useCustomerContacts = (customerId: number) => {
  return useQuery<CustomerContactDTO[]>({
    queryKey: ["customerContacts", customerId],
    queryFn: () => getCustomerContacts(customerId),
  });
};

// Hook para crear un contacto
export const useCreateCustomerContact = (
  options?: UseMutationOptions<CustomerContactDTO, Error, Omit<CustomerContactDTO, "id">>
) => {
  return useEntityMutation<CustomerContactDTO, Omit<CustomerContactDTO, "id">>({
    mutationFn: createCustomerContact,
    queryKeyToInvalidate: ["customerContacts"],
    options,
  });
};

export const useCreateCustomerContactsBulk = (
  options?: UseMutationOptions<CustomerContactDTO[], Error, Omit<CustomerContactDTO, "id">[]>
) => {
  return useEntityMutation<CustomerContactDTO[], Omit<CustomerContactDTO, "id">[]>({
    mutationFn: createCustomerContactsBulk,
    queryKeyToInvalidate: ["customerContacts"],
    options,
  });
};


// Hook para actualizar un contacto
export const useUpdateCustomerContact = (
  options?: UseMutationOptions<CustomerContactDTO, Error, CustomerContactDTO>
) => {
  return useEntityMutation<CustomerContactDTO, CustomerContactDTO>({
    mutationFn: updateCustomerContact,
    queryKeyToInvalidate: ["customerContacts"],
    options,
  });
};

// Hook para eliminar un contacto
export const useDeleteCustomerContact = (
  options?: UseMutationOptions<void, Error, number>
) => {
  return useEntityMutation<void, number>({
    mutationFn: deleteCustomerContact,
    queryKeyToInvalidate: ["customerContacts"],
    options,
  });
};
