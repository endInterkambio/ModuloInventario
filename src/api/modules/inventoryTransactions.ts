import { InventoryTransactionDTO } from "@/types/InventoryTransactionDTO";
import axiosInstance from "../axiosInstance";
import { endpoints } from "../endpoints";

export async function createTransaction(transaction: Partial<InventoryTransactionDTO>) {
  const { data } = await axiosInstance.post(endpoints.inventoryTransactions, transaction);
  return data;
}
