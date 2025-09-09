import { ShipmentMethodDTO } from "@/types/ShipmentMethodDTO";
import axiosInstance from "../axiosInstance";
import { endpoints } from "../endpoints";

// Obtener todos los métodos de envío (sin paginación)
export const fetchShipmentMethods = async (): Promise<ShipmentMethodDTO[]> => {
  const response = await axiosInstance.get<ShipmentMethodDTO[]>(endpoints.shipmentMethods);
  return response.data;
};

// Crear nuevo método de envío
export const createShipmentMethod = async (
  shipmentMethod: Omit<ShipmentMethodDTO, "id">
): Promise<ShipmentMethodDTO> => {
  const response = await axiosInstance.post<ShipmentMethodDTO>(
    endpoints.shipmentMethods,
    shipmentMethod
  );
  return response.data;
};

// Eliminar método de envío por ID
export const deleteShipmentMethod = async (id: number): Promise<void> => {
  await axiosInstance.delete(`${endpoints.shipmentMethods}/${id}`);
};
