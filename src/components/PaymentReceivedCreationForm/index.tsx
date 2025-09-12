import { useSearchParams } from "react-router-dom";
import { usePaymentForm } from "./hooks/usePaymentForm";
import { PaymentFormActions } from "./sections/PaymentFormActions";
import { PaymentFormFields } from "./sections/PaymentFormFields";
import { useCreatePaymentReceived } from "@/hooks/usePaymentReceived";
import toast from "react-hot-toast";
import { getErrorMessage } from "@/utils/getErrorMessage";

export const PaymentReceivedCreationForm = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");
  const saleOrderNumber = searchParams.get("saleOrderNumber");

  const { form, updateField, getPayloadForBackend } = usePaymentForm({
    saleOrderId: orderId ? Number(orderId) : undefined,
    saleOrderNumber: saleOrderNumber ?? "",
  });

  // Hook mutation
  const createPayment = useCreatePaymentReceived({
    onSuccess: (data) => {
      toast.success(`Pago creado correctamente: ${data.referenceNumber}`);
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();

    const payload = getPayloadForBackend();
    console.log("Payload enviado al backend:", payload);

    createPayment.mutate(payload);
  };

  const handleCancel = () => {
    toast.remove("Cancelado");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow-md"
    >
      <h1 className="text-xl font-semibold mb-6">Registrar Pago</h1>

      {/* Campos del formulario */}
      <PaymentFormFields form={form} updateField={updateField} />

      {/* Acciones */}
      <PaymentFormActions onSubmit={handleSubmit} onCancel={handleCancel} />
    </form>
  );
};
