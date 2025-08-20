// hooks/useWarehouses.ts
import { WarehouseDTO } from '@/types/WarehouseDTO';
import * as warehouseApi from '@/api/modules/warehouses';
import { useEntityMutation } from './useEntityMutation';
import { useQuery } from '@tanstack/react-query';

// 🔹 GET warehouses
export const useWarehouses = () => {
  return useQuery<WarehouseDTO[], Error>({
    queryKey: ['warehouses'],
    queryFn: warehouseApi.getWarehouses,
    staleTime: 1000 * 60 * 5,
    //cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });
};

// 🔹 Mutaciones usando el helper genérico
export const useCreateWarehouse = () =>
  useEntityMutation({
    mutationFn: warehouseApi.createWarehouse,
    queryKeyToInvalidate: ['warehouses'],
  });

export const useUpdateWarehouse = () =>
  useEntityMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<WarehouseDTO> }) =>
      warehouseApi.updateWarehouse(id, data),
    queryKeyToInvalidate: ['warehouses'],
  });

export const useDeleteWarehouse = () =>
  useEntityMutation({
    mutationFn: (id: number) => warehouseApi.deleteWarehouse(id),
    queryKeyToInvalidate: ['warehouses'],
  });
