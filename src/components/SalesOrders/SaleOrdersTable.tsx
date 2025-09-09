import { format } from "date-fns";
import {
  orderStatusConfig,
  OrderStatus,
  orderPaymentStatusConfig,
  OrderPaymentStatus,
} from "@components/SalesOrderForm/constants/orderStatusConfig";
import { SaleOrderDTO } from "@/types/SaleOrderDTO";
import { downloadPDF } from "@/utils/downloadPDF";

interface Props {
  saleOrders: SaleOrderDTO[];
}

export function SaleOrdersTable({ saleOrders }: Props) {
  return (
    <table className="hidden lg:table min-w-full text-sm">
      <thead>
        <tr className="text-left text-gray-700">
          <th className="py-2 px-4">Fecha</th>
          <th className="py-2 px-4">Orden N°</th>
          <th className="py-2 px-4">Cliente</th>
          <th className="py-2 px-4">Tipo</th>
          <th className="py-2 px-4">Estado</th>
          <th className="py-2 px-4">Pago</th>
          <th className="py-2 px-4">Total</th>
          <th className="py-2 px-4">Pagado</th>
          <th className="py-2 px-4">Canal</th>
          <th className="py-2 px-4">Acciones</th>
        </tr>
      </thead>
      <tbody className="divide-y">
        {saleOrders.map((order) => (
          <tr key={order.id}>
            <td className="py-2 px-4">
              {order.createdAt
                ? format(new Date(order.createdAt), "dd/MM/yyyy")
                : "-"}
            </td>
            <td className="py-2 px-4">{order.orderNumber}</td>
            <td className="py-2 px-4">
              {order.customer?.customerType === "PERSON"
                ? order.customer?.name ?? "-"
                : order.customer?.companyName ?? "-"}
            </td>
            <td className="py-2 px-4">{order.customer?.customerType ?? "-"}</td>
            <td className="py-2 px-4">
              {order.status ? (
                <span
                  className={`px-3 py-1 text-xs font-semibold rounded-full 
                  ${orderStatusConfig[order.status as OrderStatus]?.bgLight}
                  ${orderStatusConfig[order.status as OrderStatus]?.textColor}`}
                >
                  {orderStatusConfig[order.status as OrderStatus]?.label ||
                    order.status}
                </span>
              ) : (
                "-"
              )}
            </td>
            <td className="py-2 px-4">
              {order.paymentStatus ? (
                <span
                  className={`px-3 py-1 text-xs font-semibold rounded-full 
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
              ) : (
                "-"
              )}
            </td>
            <td className="py-2 px-4">{order.totalAmount ?? "-"}</td>
            <td className="py-2 px-4">{order.totalPaid ?? "-"}</td>
            <td className="py-2 px-4">{order.saleChannel ?? "-"}</td>
            <td className="py-2 px-4">
              <button
                onClick={() => downloadPDF(order)}
                className="px-4 py-1 bg-blue-500 text-white rounded text-sm"
              >
                PDF
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
