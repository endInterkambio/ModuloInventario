import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from "@tanstack/react-query";

type MutationFn<TData, TVariables> = (vars: TVariables) => Promise<TData>;

export function useEntityMutation<TData = unknown, TVariables = void>({
  mutationFn,
  queryKeyToInvalidate,
  options,
}: {
  mutationFn: MutationFn<TData, TVariables>;
  queryKeyToInvalidate: readonly unknown[];
  options?: UseMutationOptions<TData, Error, TVariables>;
}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onSuccess: (data, variables, context, mutateResult) => {
      queryClient.invalidateQueries({
        queryKey: queryKeyToInvalidate,
        exact: false,
        refetchType: "all",
      });

      if (options?.onSuccess) {
        options.onSuccess(data, variables, context, mutateResult);
      }
    },
    ...options,
  });
}
