import { useState } from "react";
import type { ShipmentFormState } from "../types/ShipmentFormState";
import { SimpleIdNameDTO } from "@/types/SimpleIdNameDTO";

export function useShipmentForm(
  initial: { order: SimpleIdNameDTO } & Partial<
    Omit<ShipmentFormState, "order">
  >
) {
  const [form, setForm] = useState<ShipmentFormState>({
    order: initial.order, // ✅ ya no puede ser undefined
    shipmentDate: initial.shipmentDate ?? new Date().toISOString().slice(0, 10),
    trackingNumber: initial.trackingNumber ?? "",
    addressLine: initial.addressLine ?? "",
    department: initial.department ?? "",
    province: initial.province ?? "",
    district: initial.district ?? "",
    postalCode: initial.postalCode ?? "",
    shippingFee: initial.shippingFee ?? 0,
    shipmentMethod: initial.shipmentMethod,
  });

  const updateField = <K extends keyof ShipmentFormState>(
    key: K,
    value: ShipmentFormState[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const getPayloadForBackend = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {
      addressLine,
      department,
      province,
      district,
      postalCode,
      ...payload
    } = form;

    const addressParts = [
      addressLine,
      department,
      province,
      district,
      postalCode,
    ].filter(Boolean);

    const now = new Date();
    const timePart = now.toTimeString().slice(0, 8); // HH:MM:SS

    return {
      ...payload,
      address: addressParts.join(", "),
      shipmentDate: `${payload.shipmentDate}T${timePart}`,
    };
  };

  const resetForm = () => {
    setForm((prev) => ({
      ...prev,
      shipmentDate: new Date().toISOString().slice(0, 10),
      trackingNumber: "",
      addressLine: "",
      department: "",
      province: "",
      district: "",
      postalCode: "",
      shippingFee: 0,
      shipmentMethod: undefined,
      order: prev.order,
    }));
  };

  return { form, updateField, getPayloadForBackend, resetForm };
}
