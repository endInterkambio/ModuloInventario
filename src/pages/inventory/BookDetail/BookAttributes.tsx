import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { updateBook } from "@/api/modules/books";
import { InfoRow } from "./InfoRow";
import { BookDTO } from "@/types/BookDTO";
import { useBookStore } from "@/stores/useBookStore";

interface Props {
  book: BookDTO;
}

const BookAttributes = ({ book }: Props) => {
  const { editedBook, setEditedBook, updateBookLocally } = useBookStore();

  useEffect(() => {
    setEditedBook(book);
  }, [book, setEditedBook]);

  // Simulación: puedes reemplazar esto con lógica real de permisos
  const isAdmin = true;

  const handleFieldUpdate = async (
    field: keyof BookDTO,
    value: string | number
  ) => {
    let parsedValue: string | number = value;

    // Si el campo requiere un número, lo convertimos y validamos
    if (field === "bookcaseFloor" || field === "bookcase") {
      const intValue = parseInt(value as string, 10);

      if (isNaN(intValue) || intValue < 0 || intValue > 25) {
        toast.error("Debe ser un número entre 0 y 25");
        return;
      }

      parsedValue = intValue;
    }

    setEditedBook({ [field]: parsedValue });

    toast.promise(
      updateBook(book.id, { [field]: parsedValue }).then((updatedBook) => {
        updateBookLocally(updatedBook);
      }),
      {
        loading: "Guardando...",
        success: "Cambios guardados",
        error: "Error al guardar cambios",
      }
    );
  };

  return (
    <div className="space-y-1">
      <InfoRow
        label="Condición"
        value={editedBook.bookCondition ?? "Sin condición"}
        editable={isAdmin}
        onSave={(val) => handleFieldUpdate("bookCondition", val)}
      />
      <InfoRow
        label="Estante"
        value={editedBook.bookcase ?? 0}
        editable={isAdmin}
        onSave={(val) => handleFieldUpdate("bookcase", val)}
      />
      <InfoRow
        label="Piso"
        value={editedBook.bookcaseFloor ?? 0}
        editable={isAdmin}
        onSave={(val) => {
          const num = parseInt(val);
          if (isNaN(num) || num < 0 || num > 99) {
            toast.error("El piso debe ser un número entre 0 y 99");
            return;
          }
          handleFieldUpdate("bookcaseFloor", num);
        }}
      />

      <InfoRow
        label="Almacén"
        value={editedBook.warehouse?.name ?? "Sin almacén"}
        // Si vas a permitir edición de almacén como texto:
        editable={false} // o true si lo permites
      />
      <InfoRow
        label="URL"
        value={editedBook.websiteUrl ?? "URL no disponible"}
        editable={isAdmin}
        onSave={(val) => handleFieldUpdate("websiteUrl", val)}
      />
      <InfoRow
        label="URL de la imagen"
        value={editedBook.imageUrl ?? "Sin imagen asignada"}
        editable={isAdmin}
        onSave={(val) => handleFieldUpdate("imageUrl", val)}
      />
      <InfoRow
        label="Etiqueta"
        value={editedBook.tag ?? "Sin etiqueta"}
        editable={isAdmin}
        onSave={(val) => handleFieldUpdate("tag", val)}
      />
      <InfoRow
        label="Filtro"
        value={editedBook.filter ?? "Sin filtro"}
        editable={isAdmin}
        onSave={(val) => handleFieldUpdate("filter", val)}
      />
      <InfoRow
        label="Tipo de producto"
        value={editedBook.productSaleType ?? "N/A"}
        editable={isAdmin}
        onSave={(val) => handleFieldUpdate("productSaleType", val)}
      />
    </div>
  );
};

export default BookAttributes;
