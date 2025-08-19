import { useMutation, useQueryClient, UseMutationOptions } from '@tanstack/react-query';

type MutationFn<TData, TVariables> = (vars: TVariables) => Promise<TData>;

export function useEntityMutation<TData = unknown, TVariables = void>({
  mutationFn,
  queryKeyToInvalidate,
  options,
}: {
  mutationFn: MutationFn<TData, TVariables>;
  queryKeyToInvalidate: readonly unknown[]; // por ejemplo ['warehouses']
  options?: UseMutationOptions<TData, Error, TVariables>;
}) {
  const queryClient = useQueryClient();

  return useMutation<TData, Error, TVariables>({
    mutationFn,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: queryKeyToInvalidate });
      options?.onSuccess?.(data, variables, context);
    },
    ...options,
  });
}
