import { ShipmentDTO } from "@/types/ShipmentDTO";
import axiosInstance from "../axiosInstance";
import { endpoints } from "../endpoints";
import { Page } from "@/types/Pagination";

export const fetchShipments = async (
    page: number = 0,
    size: number = 12,
    searchTerm: string = ""
): Promise<Page<ShipmentDTO>> => {
    const response = await axiosInstance.get<Page<ShipmentDTO>>(
        endpoints.shipments + "/search",
        {
            params: {page, size, name: searchTerm}
        }
    );
    return response.data;
}

// Create new Shipment order
export const createShipment = async (
    shipment: Omit<ShipmentDTO, "id">
): Promise<ShipmentDTO> => {
    const response = await axiosInstance.post<ShipmentDTO>(
        endpoints.shipments,
        shipment
    );
    return response.data;
}

// Delete shipment by ID
export const deleteShipment = async (id: number): Promise<void> => {
    await axiosInstance.delete(`${endpoints.shipments}/${id}`)
}