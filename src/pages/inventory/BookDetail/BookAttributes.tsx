import { useEffect } from "react";
import { toast } from "react-hot-toast";
// import { updateBook } from "@/api/modules/books";
import { InfoRow } from "./InfoRow";
import { BookDTO } from "@/types/BookDTO";
import { useBookStore } from "@/stores/useBookStore";

interface Props {
  book: BookDTO;
}

const BookAttributes = ({ book }: Props) => {
  const { editedBook, setEditedBook } = useBookStore();

  useEffect(() => {
    setEditedBook(book);
  }, [book, setEditedBook]);

  // Simulación: puedes reemplazar esto con lógica real de permisos
  const isAdmin = true;

  /*const handleFieldUpdate = async (
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
  };*/

  return (
    <div className="space-y-1">
      {Array.isArray(editedBook.locations) &&
      editedBook.locations.length > 0 ? (
        editedBook.locations.map((location) => (
          <div key={location.id}>
            <InfoRow
              label="Condición"
              value={location.bookCondition ?? "Sin condición"}
              editable={isAdmin}
            />
            <InfoRow
              label="Estante"
              value={location.bookcase ?? 0}
              editable={isAdmin}
            />
            <InfoRow
              label="Piso"
              value={location.bookcaseFloor ?? 0}
              editable={isAdmin}
              onSave={(val) => {
                const num = parseInt(val);
                if (isNaN(num) || num < 0 || num > 99) {
                  toast.error("El piso debe ser un número entre 0 y 99");
                  return;
                }
                //handleFieldUpdate("bookcaseFloor", num);
              }}
            />
            <InfoRow
              label="Almacén"
              value={location.warehouse?.name ?? "Sin almacén"}
              editable={false}
            />
            <InfoRow
              label="URL"
              value={editedBook.websiteUrl ?? "URL no disponible"}
              editable={isAdmin}
            />
            <InfoRow
              label="URL de la imagen"
              value={editedBook.imageUrl ?? "Sin imagen asignada"}
              editable={isAdmin}
            />
            <InfoRow
              label="Etiqueta"
              value={editedBook.tag ?? "Sin etiqueta"}
              editable={isAdmin}
            />
            <InfoRow
              label="Filtro"
              value={editedBook.filter ?? "Sin filtro"}
              editable={isAdmin}
            />
            <InfoRow
              label="Tipo de producto"
              value={editedBook.productSaleType ?? "N/A"}
              editable={isAdmin}
            />
          </div>
        ))
      ) : (
        <p>No hay ubicaciones registradas</p>
      )}
    </div>
  );
};

export default BookAttributes;
