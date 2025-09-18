import {
  createShipment,
  deleteShipment,
  fetchShipments,
} from "@/api/modules/shipment";
import { UseMutationOptions, useQuery } from "@tanstack/react-query";
import { ShipmentDTO } from "@/types/ShipmentDTO";
import { useEntityMutation } from "./useEntityMutation";
import { Page } from "@/types/Pagination";

export const useShipments = (page = 0, size = 12, searchTerm: string = "") => {
  return useQuery<Page<ShipmentDTO>>({
    queryKey: ["shipments", page, size, searchTerm],
    queryFn: () => fetchShipments(page, size, searchTerm || undefined),
  });
};

export const useCreateShipment = (
  options?: UseMutationOptions<ShipmentDTO, Error, Omit<ShipmentDTO, "id">>
) => {
  return useEntityMutation<ShipmentDTO, Omit<ShipmentDTO, "id">>({
    mutationFn: createShipment,
    queryKeyToInvalidate: ["shipments"],
    options,
  });
};

export const useDeleteShipment = (
  options?: UseMutationOptions<void, Error, number>
) => {
  return useEntityMutation<void, number>({
    mutationFn: deleteShipment,
    queryKeyToInvalidate: ["shipments"],
    options,
  });
};
