import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateLocationPartial } from "@/api/modules/bookLocations";
import { BookStockLocationDTO } from "@/types/BookStockLocationDTO";

export function useUpdateLocation({
  onStart,
  onFinish,
}: {
  onStart?: (locationId: number) => void;
  onFinish?: (locationId: number) => void;
}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ locationId, data }: { locationId: number; data: Partial<BookStockLocationDTO> }) =>
      updateLocationPartial(locationId, data),
    onMutate: async ({ locationId }) => {
      onStart?.(locationId);
    },
    onSettled: (updatedLocation) => {
      if (updatedLocation) onFinish?.(updatedLocation.id);

      queryClient.invalidateQueries({ queryKey: ["book-stock-locations"] });
      queryClient.invalidateQueries({ queryKey: ["book-stock-locations", updatedLocation?.id] });
    },
  });
}

