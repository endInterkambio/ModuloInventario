import { useState } from "react";
import type { ShipmentFormState } from "../types/ShipmentFormState";

export function useShipmentForm(initial?: Partial<ShipmentFormState>) {
  const [form, setForm] = useState<ShipmentFormState>({
    orderId: initial?.orderId ?? 0,
    orderNumber: initial?.orderNumber ?? "",
    shipmentDate: initial?.shipmentDate ?? new Date().toISOString().slice(0, 10),
    trackingNumber: initial?.trackingNumber ?? "",
    address: initial?.address ?? "",
    shippingFee: initial?.shippingFee ?? 0,
    shipmentMethod: initial?.shipmentMethod,
  });

  const updateField = <K extends keyof ShipmentFormState>(
    key: K,
    value: ShipmentFormState[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const getPayloadForBackend = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { orderNumber: _ref, ...payload } = form;

    const now = new Date();
    const timePart = now.toTimeString().slice(0, 8); // HH:MM:SS

    return {
      ...payload,
      shipmentDate: `${payload.shipmentDate}T${timePart}`,
    };
  };

  const resetForm = () => {
    setForm((prev) => ({
      ...prev,
      shipmentDate: new Date().toISOString().slice(0, 10),
      trackingNumber: "",
      address: "",
      shippingFee: 0,
      shipmentMethod: undefined,
    }));
  };

  return { form, updateField, getPayloadForBackend, resetForm };
}
