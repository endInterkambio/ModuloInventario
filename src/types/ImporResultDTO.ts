export interface ImportResultDTO {
  success: boolean;
  message: string;           // Mensaje general, por ejemplo: "Se importaron 5 libros, 2 fallaron"
  importedBooks?: BookDTO[]; // Libros que sí se guardaron
  errors?: string[];         // Errores o advertencias por libro
}
