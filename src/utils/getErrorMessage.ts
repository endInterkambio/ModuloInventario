import { ApiErrorResponse } from "@/api/types/ApiErrorResponse";
import axios from "axios";

export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    // Si el backend envía un objeto de error con mensaje
    return error.response?.data?.message || "Error en la petición";
  }
  if (error instanceof Error) {
    // Errores nativos de JS
    return error.message;
  }
  return "Error inesperado";
}
