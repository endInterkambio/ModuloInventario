import {
  createShipmentMethod,
  deleteShipmentMethod,
  fetchShipmentMethods,
} from "@/api/modules/shipmentMethod";
import { UseMutationOptions, useQuery } from "@tanstack/react-query";
import { ShipmentMethodDTO } from "@/types/ShipmentMethodDTO";
import { useEntityMutation } from "./useEntityMutation";

// Hook para listar métodos de envío
export const useShipmentMethods = () => {
  return useQuery<ShipmentMethodDTO[]>({
    queryKey: ["shipmentMethods"],
    queryFn: fetchShipmentMethods,
  });
};

// Hook para crear método de envío
export const useCreateShipmentMethod = (
  options?: UseMutationOptions<ShipmentMethodDTO, Error, Omit<ShipmentMethodDTO, "id">>
) => {
  return useEntityMutation<ShipmentMethodDTO, Omit<ShipmentMethodDTO, "id">>({
    mutationFn: createShipmentMethod,
    queryKeyToInvalidate: ["shipmentMethods"],
    options,
  });
};

// Hook para eliminar método de envío
export const useDeleteShipmentMethod = (
  options?: UseMutationOptions<void, Error, number>
) => {
  return useEntityMutation<void, number>({
    mutationFn: deleteShipmentMethod,
    queryKeyToInvalidate: ["shipmentMethods"],
    options,
  });
};
