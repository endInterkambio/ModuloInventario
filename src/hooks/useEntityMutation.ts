import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from "@tanstack/react-query";

type MutationFn<TData, TVariables> = (vars: TVariables) => Promise<TData>;

export function useEntityMutation<
  TData = unknown,
  TVariables = void,
  TContext = unknown
>({
  mutationFn,
  getEntityKey,
  queryKeyToInvalidate,
  options,
}: {
  mutationFn: MutationFn<TData, TVariables>;
  queryKeyToInvalidate: readonly unknown[];
  /**
   * (Opcional) función para obtener la queryKey del detalle
   * Ejemplo: (data) => ["customer", data.id]
   */
  getEntityKey?: (data: TData) => readonly unknown[];
  options?: UseMutationOptions<TData, Error, TVariables, TContext>;
}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onSuccess: (data, variables, context, mutateResult) => {
      // Invalidar lista principal
      queryClient.invalidateQueries({
        queryKey: queryKeyToInvalidate,
        exact: false,
        refetchType: "all",
      });

      // Invalidar o actualizar el detalle, si se proporcionó `getEntityKey`
      if (getEntityKey) {
        const entityKey = getEntityKey(data);
        queryClient.setQueryData(entityKey, data);
        queryClient.invalidateQueries({ queryKey: entityKey });
      }

      // Llama a onSuccess personalizado si existe
      if (options?.onSuccess) {
        options.onSuccess(data, variables, context, mutateResult);
      }
    },
    ...options,
  });
}
