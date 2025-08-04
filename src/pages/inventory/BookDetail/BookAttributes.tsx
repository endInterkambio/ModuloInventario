import { BookDTO } from "@/types/BookDTO";
import { InfoRow } from "./InfoRow";

interface Props {
  book: BookDTO;
}

const BookAttributes = ({ book }: Props) => (
  <div className="space-y-1">
    <InfoRow label="Condición" value={book.bookCondition ?? "Sin condición"} />
    <InfoRow label="Estante" value={book.bookcase ?? "Sin estante"} />
    <InfoRow label="Piso" value={book.bookcaseFloor ?? "Sin piso"} />
    <InfoRow
      label="URL"
      value={
        book.websiteUrl ? (
          <a
            href={book.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {book.websiteUrl}
          </a>
        ) : (
          "URL no disponible"
        )
      }
    />

    <InfoRow
      label="URL de la imagen"
      value={
        book.imageUrl ? (
          <a
            href={book.imageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {book.imageUrl}
          </a>
        ) : (
          "Sin imagen asignada"
        )
      }
    />
  </div>
);

export default BookAttributes;
