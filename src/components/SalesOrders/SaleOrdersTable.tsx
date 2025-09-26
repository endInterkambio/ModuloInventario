import { format } from "date-fns";
import {
  orderStatusConfig,
  OrderStatus,
  orderPaymentStatusConfig,
  OrderPaymentStatus,
} from "@components/SalesOrderForm/constants/orderStatusConfig";
import { SaleOrderDTO } from "@/types/SaleOrderDTO";
import { downloadSaleOrder } from "@/utils/pdf/downloadSaleOrder";
import { downloadWayBill } from "@/utils/downloadWayBill";
import NavButton from "@components/NewButton";
import { useEffect, useRef, useState } from "react";

interface Props {
  saleOrders: SaleOrderDTO[];
}

export function SaleOrdersTable({ saleOrders }: Props) {
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleMenuToggle = (orderId: number) => {
    setOpenMenuId(openMenuId === orderId ? null : orderId);
  };

  // Cerrar menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    };

    if (openMenuId) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMenuId]);

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
          <th className="py-2 px-4"></th>
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
            <td className="py-2 px-4 relative">
              <button
                onClick={() => handleMenuToggle(order.id)}
                className="px-4 py-1 bg-secondary font-medium rounded-md text-sm w-20"
              >
                Acciones
              </button>
              {openMenuId === order.id && (
                <div
                  ref={menuRef}
                  className="absolute z-50 bg-white border rounded shadow-lg mt-2 left-0 min-w-[120px]"
                >
                  <ul className="flex flex-col">
                    {Boolean(
                      order.amountShipment && order.amountShipment > 0
                    ) && (
                      <li>
                        <button
                          onClick={() => {
                            downloadWayBill(order);
                            setOpenMenuId(null);
                          }}
                          className="w-full text-left px-4 py-2 hover:bg-primary hover:text-white"
                        >
                          Descargar Guía
                        </button>
                      </li>
                    )}
                    <li>
                      <button
                        onClick={() => {
                          downloadSaleOrder(order);
                          setOpenMenuId(null);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-secondary"
                      >
                        Descargar Orden
                      </button>
                    </li>
                    {order.paymentStatus !== "PAID" && (
                      <li>
                        <NavButton
                          to={`/dashboard/paymentReceived/newPaymentReceived?orderId=${order.id}`}
                          label="Realizar Pago"
                          className="w-full text-left px-4 py-2 hover:bg-blue-500 hover:text-white"
                          onClick={() => setOpenMenuId(null)}
                        />
                      </li>
                    )}
                    {Boolean(
                      order.amountShipment &&
                        order.amountShipment > 0 &&
                        order.status == "PENDING"
                    ) && (
                      <li>
                        <NavButton
                          to={`/dashboard/shipments/newShipment?orderId=${order.id}&orderNumber=${order.orderNumber}`}
                          label="Asignar Envío"
                          className="w-full text-left px-4 py-2 hover:bg-red-500 hover:text-white"
                          onClick={() => setOpenMenuId(null)}
                        />
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
