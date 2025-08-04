import { User, Tag, MoreVertical } from "lucide-react";
import DOMPurify from "dompurify";
import placeholder from "@assets/no-image.jpg";
import { BookDTO } from "@/types/BookDTO";

type Props = { book: BookDTO };

const BookHeader = ({ book }: Props) => (
  <div className="bg-white rounded-lg border border-gray-200 p-6">
    <div className="flex items-start gap-4">
      <img
        src={book.imageUrl || placeholder}
        alt={book.title}
        className="w-24 h-32 object-cover rounded-md border border-gray-200"
        onError={(e) => (e.currentTarget.src = placeholder)}
      />
      <div className="flex-1">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          {book.title}
        </h2>
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
          <span className="flex items-center gap-1">
            <User className="w-4 h-4" />
            {book.author}
          </span>
          <span className="flex items-center gap-1">
            <Tag className="w-4 h-4" />
            {book.category}
          </span>
        </div>
        <p
          className="text-sm text-gray-700"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(book.description || "Sin descripción"),
          }}
        />
        <div className="flex items-center gap-2 mt-2">
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Disponible
          </span>
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {book.format}
          </span>
        </div>
      </div>
      <button className="p-2 text-gray-400 hover:text-gray-600">
        <MoreVertical className="w-5 h-5" />
      </button>
    </div>
  </div>
);

export default BookHeader;
