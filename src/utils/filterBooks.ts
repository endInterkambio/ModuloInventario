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

  function normalize(text: string): string {
    return text
      .toLowerCase()
      .replace(/[\W_]+/g, " ") // reemplaza cualquier símbolo raro (&, |, -, etc.) con espacio
      .replace(/\s+/g, " ") // colapsa múltiples espacios
      .trim();
  }

  function matchesMultiValueField(
    field: string | undefined,
    search: string
  ): boolean {
    if (!field) return false;
    return normalize(field).includes(normalize(search));
  }

  // 🔍 Filtro de búsqueda
  if (searchTerm && searchTerm.trim() !== "") {
  const normalizedSearch = normalize(searchTerm);
  const isNumeric = /^\d+$/.test(searchTerm);

  filtered = filtered.filter((book) => {
    const matchesText =
      normalize(book.title ?? "").includes(normalizedSearch) ||
      normalize(book.sku ?? "").includes(normalizedSearch) ||
      normalize(book.author ?? "").includes(normalizedSearch) ||
      normalize(book.publisher ?? "").includes(normalizedSearch) ||
      normalize(book.format ?? "").includes(normalizedSearch) ||
      normalize(book.category ?? "").includes(normalizedSearch) ||
      normalize(book.subjects ?? "").includes(normalizedSearch) ||
      matchesMultiValueField(book.filter, searchTerm) ||
      matchesMultiValueField(book.tag, searchTerm);

    const matchesNumber =
      isNumeric && book.isbn?.toString().includes(searchTerm);

    return matchesText || matchesNumber;
  });
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

  // Orden por Stock
  if (sortOrder === "STOCK_ASC") {
    filtered.sort((a, b) => (a.stock ?? 0) - (b.stock ?? 0));
  } else if (sortOrder === "STOCK_DESC") {
    filtered.sort((a, b) => (b.stock ?? 0) - (a.stock ?? 0));
  }

  // Orden por SKU
  if (sortOrder === "SKU_ASC") {
    filtered.sort((a, b) => (a.sku || "").localeCompare(b.sku || ""));
  } else if (sortOrder === "SKU_DESC") {
    filtered.sort((a, b) => (b.sku || "").localeCompare(a.sku || ""));
  }

  // Orden por ISBN
  if (sortOrder === "ISBN_ASC") {
    filtered.sort((a, b) => (a.isbn || "").localeCompare(b.isbn || ""));
  } else if (sortOrder === "ISBN_DESC") {
    filtered.sort((a, b) => (b.isbn || "").localeCompare(a.isbn || ""));
  }

  return filtered;
}
