export interface ApiErrorResponse {
  message: string;               // Mensaje principal del backend
  status?: number;                // Código HTTP opcional
  errors?: Record<string, string[]>; // Errores de validación por campo
}
