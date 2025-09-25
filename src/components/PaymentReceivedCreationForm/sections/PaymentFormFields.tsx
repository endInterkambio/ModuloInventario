import { SaleOrderDTO } from "@/types/SaleOrderDTO";
import { PAYMENT_METHODS, PaymentMethod } from "../constants/paymentMethods";
import { PaymentFormState } from "../hooks/usePaymentForm";
import { InfoTooltip } from "@components/CustomerForm/ui/InfoToolTip";
import { FileInput } from "@components/shared/FileInput";

interface PaymentFormFieldsProps {
  form: PaymentFormState;
  updateField: <K extends keyof PaymentFormState>(
    key: K,
    value: PaymentFormState[K]
  ) => void;
  saleOrder?: SaleOrderDTO;
  onFileSelected: (file: File | null) => void;
}

export function PaymentFormFields({
  form,
  saleOrder,
  updateField,
  onFileSelected,
}: PaymentFormFieldsProps) {
  const handlePaymentMethodChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    updateField("paymentMethod", e.target.value as PaymentMethod);
  };

  const remainingAmount =
    (saleOrder?.totalAmount ?? 0) - (saleOrder?.totalPaid ?? 0);

  return (
    <div className="grid gap-4">
      {/* Número de orden */}
      <div>
        <label className="block text-sm font-medium mb-1">N° de Orden</label>
        <input
          type="text"
          value={saleOrder?.orderNumber}
          disabled
          className="w-full rounded-lg border border-gray-300 p-2 bg-gray-100 text-gray-600"
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
      <div className="relative group">
        <div className="flex gap-1">
          <label className="text-sm font-medium mb-1 flex items-center">
            Monto
          </label>
          <InfoTooltip text={`Monto restante a pagar: ${remainingAmount.toFixed(2)}`} />
        </div>

        <input
          type="number"
          value={form.amount}
          min={1}
          onChange={(e) => updateField("amount", Number(e.target.value))}
          className="w-full rounded-lg border border-gray-300 p-2"
        />
      </div>

      {/* Número de referencia */}
      <div>
        <label className="block text-sm font-medium mb-1">Número de referencia</label>
        <input
          type="text"
          value={form.referenceNumber}
          onChange={(e) => updateField("referenceNumber", e.target.value)}
          className="w-full rounded-lg border border-gray-300 p-2"
        />
      </div>

      {/* File input */}
      <FileInput onFileSelected={onFileSelected} />
    </div>
  );
}
