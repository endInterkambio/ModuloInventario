import { endpoints } from "@/api/endpoints";
import axiosInstance from "../axiosInstance";

export const uploadImage = async (file: File, sku: string): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("sku", sku);

  const response = await axiosInstance.post(endpoints.uploadImage, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};
