import { BookDTO } from "@/types/BookDTO";
import { InfoRow } from "./InfoRow";
import { format } from "date-fns";

type Props = {
  book: BookDTO;
};

function formatDate(dateString?: string): string {
  if (!dateString) return "N/A";
  return format(new Date(dateString), "dd/MM/yyyy");
}

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
        value={formatDate(book.createdAt) ?? "N/A"}
      />
      <InfoRow
        className={className}
        label="Actualizado por"
        value={book.updatedBy?.name ?? "N/A"}
      />
      <InfoRow
        className={className}
        label="Fecha de última actualización"
        value={formatDate(book.updatedAt) ?? "N/A"}
      />
    </div>
  );
};

export default BookHistory;
