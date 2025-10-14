import axiosInstance from "../axiosInstance";
import { endpoints } from "../endpoints";

type ExportMode = "all" | "best-stock";

export const exportBooks = async (mode: ExportMode = "all"): Promise<Blob> => {
  const endpoint =
    mode === "best-stock"
      ? endpoints.exportBooks + "?mode=best-stock"
      : endpoints.exportBooks + "?mode=all";
      console.log("Exporting books with mode:", mode, "using endpoint:", endpoint);

  const response = await axiosInstance.get(endpoint, {
    responseType: "blob", // para recibir el archivo
  });
  return response.data;
};
