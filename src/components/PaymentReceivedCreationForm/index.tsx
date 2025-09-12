import { usePaymentForm } from "./hooks/usePaymentForm";
import { PaymentFormActions } from "./sections/PaymentFormActions";
import { PaymentFormFields } from "./sections/PaymentFormFields";

export const PaymentReceivedCreationForm = () => {
  const { form, updateField } = usePaymentForm();

  const handleSubmit = () => {
    console.log("Nuevo pago creado:", form);
    // Aquí podrías hacer un fetch/axios a tu backend
  };

  const handleCancel = () => {
    console.log("Cancelado");
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-xl font-semibold mb-6">Registrar Pago</h1>
      <PaymentFormFields form={form} updateField={updateField} />
      <PaymentFormActions onSubmit={handleSubmit} onCancel={handleCancel} />
    </div>
  );
};
