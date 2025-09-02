import { toast } from "react-hot-toast";
import { BookDTO } from "@/types/BookDTO";
import { InfoRow } from "./InfoRow";
import { Package, Tag, BookOpen, FileText, User } from "lucide-react";
import { useEffect } from "react";
import { useBookStore } from "@/stores/useBookStore";
import { useUpdateBook } from "@/hooks/useUpdateBooks";
import { useAuthStore } from "@/stores/useAuthStore";

interface Props {
  book: BookDTO;
}

const BookGeneralInfo = ({ book }: Props) => {
  const { editedBook, setEditedBook } = useBookStore();
  const updateBookMutation = useUpdateBook();

  useEffect(() => {
    setEditedBook(book);
  }, [book, setEditedBook]);

  const userRole = useAuthStore((state) => state.user?.role?.name);
  const isAdmin = userRole === "ADMIN";
  //const isAdmin = true;

  const handleFieldUpdate = (field: keyof BookDTO, value: string | number) => {
    let normalizedValue: string | number | string[] = value;

    // Normalizamos formatos y categorías a array
    if (field === "formats" || field === "categories") {
      if (typeof value === "string") {
        normalizedValue = value
          .split(",")
          .map((v) => v.trim())
          .filter((v) => v.length > 0);
      }
    }

    const patch = { [field]: normalizedValue } as Partial<BookDTO>;

    toast.promise(
      updateBookMutation.mutateAsync({ id: book.id, data: patch }),
      {
        loading: "Guardando...",
        success: "Cambios guardados",
        error: "Error al guardar cambios",
      }
    );
  };

  const className =
    "flex items-center justify-between py-2 border-b border-gray-100 group";
  const inputClassName =
    "border-b border-gray-300 focus:outline-none focus:border-blue-500 bg-transparent text-right text-sm px-2 py-1";

  return (
    <div className="space-y-1">
      <InfoRow
        className={className}
        label="Tipo de artículo"
        value="Artículo de inventario"
        icon={<Package className="w-4 h-4" />}
      />
      <InfoRow
        className={className}
        label="SKU/Código de artículo"
        value={book.sku}
        icon={<Tag className="w-4 h-4" />}
      />
      <InfoRow
        className={className}
        label="Título"
        value={editedBook.title}
        icon={<BookOpen className="w-4 h-4" />}
        editable={isAdmin}
        onSave={(val) => handleFieldUpdate("title", val)}
      />
      <InfoRow
        className={className}
        label="ISBN"
        value={editedBook.isbn ?? "N/A"}
        icon={<FileText className="w-4 h-4" />}
        editable={isAdmin}
        onSave={(val) => handleFieldUpdate("isbn", val)}
      />
      <InfoRow
        className={className}
        label="Autor"
        value={editedBook.author ?? "N/A"}
        icon={<User className="w-4 h-4" />}
        editable={isAdmin}
        onSave={(val) => handleFieldUpdate("author", val)}
      />
      <InfoRow
        className={className}
        label="Editorial"
        value={editedBook.publisher ?? "N/A"}
        icon={<FileText className="w-4 h-4" />}
        editable={isAdmin}
        onSave={(val) => handleFieldUpdate("publisher", val)}
      />
      <InfoRow
        className={className}
        label="Categoría"
        value={editedBook.categories ?? "N/A"}
        icon={<Tag className="w-4 h-4" />}
        editable={isAdmin}
        onSave={(val) => handleFieldUpdate("categories", val)}
      />
      <InfoRow
        className={className}
        label="Tema"
        value={editedBook.subjects ?? "N/A"}
        icon={<Tag className="w-4 h-4" />}
        editable={isAdmin}
        onSave={(val) => handleFieldUpdate("subjects", val)}
      />
      <InfoRow
        className={className}
        label="Formato"
        value={editedBook.formats ?? "N/A"}
        icon={<FileText className="w-4 h-4" />}
        editable={isAdmin}
        onSave={(val) => handleFieldUpdate("formats", val)}
      />
      <InfoRow
        className={className}
        label="Idioma"
        value={editedBook.language ?? "N/A"}
        icon={<FileText className="w-4 h-4" />}
        editable={isAdmin}
        onSave={(val) => handleFieldUpdate("language", val)}
      />
      <InfoRow
        className={className}
        label="URL"
        value={editedBook.websiteUrl ?? "URL no disponible"}
        editable={isAdmin}
        onSave={(val) => handleFieldUpdate("websiteUrl", val)}
      />
      <InfoRow
        className={className}
        label="URL de la imagen"
        value={editedBook.imageUrl ?? "Sin imagen asignada"}
        editable={isAdmin}
        onSave={(val) => handleFieldUpdate("imageUrl", val)}
      />
      <InfoRow
        className={className}
        label="Etiqueta"
        value={editedBook.tag ?? "Sin etiqueta"}
        editable={isAdmin}
        onSave={(val) => handleFieldUpdate("tag", val)}
      />
      <InfoRow
        className={className}
        label="Filtro"
        value={editedBook.filter ?? "Sin filtro"}
        editable={isAdmin}
        onSave={(val) => handleFieldUpdate("filter", val)}
      />
      <InfoRow
        className={className}
        label="Tipo de producto"
        value={editedBook.productSaleType ?? "N/A"}
        editable={isAdmin}
        onSave={(val) => handleFieldUpdate("productSaleType", val)}
      />
      <InfoRow
        className={className}
        inputClassName={inputClassName}
        label="Precio de venta"
        value={`${editedBook.sellingPrice?.toFixed(2) ?? 0.0}`}
        icon={<span className="text-sm font-medium text-gray-500">S/.</span>}
        editable={isAdmin}
        onSave={(val) => {
          const price = parseFloat(val.replace(",", "."));
          if (!isNaN(price)) {
            handleFieldUpdate("sellingPrice", price);
          }
        }}
      />
    </div>
  );
};

export default BookGeneralInfo;
