import { BookDTO } from "@/types/BookDTO";
import { InfoRow } from "./InfoRow";

type Props = {
  book: BookDTO;
};

const className =
  "flex items-center justify-between py-2 border-b border-gray-100 group";

const BookHistory = ({ book }: Props) => {
  return (
    <div className="space-y-1">
      <InfoRow
        className={className}
        label="Creado por"
        value={book.createdBy?.name ?? "N/A"}
      />
      <InfoRow
        className={className}
        label="Fecha de creación"
        value={
          book.createdAt
            ? new Date(book.createdAt).toLocaleString("es-PE", {
                timeZone: "UTC",
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              })
            : "-"
        }
      />
      <InfoRow
        className={className}
        label="Actualizado por"
        value={book.updatedBy?.name ?? "N/A"}
      />
      <InfoRow
        className={className}
        label="Fecha de última actualización"
        value={
          book.updatedAt
            ? new Date(book.updatedAt).toLocaleString("es-PE", {
                timeZone: "UTC",
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              })
            : "-"
        }
      />
    </div>
  );
};

export default BookHistory;
