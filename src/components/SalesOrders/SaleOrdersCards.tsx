import { format } from "date-fns";
import {
  orderStatusConfig,
  OrderStatus,
  orderPaymentStatusConfig,
  OrderPaymentStatus,
} from "@types/orderStatusConfig";
import { SaleOrderDTO } from "@/types/SaleOrderDTO";
import { downloadSaleOrder } from "@/utils/pdf/downloadSaleOrder";

interface Props {
  saleOrders: SaleOrderDTO[];
}

export function SaleOrdersCards({ saleOrders }: Props) {
  return (
    <div className="space-y-4 lg:hidden">
      {saleOrders.map((order) => (
        <div
          key={order.id}
          className="border rounded-lg shadow-sm p-4 space-y-2"
        >
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">
              {order.createdAt
                ? format(new Date(order.createdAt), "dd/MM/yyyy")
                : "-"}
            </span>
            <span className="font-semibold">#{order.orderNumber}</span>
          </div>
          <div>
            <p className="font-medium">
              {order.customer?.customerType === "PERSON"
                ? order.customer?.name ?? "-"
                : order.customer?.companyName ?? "-"}
            </p>
            <p className="text-xs text-gray-500">
              {order.customer?.customerType ?? "-"}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {order.status && (
              <span
                className={`px-2 py-1 text-xs rounded-full 
                ${orderStatusConfig[order.status as OrderStatus]?.bgLight}
                ${orderStatusConfig[order.status as OrderStatus]?.textColor}`}
              >
                {orderStatusConfig[order.status as OrderStatus]?.label}
              </span>
            )}
            {order.paymentStatus && (
              <span
                className={`px-2 py-1 text-xs rounded-full 
                ${
                  orderPaymentStatusConfig[
                    order.paymentStatus as OrderPaymentStatus
                  ]?.bgLight
                }
                ${
                  orderPaymentStatusConfig[
                    order.paymentStatus as OrderPaymentStatus
                  ]?.textColor
                }`}
              >
                {
                  orderPaymentStatusConfig[
                    order.paymentStatus as OrderPaymentStatus
                  ]?.label
                }
              </span>
            )}
          </div>
          <div className="flex justify-between text-sm">
            <span>Total: {order.totalAmount ?? "-"}</span>
            <span>Pagado: {order.totalPaid ?? "-"}</span>
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>Canal: {order.saleChannel ?? "-"}</span>
            <button className="px-3 py-1 bg-secondary text-black font-medium rounded text-xs" onClick={() => downloadSaleOrder(order)}>
              Descargar orden
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
