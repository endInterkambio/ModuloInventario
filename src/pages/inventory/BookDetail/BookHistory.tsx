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


const BookHistory = ({ book }: Props) => {
  return (
    <div className="space-y-1">
      <InfoRow label="Creado por" value={book.createdBy?.toString() ?? "N/A"} />
      <InfoRow label="Fecha de creación" value={formatDate(book.createdAt) ?? "N/A"} />
      <InfoRow
        label="Actualizado por"
        value={book.updatedBy?.toString() ?? "N/A"}
      />
      <InfoRow label="Fecha de última actualización" value={formatDate(book.updatedAt) ?? "N/A"} />
    </div>
  );
};

export default BookHistory;
