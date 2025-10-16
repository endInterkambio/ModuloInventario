import {
  createPurchaseOrder,
  deletePurchaseOrder,
  getPurchaseOrders,
  getNextPurchaseOrderNumber,
  fetchPurchaseOrderById,
} from "@/api/modules/purchaseOrders";
import { UseMutationOptions, useQuery } from "@tanstack/react-query";
import { Page } from "@/types/Pagination";
import { PurchaseOrderDTO } from "@/types/PurchaseOrderDTO";
import { useEntityMutation } from "./useEntityMutation";
import { usePurchaseOrderStore } from "@/stores/usePurchaseOrder";

// Hook for obtaining purchase orders with pagination
export const usePurchaseOrders = (
  page = 0,
  size = 12,
  sortBy: string = "createdAt",
  sortDirection: "asc" | "desc" = "desc",
  filters?: Record<string, string>
) => {
  const filtersKey = JSON.stringify(filters ?? {});

  return useQuery<Page<PurchaseOrderDTO>>({
    queryKey: ["purchase-orders", page, size, sortBy, sortDirection, filtersKey],
    queryFn: () =>
      getPurchaseOrders(page, size, sortBy, sortDirection, filters),
  });
};

// Hook using Zustand store for pagination and filters
export const usePurchaseOrdersWithStore = () => {
  const { currentPage, itemsPerPage, filters } = usePurchaseOrderStore();
  return usePurchaseOrders(
    currentPage - 1,
    itemsPerPage,
    "createdAt",
    "desc",
    filters
  );
};

// Hook for fetching a single purchase order by ID
export const usePurchaseOrder = (id?: number) => {
  return useQuery<PurchaseOrderDTO>({
    queryKey: ["purchase-orders", id],
    queryFn: () => fetchPurchaseOrderById(id!),
    enabled: !!id,
  });
};

// Hook for getting the next purchase order number
export const useNextPurchaseOrderNumber = () => {
  return useQuery<string>({
    queryKey: ["purchase-orders", "next-number"],
    queryFn: getNextPurchaseOrderNumber,
  });
};

// Hook for creating a new purchase order
export const useCreatePurchaseOrder = (
  options?: UseMutationOptions<
    PurchaseOrderDTO,
    Error,
    Omit<PurchaseOrderDTO, "id">
  >
) => {
  return useEntityMutation<PurchaseOrderDTO, Omit<PurchaseOrderDTO, "id">>({
    mutationFn: createPurchaseOrder,
    queryKeyToInvalidate: [
      { queryKey: ["purchase-orders"], exact: false, refetchType: "all" },
    ],
    options,
  });
};

// Hook for deleting a purchase order
export const useDeletePurchaseOrder = (
  options?: UseMutationOptions<void, Error, number>
) => {
  return useEntityMutation<void, number>({
    mutationFn: deletePurchaseOrder,
    queryKeyToInvalidate: [
      { queryKey: ["purchase-orders"], exact: false, refetchType: "all" },
    ],
    options,
  });
};
