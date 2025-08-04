import { BookDTO } from "@/types/BookDTO";
import { InfoRow } from "./InfoRow";
import { DollarSign, PiggyBank } from "lucide-react";

interface Props {
  book: BookDTO;
}

const BookTransactions = ({ book }: Props) => (
  <div className="space-y-1">
    <InfoRow
      label="Precio de compra"
      value={`S/. ${book.purchasePrice?.toFixed(2) ?? "0.00"}`}
      icon={<PiggyBank className="w-4 h-4" />}
    />
    <InfoRow
      label="Precio de venta"
      value={`S/. ${book.sellingPrice?.toFixed(2) ?? "0.00"}`}
      icon={<PiggyBank className="w-4 h-4" />}
    />
    <InfoRow
      label="Precio de portada"
      value={`$. ${book.coverPrice?.toFixed(2) ?? "0.00"}`}
      icon={<DollarSign className="w-4 h-4" />}
    />
  </div>
);

export default BookTransactions;
