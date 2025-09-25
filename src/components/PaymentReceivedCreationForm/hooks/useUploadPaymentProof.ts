import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance";

interface UploadPaymentProofParams {
  file: File;
  paymentId: number;
  orderId: number; // nuevo
}

export const useUploadPaymentProof = () => {
  return useMutation<string, Error, UploadPaymentProofParams>({
    mutationFn: async ({ file, paymentId, orderId }) => {
      if (!paymentId || !orderId) {
        throw new Error("paymentId y orderId son requeridos para subir el comprobante");
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append("paymentId", paymentId.toString());
      formData.append("orderId", orderId.toString()); // enviar orderId

      const response = await axiosInstance.post(
        "/upload/payment-proof",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      return response.data;
    },
  });
};
