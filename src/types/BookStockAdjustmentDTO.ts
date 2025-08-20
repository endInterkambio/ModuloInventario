import { SimpleIdNameDTO } from "./SimpleIdNameDTO";

export interface BookStockAdjustmentDTO {
  id: number;
  bookSku: string;
  locationId: number;
  adjustmentQuantity: number;
  reason: string;
  performedBy: SimpleIdNameDTO;
  performedAt: string;
}
