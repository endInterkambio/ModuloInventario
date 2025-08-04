import { BookDTO } from "@/types/BookDTO";
import { InfoRow } from "./InfoRow";
import { Package, Tag, BookOpen, FileText, User, PiggyBank } from "lucide-react";

interface Props {
  book: BookDTO;
}

const BookGeneralInfo = ({ book }: Props) => (
  <div className="space-y-1">
    <InfoRow label="Tipo de artículo" value="Artículo de inventario" icon={<Package className="w-4 h-4" />} />
    <InfoRow label="SKU/Código de artículo" value={book.sku} icon={<Tag className="w-4 h-4" />} />
    <InfoRow label="Título" value={book.title} icon={<BookOpen className="w-4 h-4" />} />
    <InfoRow label="ISBN" value={book.isbn ?? "N/A"} icon={<FileText className="w-4 h-4" />} />
    <InfoRow label="Autor" value={book.author ?? "N/A"} icon={<User className="w-4 h-4" />} />
    <InfoRow label="Editorial" value={book.publisher ?? "N/A"} icon={<FileText className="w-4 h-4" />} />
    <InfoRow label="Categoría" value={book.category ?? "N/A"} icon={<Tag className="w-4 h-4" />} />
    <InfoRow label="Tema" value={book.subjects ?? "N/A"} icon={<Tag className="w-4 h-4" />} />
    <InfoRow label="Formato" value={book.format ?? "N/A"} icon={<FileText className="w-4 h-4" />} />
    <InfoRow label="Idioma" value={book.language ?? "N/A"} icon={<FileText className="w-4 h-4" />} />
    <InfoRow label="Precio de venta" value={`S/. ${book.sellingPrice.toFixed(2)}`} icon={<PiggyBank className="w-4 h-4" />} />
  </div>
);

export default BookGeneralInfo;
