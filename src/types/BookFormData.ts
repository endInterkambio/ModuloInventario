import { BookDTO } from "./BookDTO";
import { BookStockLocationDTO } from "./BookStockLocationDTO";

// Derivamos del DTO original, pero sin campos que no editamos
export type BookFormData = Omit<
  BookDTO,
  "id" | "createdAt" | "updatedAt" | "createdBy" | "updatedBy"
> & {
  locations: BookStockLocationDTO[]; // aseguramos que es un array bien tipado
};
