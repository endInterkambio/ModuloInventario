import { useShipmentMethods } from "@/hooks/useShipmentMethod";
import type { ShipmentFormState } from "../types/ShipmentFormState";

interface Props {
  form: ShipmentFormState;
  updateField: <K extends keyof ShipmentFormState>(
    key: K,
    value: ShipmentFormState[K]
  ) => void;
}

export function ShipmentFormFields({ form, updateField }: Props) {
  const { data: shipmentMethods, isLoading } = useShipmentMethods();

  return (
    <div className="grid gap-4">
      {/* Número de Orden */}
      <div>
        <label className="block text-sm font-medium mb-1">N° de Orden</label>
        <input
          type="text"
          value={form.orderNumber}
          disabled
          className="w-full rounded-lg border border-gray-300 p-2 bg-gray-100 text-gray-600"
        />
      </div>

      {/* Fecha */}
      <div>
        <label className="block text-sm font-medium mb-1">Fecha de envío</label>
        <input
          type="date"
          value={form.shipmentDate}
          onChange={(e) => updateField("shipmentDate", e.target.value)}
          className="w-full rounded-lg border border-gray-300 p-2"
        />
      </div>

      {/* Tracking */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Número de Tracking
        </label>
        <input
          type="text"
          value={form.trackingNumber}
          onChange={(e) => updateField("trackingNumber", e.target.value)}
          className="w-full rounded-lg border border-gray-300 p-2"
        />
      </div>

      {/* Dirección */}
      <div>
        <label className="block text-sm font-medium mb-1">Dirección</label>
        <textarea
          value={form.address}
          onChange={(e) => updateField("address", e.target.value)}
          className="w-full rounded-lg border border-gray-300 p-2"
          rows={3}
        />
      </div>

      {/* Costo */}
      <div>
        <label className="block text-sm font-medium mb-1">Costo de envío</label>
        <input
          type="number"
          value={form.shippingFee}
          onChange={(e) => updateField("shippingFee", Number(e.target.value))}
          className="w-full rounded-lg border border-gray-300 p-2"
        />
      </div>

      {/* Método */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Método de envío
        </label>
        <select
          value={form.shipmentMethod?.id ?? ""}
          onChange={(e) =>
            updateField(
              "shipmentMethod",
              e.target.value
                ? shipmentMethods?.find((m) => m.id === Number(e.target.value))
                : undefined
            )
          }
          className="w-full rounded-lg border border-gray-300 p-2"
          disabled={isLoading}
        >
          <option value="">Seleccione un método</option>
          {shipmentMethods?.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
