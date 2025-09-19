import {
  createShipment,
  deleteShipment,
  getShipments,
} from "@/api/modules/shipment";
import { UseMutationOptions, useQuery } from "@tanstack/react-query";
import { ShipmentDTO } from "@/types/ShipmentDTO";
import { useEntityMutation } from "./useEntityMutation";
import { Page } from "@/types/Pagination";
import { useShipmentStore } from "@/stores/useShipmentStore";

export const useShipments = (
  page = 0,
  size = 12,
  sortBy: string = "shipmentDate",
  sortDirection: "asc" | "desc" = "desc",
  filters?: Record<string, string>
) => {
  return useQuery<Page<ShipmentDTO>>({
    queryKey: ["shipments", page, size, sortBy, sortDirection, filters],
    queryFn: () => getShipments(page, size, sortBy, sortDirection, filters),
  });
};

export const useShipmentsWithStore = () => {
  const { currentPage, itemsPerPage, sortBy, sortDirection, filters } = useShipmentStore();
  return useShipments(
    Math.max(0, currentPage - 1), // backend base 0
    itemsPerPage,
    sortBy,
    sortDirection,
    filters
  );
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
