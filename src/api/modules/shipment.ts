import { ShipmentDTO } from "@/types/ShipmentDTO";
import axiosInstance from "../axiosInstance";
import { endpoints } from "../endpoints";
import { Page } from "@/types/Pagination";

export const getShipments = async (
  page: number = 0,
  size: number = 12,
  sortBy: string = "shipmentDate",
  sortDirection: "asc" | "desc" = "desc",
  filters?: Record<string, string>
): Promise<Page<ShipmentDTO>> => {
  const response = await axiosInstance.get<Page<ShipmentDTO>>(endpoints.shipments, {
    params: {
      page,
      size,
      sort: `${sortBy},${sortDirection}`,
      ...filters,
    },
  });
  return response.data;
};

// Create new Shipment order
export const createShipment = async (
  shipment: Omit<ShipmentDTO, "id">
): Promise<ShipmentDTO> => {
  const response = await axiosInstance.post<ShipmentDTO>(
    endpoints.shipments,
    shipment
  );
  return response.data;
};

// Delete shipment by ID
export const deleteShipment = async (id: number): Promise<void> => {
  await axiosInstance.delete(`${endpoints.shipments}/${id}`);
};
