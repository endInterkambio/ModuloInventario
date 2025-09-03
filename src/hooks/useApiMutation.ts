import { useMutation, useQueryClient, UseMutationOptions } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance";

export function useApiMutation<TData = unknown, TVariables = void>({
  url,
  method,
  queryKeyToInvalidate,
  options,
}: {
  url: string;
  method: "post" | "put" | "patch" | "delete";
  queryKeyToInvalidate?: readonly unknown[];
  options?: UseMutationOptions<TData, Error, TVariables>;
}) {
  const queryClient = useQueryClient();

  return useMutation<TData, Error, TVariables>({
    mutationFn: async (vars: TVariables) => {
      const { data } = await axiosInstance.request<TData>({
        url,
        method,
        data: vars,
      });
      return data;
    },
    onSuccess: (data, vars, ctx) => {
      if (queryKeyToInvalidate) {
        queryClient.invalidateQueries({ queryKey: queryKeyToInvalidate });
      }
      options?.onSuccess?.(data, vars, ctx);
    },
    ...options,
  });
}
