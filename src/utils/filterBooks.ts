import type { SingleValue } from "react-select";
import { BookDTO } from "@/types/BookDTO";

export function filterBooks({
  data,
  sortOrder,
  selectedPrice,
  selectedStock,
  selectedShelf,
  selectedFloor,
  searchTerm,
}: {
  data: BookDTO[];
  sortOrder: string;
  selectedPrice: SingleValue<{ value: string; label: string }>;
  selectedStock: SingleValue<{ value: string; label: string }>;
  selectedShelf: SingleValue<{ value: number; label: string }>;
  selectedFloor: SingleValue<{ value: number; label: string }>;
  searchTerm?: string;
}): BookDTO[] {
  let filtered = [...data];

  // 🔍 Búsqueda por título o autor
  if (searchTerm && searchTerm.trim() !== "") {
    const lowerSearch = searchTerm.toLowerCase();
    const isNumeric = /^\d+$/.test(searchTerm); 

    filtered = filtered.filter(
      (book) => {
        const matchesText =
        book.title?.toLowerCase().includes(lowerSearch) ||
        book.author?.toLowerCase().includes(lowerSearch);

        const matchesNumber = isNumeric && (book.isbn?.toString().includes(searchTerm))

        return matchesText || matchesNumber;
      }
    );
  }

  // Filtro por precio
  if (selectedPrice) {
    const [min, max] = selectedPrice.value.includes("+")
      ? [parseInt(selectedPrice.value), Infinity]
      : selectedPrice.value.split("-").map(Number);
    filtered = filtered.filter(
      (book) => book.sellingPrice >= min && book.sellingPrice <= max
    );
  }

  // Filtro por stock
  if (selectedStock) {
    const value = selectedStock.value;
    if (value === "0") {
      filtered = filtered.filter((book) => book.stock === 0);
    } else {
      const [min, max] = selectedStock.value.includes("+")
        ? [parseInt(selectedStock.value), Infinity]
        : selectedStock.value.split("-").map(Number);
      filtered = filtered.filter(
        (book) => book.stock >= min && book.stock <= max
      );
    }
  }

  // Filtro por estante
  if (selectedShelf) {
    filtered = filtered.filter((book) => book.bookcase === selectedShelf.value);
  }

  // Filtro por piso
  if (selectedFloor) {
    filtered = filtered.filter(
      (book) => book.bookcaseFloor === selectedFloor.value
    );
  }

  // Orden alfabético
  if (sortOrder === "A-Z") {
    filtered.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
  } else if (sortOrder === "Z-A") {
    filtered.sort((a, b) => (b.title || "").localeCompare(a.title || ""));
  }

  return filtered;
}