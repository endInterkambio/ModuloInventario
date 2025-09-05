import { SaleOrderCustomerDTO } from "./SaleOrderCustomerDTO";
import { SaleOrderItemDTO } from "./SaleOrderItemDTO";
import { SimpleIdNameDTO } from "./SimpleIdNameDTO";

export interface SaleOrderDTO {
    id: number;
    orderNumber: string;
    orderDate: string;
    createdAt: string;
    createdBy: SimpleIdNameDTO;
    saleChannel: string;
    amount: number;
    amountShipment?: number;
    additionalFee?: number;
    totalAmount: number,
    totalPaid?: number;
    status: string;
    paymentStatus: string;
    customer: SaleOrderCustomerDTO;
    items: SaleOrderItemDTO[];
}