import {
  User,
  Tag,
  XCircle,
} from "lucide-react";
import DOMPurify from "dompurify";
import placeholder from "@assets/no-image.jpg";
import { BookDTO } from "@/types/BookDTO";
import { deleteBook } from "@/api/modules/books";
import { useBookStore } from "@/stores/useBookStore";
import toast from "react-hot-toast";
import { useState } from "react";

type Props = { book: BookDTO };

const BookHeader = ({ book }: Props) => {
  // 🔹 DELETE
  const [loading, setLoading] = useState(false);

  const removeBookLocally = useBookStore((state) => state.removeBookLocally);

  const handleDelete = async (id: number) => {
    if (!confirm("¿Estás seguro de eliminar este libro?")) return;

    try {
      await deleteBook(id);
      removeBookLocally(id);
      toast.success("Libro eliminado");
    } catch (error) {
      console.error(error);
      toast.error("Error al eliminar el libro");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-start gap-4">
        <img
          src={book.imageUrl || placeholder}
          alt={book.title}
          className="b-24 h-32 object-cover rounded-md border border-gray-200"
          onError={(e) => (e.currentTarget.src = placeholder)}
        />
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            {book.title}
          </h2>
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
            <span className="flex items-center gap-1">
              <User className="b-4 h-4" />
              {book.author}
            </span>
            <span className="flex items-center gap-1">
              <Tag className="b-4 h-4" />
              {book.categories}
            </span>
          </div>
          <p
            className="text-sm text-gray-700"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(book.description || "Sin descripción"),
            }}
          />
        </div>
        <button
          onClick={() => handleDelete(book.id)}
          disabled={loading}
          className="p-2 text-red-800 hover:text-red-600 disabled:opacity-50"
        >
          <XCircle size={36} />
        </button>
      </div>
    </div>
  );
};

export default BookHeader;
