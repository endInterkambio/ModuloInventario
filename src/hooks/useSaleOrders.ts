import {
  createSaleOrder,
  deleteSaleOrder,
  getSaleOrders,
  getNextSaleOrderNumber
} from "@/api/modules/saleOrders";
import { UseMutationOptions, useQuery } from "@tanstack/react-query";
import { Page } from "@/types/Pagination";
import { SaleOrderDTO } from "@/types/SaleOrderDTO";
import { useEntityMutation } from "./useEntityMutation";

// Hook for obtaining orders with pagination
export const useSaleOrders = (page = 0, size = 12) => {
  return useQuery<Page<SaleOrderDTO>>({
    queryKey: ["saleOrders", page, size],
    queryFn: () => getSaleOrders(page, size),
  });
};

// Hook for getting the next sale order number
export const useNextSaleOrderNumber = () => {
  return useQuery<string>({
    queryKey: ["nextSaleOrderNumber"],
    queryFn: getNextSaleOrderNumber,
  });
};

// Hook for create a sale order
export const useCreateSaleOrder = (
  options?: UseMutationOptions<SaleOrderDTO, Error, Omit<SaleOrderDTO, "id">>
) => {
  return useEntityMutation<SaleOrderDTO, Omit<SaleOrderDTO, "id">>({
    mutationFn: createSaleOrder,
    queryKeyToInvalidate: ["saleOrders"],
    options,
  });
};

// Hook for delete a sale order
export const useDeleteSaleOrder = (
  options?: UseMutationOptions<void, Error, number>
) => {
  return useEntityMutation<void, number>({
    mutationFn: deleteSaleOrder,
    queryKeyToInvalidate: ["saleOrders"],
    options,
  });
};
