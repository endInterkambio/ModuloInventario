import { PAYMENT_METHODS, PaymentMethod } from "../constants/paymentMethods";
import { PaymentFormState } from "../hooks/usePaymentForm";

interface PaymentFormFieldsProps {
  form: {
    saleOrderId: number;
    paymentDate: string;
    paymentMethod: string;
    amount: number;
    referenceNumber: string;
  };
  updateField: <K extends keyof PaymentFormState>(
    key: K,
    value: PaymentFormState[K]
  ) => void;
}

export function PaymentFormFields({
  form,
  updateField,
}: PaymentFormFieldsProps) {
  const handlePaymentMethodChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    updateField("paymentMethod", e.target.value as PaymentMethod);
  };

  return (
    <div className="grid gap-4">
      {/* Sale Order ID */}
      <div>
        <label className="block text-sm font-medium mb-1">ID Orden</label>
        <input
          type="number"
          value={form.saleOrderId}
          onChange={(e) => updateField("saleOrderId", Number(e.target.value))}
          className="w-full rounded-lg border border-gray-300 p-2"
        />
      </div>

      {/* Fecha */}
      <div>
        <label className="block text-sm font-medium mb-1">Fecha de pago</label>
        <input
          type="date"
          value={form.paymentDate}
          onChange={(e) => updateField("paymentDate", e.target.value)}
          className="w-full rounded-lg border border-gray-300 p-2"
        />
      </div>

      {/* Método de pago */}
      <div>
        <label className="block text-sm font-medium mb-1">Método de pago</label>
        <select
          value={form.paymentMethod}
          onChange={handlePaymentMethodChange}
          className="w-full rounded-lg border border-gray-300 p-2"
        >
          {PAYMENT_METHODS.map((method) => (
            <option key={method.value} value={method.value}>
              {method.label}
            </option>
          ))}
        </select>
      </div>

      {/* Monto */}
      <div>
        <label className="block text-sm font-medium mb-1">Monto</label>
        <input
          type="number"
          value={form.amount}
          onChange={(e) => updateField("amount", Number(e.target.value))}
          className="w-full rounded-lg border border-gray-300 p-2"
        />
      </div>

      {/* Número de referencia */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Número de referencia
        </label>
        <input
          type="text"
          value={form.referenceNumber}
          onChange={(e) => updateField("referenceNumber", e.target.value)}
          className="w-full rounded-lg border border-gray-300 p-2"
        />
      </div>
    </div>
  );
}
