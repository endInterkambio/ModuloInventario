import { CustomerContactDTO } from "@/types/CustomerContactDTO";
import axiosInstance from "../axiosInstance";
import { endpoints } from "../endpoints";

// Obtener contactos de un cliente
export const getCustomerContacts = async (customerId: number): Promise<CustomerContactDTO[]> => {
  const response = await axiosInstance.get<CustomerContactDTO[]>(
    `${endpoints.customerContacts}?customerId=${customerId}`
  );
  return response.data;
};

// Crear nuevo contacto
export const createCustomerContact = async (
  contact: Omit<CustomerContactDTO, "id">
): Promise<CustomerContactDTO> => {
  const response = await axiosInstance.post<CustomerContactDTO>(
    endpoints.customerContacts,
    contact // debe incluir customerId
  );
  return response.data;
};

// Crear varios contactos de una vez
export const createCustomerContactsBulk = async (
  contacts: Omit<CustomerContactDTO, "id">[]
): Promise<CustomerContactDTO[]> => {
  const response = await axiosInstance.post<CustomerContactDTO[]>(
    `${endpoints.customerContacts}/bulk`,
    contacts
  );
  return response.data;
};


// Actualizar contacto existente
export const updateCustomerContact = async (
  contact: CustomerContactDTO
): Promise<CustomerContactDTO> => {
  const response = await axiosInstance.put<CustomerContactDTO>(
    `${endpoints.customerContacts}/${contact.id}`,
    contact
  );
  return response.data;
};

// Eliminar contacto por ID
export const deleteCustomerContact = async (id: number): Promise<void> => {
  await axiosInstance.delete(`${endpoints.customerContacts}/${id}`);
};
