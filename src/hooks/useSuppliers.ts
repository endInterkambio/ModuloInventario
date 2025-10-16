import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Page } from "@/types/Pagination";
import { SupplierDTO } from "@/types/SupplierDTO";
import {
  createSupplier,
  deleteSupplier,
  getSuppliers,
  updateSupplier,
} from "@/api/modules/suppliers";
import { useEntityMutation } from "@/hooks/useEntityMutation";
import { UseMutationOptions } from "@tanstack/react-query";
import { useSupplierStore } from "@/stores/useSupplierStore";

interface UpdateSupplierVariables {
  id: number;
  data: Partial<SupplierDTO>;
}

// 🔹 Hook de consulta paginada
export const useSuppliers = (
  page = 0,
  size = 12,
  sortBy: string = "createdAt",
  sortDirection: "asc" | "desc" = "desc",
  filters?: Record<string, string>
) => {
  return useQuery<Page<SupplierDTO>>({
    queryKey: ["suppliers", page, size, sortBy, sortDirection, filters],
    queryFn: () => getSuppliers(page, size, sortBy, sortDirection, filters),
  });
};

// 🔹 Hook que usa el store global (Zustand)
export const useSuppliersWithStore = () => {
  const { currentPage, itemsPerPage, sortBy, sortDirection, filters } =
    useSupplierStore();
  return useSuppliers(
    currentPage - 1,
    itemsPerPage,
    sortBy,
    sortDirection,
    filters
  );
};

// 🔹 Hook para crear proveedor
export const useCreateSupplier = (
  options?: UseMutationOptions<SupplierDTO, Error, Omit<SupplierDTO, "id">>
) => {
  return useEntityMutation<SupplierDTO, Omit<SupplierDTO, "id">>({
    mutationFn: createSupplier,
    queryKeyToInvalidate: ["suppliers"],
    options,
  });
};

// 🔹 Hook para actualizar proveedor (actualización parcial)
export function useUpdateSupplier(
  options?: UseMutationOptions<SupplierDTO, Error, UpdateSupplierVariables>
) {
  const queryClient = useQueryClient();

  return useEntityMutation<SupplierDTO, UpdateSupplierVariables>({
    mutationFn: ({ id, data }) => updateSupplier(id, data),
    queryKeyToInvalidate: ["suppliers"],
    options: {
      ...options,
      onSuccess: (updatedSupplier, variables, context, mutateResult) => {
        // Actualizar cache individual
        queryClient.setQueryData<SupplierDTO>(
          ["supplier", updatedSupplier.id],
          updatedSupplier
        );

        // Invalidar lista general
        queryClient.invalidateQueries({ queryKey: ["suppliers"] });

        // Invalidar detalle (por consistencia)
        queryClient.invalidateQueries({
          queryKey: ["supplier", updatedSupplier.id],
        });

        // Ejecutar callback adicional
        options?.onSuccess?.(updatedSupplier, variables, context, mutateResult);
      },
    },
  });
}

// 🔹 Hook para eliminar proveedor
export const useDeleteSupplier = (
  options?: UseMutationOptions<void, Error, number>
) => {
  return useEntityMutation<void, number>({
    mutationFn: deleteSupplier,
    queryKeyToInvalidate: ["suppliers"],
    options,
  });
};
