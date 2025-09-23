import { useSearchParams } from "react-router-dom";
import { useShipmentForm } from "./hooks/useShipmentForm";
import { ShipmentFormFields } from "./sections/ShipmentFormFields";
import { ShipmentFormActions } from "./sections/ShipmentFormActions";
import { useCreateShipment } from "@/hooks/useShipments";
import toast from "react-hot-toast";
import { getErrorMessage } from "@/utils/getErrorMessage";
import BackButton from "@components/shared/BackButton";

export const ShipmentCreationForm = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");
  const orderNumber = searchParams.get("orderNumber");

  const { form, updateField, getPayloadForBackend, resetForm } =
    useShipmentForm({
      order: { id: Number(orderId!), name: orderNumber ?? "" },
    });

  const createShipment = useCreateShipment({
    onSuccess: (data) => {
      toast.success(`Envío creado correctamente: ${data.trackingNumber}`);
      resetForm();
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formElement = e.currentTarget;
    // Aquí validamos los required
    if (!formElement.checkValidity()) {
      formElement.reportValidity(); // muestra mensajes nativos
      return; // detenemos el submit
    }

    const payload = getPayloadForBackend();
    console.log("Payload enviado al backend:", payload);
    createShipment.mutate(payload);
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
        <h1 className="text-xl font-semibold mb-6">Registrar Envío</h1>

        {/* Campos */}
        <ShipmentFormFields form={form} updateField={updateField} />

        {/* Acciones */}
        <ShipmentFormActions onCancel={handleCancel} resetForm={resetForm} />
      </form>
    </>
  );
};
