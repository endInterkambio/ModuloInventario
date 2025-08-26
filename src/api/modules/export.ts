import axiosInstance from "../axiosInstance";
import { endpoints } from "../endpoints";

export const exportBooks = async (): Promise<Blob> => {
  const response = await axiosInstance.get(endpoints.exportBooks, {
    responseType: "blob", // para recibir el archivo
  });
  return response.data;
};
