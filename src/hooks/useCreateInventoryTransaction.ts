import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createTransaction } from "@/api/modules/inventoryTransactions";
import { InventoryTransactionDTO } from "@/types/InventoryTransactionDTO";

export function useCreateInventoryTransaction() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (transaction: Partial<InventoryTransactionDTO>) =>
      createTransaction(transaction),
    onSuccess: () => {
      toast.success("Transferencia realizada con éxito");
      // Refrescar libros
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
    onError: (err) => {
      console.error(err);
      toast.error("Error al realizar transferencia");
    },
  });

  // Retornamos el mutate y el estado de la mutación
  return {
    createTransaction: mutation.mutate,
    isMutating: mutation.status === "pending",
  };
}
