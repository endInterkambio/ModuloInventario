export interface InventoryTransactionDTO {
  id: number;
  transactionDate: string; // ISO date string
  bookSku: string; // ID of the book being transacted
  fromLocationId: number; // ID of the source location
  toLocationId: number | undefined; // ID of the destination location (if applicable)
  transactionType: string; // e.g., "TRANSFER", "RETURN_IN", "ADJUSTMENT"
  quantity: number; // Quantity of the book being transacted
  reason: string; // Reason for the transaction
  userId: number; // ID of the user performing the transaction
  createdAt: string; // ISO date string
}
