import { toast } from "react-hot-toast";
import { updateBook } from "@/api/modules/books";
import { BookDTO } from "@/types/BookDTO";
import { InfoRow } from "./InfoRow";
import {
  Package, Tag, BookOpen, FileText, User, PiggyBank,
} from "lucide-react";
import { useState } from "react";

interface Props {
  book: BookDTO;
}

const BookGeneralInfo = ({ book }: Props) => {
  const [editableBook, setEditableBook] = useState(book);

  // TODO: Reemplazar esto con validación real de usuario admin
  const isAdmin = true;

  const handleFieldUpdate = (field: keyof BookDTO, value: string) => {
    // Actualización local inmediata
    setEditableBook((prev) => ({ ...prev, [field]: value }));
    
    // Enviar datos al backend
    toast.promise(
    updateBook(book.id, { [field]: value }),
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
        value={editableBook.sku}
        icon={<Tag className="w-4 h-4" />}
        editable={isAdmin}
        onSave={(val) => handleFieldUpdate("sku", val)}
      />
      <InfoRow
        label="Título"
        value={editableBook.title}
        icon={<BookOpen className="w-4 h-4" />}
        editable={isAdmin}
        onSave={(val) => handleFieldUpdate("title", val)}
      />
      <InfoRow
        label="ISBN"
        value={editableBook.isbn ?? "N/A"}
        icon={<FileText className="w-4 h-4" />}
        editable={isAdmin}
        onSave={(val) => handleFieldUpdate("isbn", val)}
      />
      <InfoRow
        label="Autor"
        value={editableBook.author ?? "N/A"}
        icon={<User className="w-4 h-4" />}
        editable={isAdmin}
        onSave={(val) => handleFieldUpdate("author", val)}
      />
      <InfoRow
        label="Editorial"
        value={editableBook.publisher ?? "N/A"}
        icon={<FileText className="w-4 h-4" />}
        editable={isAdmin}
        onSave={(val) => handleFieldUpdate("publisher", val)}
      />
      <InfoRow
        label="Categoría"
        value={editableBook.category ?? "N/A"}
        icon={<Tag className="w-4 h-4" />}
        editable={isAdmin}
        onSave={(val) => handleFieldUpdate("category", val)}
      />
      <InfoRow
        label="Tema"
        value={editableBook.subjects ?? "N/A"}
        icon={<Tag className="w-4 h-4" />}
        editable={isAdmin}
        onSave={(val) => handleFieldUpdate("subjects", val)}
      />
      <InfoRow
        label="Formato"
        value={editableBook.format ?? "N/A"}
        icon={<FileText className="w-4 h-4" />}
        editable={isAdmin}
        onSave={(val) => handleFieldUpdate("format", val)}
      />
      <InfoRow
        label="Idioma"
        value={editableBook.language ?? "N/A"}
        icon={<FileText className="w-4 h-4" />}
        editable={isAdmin}
        onSave={(val) => handleFieldUpdate("language", val)}
      />
      <InfoRow
        label="Precio de venta"
        value={`S/. ${editableBook.sellingPrice.toFixed(2)}`}
        icon={<PiggyBank className="w-4 h-4" />}
        editable={isAdmin}
        onSave={(val) => {
          const price = parseFloat(val.replace(",", "."));
          if (!isNaN(price)) {
            handleFieldUpdate("sellingPrice", price.toFixed(2));
          }
        }}
      />
    </div>
  );
};

export default BookGeneralInfo;
