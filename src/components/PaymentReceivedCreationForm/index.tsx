import { useSearchParams } from "react-router-dom";
import { usePaymentForm } from "./hooks/usePaymentForm";
import { PaymentFormActions } from "./sections/PaymentFormActions";
import { PaymentFormFields } from "./sections/PaymentFormFields";
import { useCreatePaymentReceived } from "@/hooks/usePaymentReceived";
import { useUploadPaymentProof } from "@/components/PaymentReceivedCreationForm/hooks/useUploadPaymentProof";
import toast from "react-hot-toast";
import { getErrorMessage } from "@/utils/getErrorMessage";
import BackButton from "@components/shared/BackButton";
import { useSaleOrder } from "@/hooks/useSaleOrders";
import { useState } from "react";

export const PaymentReceivedCreationForm = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");
  const saleOrderNumber = searchParams.get("saleOrderNumber");

  const { data: saleOrder } = useSaleOrder(
    orderId ? Number(orderId) : undefined
  );

  const { form, updateField, getPayloadForBackend, resetForm } = usePaymentForm({
    saleOrderId: orderId ? Number(orderId) : undefined,
    saleOrderNumber: saleOrderNumber ?? "",
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const createPayment = useCreatePaymentReceived();
  const { mutateAsync: uploadProof } = useUploadPaymentProof();

  const handleSubmit = async (e?: React.FormEvent) => {
  e?.preventDefault();
  try {
    // 1️⃣ Crear el pago parcial
    const payload = getPayloadForBackend();
    const payment = await createPayment.mutateAsync(payload);

    // 2️⃣ Subir comprobante si hay archivo
    if (selectedFile) {
      await uploadProof({ file: selectedFile, paymentId: payment.id, orderId: form.saleOrderId });
    }

    toast.success(`Pago creado correctamente: ${payment.referenceNumber}`);

    // 3️⃣ Limpiar el formulario y archivo temporal
    resetForm();
    setSelectedFile(null);

  } catch (err) {
    toast.error(getErrorMessage(err));
  }
};


  const handleCancel = () => {
    toast.remove("Cancelado");
  };

  return (
    <>
      <BackButton />
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow-md"
      >
        <h1 className="text-xl font-semibold mb-6">Registrar Pago</h1>

        <PaymentFormFields
          form={form}
          updateField={updateField}
          saleOrder={saleOrder}
          onFileSelected={setSelectedFile}
        />

        <PaymentFormActions onCancel={handleCancel} resetForm={resetForm} />
      </form>
    </>
  );
};
