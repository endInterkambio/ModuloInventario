import { toast } from "react-hot-toast";
import { updateBook } from "@/api/modules/books";
import { BookDTO } from "@/types/BookDTO";
import { InfoRow } from "./InfoRow";
import {
  Package, Tag, BookOpen, FileText, User,
} from "lucide-react";
import { useEffect } from "react";
import { useBookStore } from "@/stores/useBookStore";

interface Props {
  book: BookDTO;
}

const BookGeneralInfo = ({ book }: Props) => {
  const {
    editedBook,
    setEditedBook,
    updateBookLocally,
  } = useBookStore();

  console.log("editedBook", editedBook);

  useEffect(() => {
    setEditedBook(book);
  }, [book, setEditedBook]);

  // TODO: Reemplazar esto con validación real de usuario admin
  const isAdmin = true;

  const handleFieldUpdate = (field: keyof BookDTO, value: string | number) => {
    // Actualización local inmediata
    setEditedBook({ [field]: value });
    
    // Enviar cambios al backend
    const patch = { [field]: value };

    toast.promise(
      updateBook(book.id, patch).then((updatedBookFromServer) => {
        updateBookLocally(updatedBookFromServer); // Sync global book list si hace falta
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
      <InfoRow label="Tipo de artículo" value="Artículo de inventario" icon={<Package className="w-4 h-4" />} />
      <InfoRow
        label="SKU/Código de artículo"
        value={book.sku}
        icon={<Tag className="w-4 h-4" />}
      />
      <InfoRow
        label="Título"
        value={editedBook.title}
        icon={<BookOpen className="w-4 h-4" />}
        editable={isAdmin}
        onSave={(val) => handleFieldUpdate("title", val)}
      />
      <InfoRow
        label="ISBN"
        value={editedBook.isbn ?? "N/A"}
        icon={<FileText className="w-4 h-4" />}
        editable={isAdmin}
        onSave={(val) => handleFieldUpdate("isbn", val)}
      />
      <InfoRow
        label="Autor"
        value={editedBook.author ?? "N/A"}
        icon={<User className="w-4 h-4" />}
        editable={isAdmin}
        onSave={(val) => handleFieldUpdate("author", val)}
      />
      <InfoRow
        label="Editorial"
        value={editedBook.publisher ?? "N/A"}
        icon={<FileText className="w-4 h-4" />}
        editable={isAdmin}
        onSave={(val) => handleFieldUpdate("publisher", val)}
      />
      <InfoRow
        label="Categoría"
        value={editedBook.category ?? "N/A"}
        icon={<Tag className="w-4 h-4" />}
        editable={isAdmin}
        onSave={(val) => handleFieldUpdate("category", val)}
      />
      <InfoRow
        label="Tema"
        value={editedBook.subjects ?? "N/A"}
        icon={<Tag className="w-4 h-4" />}
        editable={isAdmin}
        onSave={(val) => handleFieldUpdate("subjects", val)}
      />
      <InfoRow
        label="Formato"
        value={editedBook.format ?? "N/A"}
        icon={<FileText className="w-4 h-4" />}
        editable={isAdmin}
        onSave={(val) => handleFieldUpdate("format", val)}
      />
      <InfoRow
        label="Idioma"
        value={editedBook.language ?? "N/A"}
        icon={<FileText className="w-4 h-4" />}
        editable={isAdmin}
        onSave={(val) => handleFieldUpdate("language", val)}
      />
      <InfoRow
        label="Precio de venta"
        value={`${editedBook.sellingPrice?.toFixed(2) ?? 0.00}`}
        icon={<span className="text-sm font-medium text-gray-500">S/.</span>}
        editable={isAdmin}
        onSave={(val) => {
          const price = parseFloat(val.replace(",", "."));
          if (!isNaN(price)) {
            handleFieldUpdate("sellingPrice", price)
          }
        }}
      />
    </div>
  );
};

export default BookGeneralInfo;
