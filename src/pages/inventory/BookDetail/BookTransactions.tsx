import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { InfoRow } from "./InfoRow";
import { BookDTO } from "@/types/BookDTO";
import { updateBook } from "@/api/modules/books";
import { useBookStore } from "@/stores/useBookStore";
import { DollarSign } from "lucide-react";

interface Props {
  book: BookDTO;
}

const BookTransactions = ({ book }: Props) => {
  const { editedBook, setEditedBook, updateBookLocally } = useBookStore();

  useEffect(() => {
    setEditedBook(book);
  }, [book, setEditedBook]);

  const isAdmin = true;

  const handleFieldUpdate = async (
    field: keyof BookDTO,
    value: string | number
  ) => {
    let parsedValue: number;

    // Parse and validate as float with 2 decimal digits
    parsedValue = parseFloat(value as string);
    if (isNaN(parsedValue) || parsedValue < 0) {
      toast.error("Debe ser un número válido mayor o igual a 0");
      return;
    }

    // Opcional: redondear a dos decimales
    parsedValue = parseFloat(parsedValue.toFixed(2));

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

  const className =
    "flex items-center justify-between py-2 border-b border-gray-100 group";

  return (
    <div className="space-y-1">
      <InfoRow
        className={className}
        label="Precio de compra"
        value={`${editedBook.purchasePrice?.toFixed(2) ?? 0.0}`}
        icon={<span className="text-sm font-medium text-gray-500">S/.</span>}
        editable={isAdmin}
        onSave={(val) => handleFieldUpdate("purchasePrice", val)}
      />
      <InfoRow
        className={className}
        label="Precio de venta"
        value={`${editedBook.sellingPrice?.toFixed(2) ?? 0.0}`}
        icon={<span className="text-sm font-medium text-gray-500">S/.</span>}
        editable={isAdmin}
        onSave={(val) => handleFieldUpdate("sellingPrice", val)}
      />
      <InfoRow
        className={className}
        label="Precio de feria"
        value={`${editedBook.fairPrice?.toFixed(2) ?? 0.0}`}
        icon={<span className="text-sm font-medium text-gray-500">S/.</span>}
        editable={isAdmin}
        onSave={(val) => handleFieldUpdate("fairPrice", val)}
      />
      <InfoRow
        className={className}
        label="Precio de portada"
        value={`${editedBook.coverPrice?.toFixed(2) ?? 0.0}`}
        icon={<DollarSign className="w-4 h-4" />}
        editable={isAdmin}
        onSave={(val) => handleFieldUpdate("coverPrice", val)}
      />
    </div>
  );
};

export default BookTransactions;
