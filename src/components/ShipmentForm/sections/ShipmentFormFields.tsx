import { useShipmentMethods } from "@/hooks/useShipmentMethod";
import type { ShipmentFormState } from "../types/ShipmentFormState";

interface Props {
  form: ShipmentFormState;
  updateField: <K extends keyof ShipmentFormState>(
    key: K,
    value: ShipmentFormState[K]
  ) => void;
}

export function ShipmentFormFields({
  form,
  updateField,
}: Props) {
  const { data: shipmentMethods, isLoading } = useShipmentMethods();

  return (
    <div className="grid gap-4">
      {/* Número de Orden */}
      <div>
        <label className="block text-sm font-medium mb-1">N° de Orden</label>
        <input
          type="text"
          value={form.order?.name || ""}
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
          required
          onChange={(e) => updateField("trackingNumber", e.target.value)}
          className="w-full rounded-lg border border-gray-300 p-2"
        />
      </div>

      {/* Dirección */}
      <div>
        <label className="block text-base font-medium mb-4 ">Dirección</label>

        {/* Línea de dirección */}
        <div>
          <label className="block text-sm font-medium mt-2 mb-1">
            Avenida / Calle + N° + Dpto / Interior / Mz
          </label>
          <input
            type="text"
            value={form.addressLine || ""}
            required
            placeholder="Avenida Siempre Viva 123 Dpto 456"
            className="w-full rounded-lg border border-gray-300 p-2"
            onChange={(e) => updateField("addressLine", e.target.value)}
          ></input>
        </div>

        {/* Departamento */}
        <div>
          <label className="block text-sm font-medium mt-2 mb-1">
            Departamento
          </label>
          <input
            type="text"
            value={form.department || ""}
            required
            placeholder="Lima"
            className="w-full rounded-lg border border-gray-300 p-2"
            onChange={(e) => updateField("department", e.target.value)}
          ></input>
        </div>

        {/* Provincia */}
        <div>
          <label className="block text-sm font-medium mt-2 mb-1">
            Provincia
          </label>
          <input
            type="text"
            value={form.province || ""}
            required
            placeholder="Lima metropolitana"
            className="w-full rounded-lg border border-gray-300 p-2"
            onChange={(e) => updateField("province", e.target.value)}
          ></input>
        </div>

        {/* Distrito */}
        <div>
          <label className="block text-sm font-medium mt-2 mb-1">
            Distrito
          </label>
          <input
            type="text"
            value={form.district || ""}
            required
            placeholder="ATE - Salamanca"
            className="w-full rounded-lg border border-gray-300 p-2"
            onChange={(e) => updateField("district", e.target.value)}
          ></input>
        </div>

        {/* Código Postal */}
        <div>
          <label className="block text-sm font-medium mt-2 mb-1">
            Código postal
          </label>
          <input
            type="text"
            value={form.postalCode || ""}
            placeholder="15023"
            className="w-full rounded-lg border border-gray-300 p-2"
            onChange={(e) => updateField("postalCode", e.target.value)}
          ></input>
        </div>
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
          required
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
