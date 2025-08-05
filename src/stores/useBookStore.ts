import { create } from "zustand";
import { BookDTO } from "@/types/BookDTO";
import { Page } from "@/types/Pagination";

interface BookStore {
  // Core data
  books: BookDTO[]; // Libros recibidos desde backend paginado
  currentPage: number; // Página actual
  itemsPerPage: number; // Items por página (opcional si backend maneja esto)
  totalPages: number; // Total de páginas
  totalElements: number;

   // Ordenamiento
  sortOrder: string;
  setSortOrder: (order: string) => void;

  // Book selection state
  selectedBooks: BookDTO[];
  toggleBook: (book: BookDTO) => void;
  selectAllBooks: () => void;
  selectCurrentPageBooks: () => void;
  resetSelection: () => void;
  resetCurrentPageSelection: () => void;

  // Setters
  setItemsPerPage: (items: number) => void;
  setCurrentPage: (page: number) => void;
  setBooks: (booksPage: Page<BookDTO>) => void;
}

export const useBookStore = create<BookStore>((set, get) => ({
  books: [],
  currentPage: 1,
  itemsPerPage: 12,
  totalPages: 1,
  totalElements: 0,
  sortOrder: "stock,desc",
  setSortOrder: (order) => set({ sortOrder: order, currentPage: 1 }),

  selectedBooks: [],
  toggleBook: (book) => {
    const selectedBooks = get().selectedBooks;
    const exists = selectedBooks.find((b) => b.sku === book.sku);
    if (exists) {
      set({ selectedBooks: selectedBooks.filter((b) => b.sku !== book.sku) });
    } else {
      set({ selectedBooks: [...selectedBooks, book] });
    }
  },
  resetSelection: () => set({ selectedBooks: [] }),

  resetCurrentPageSelection: () => {
    const { books, selectedBooks } = get();
    const currentPageBooks = books;
    const remainingBooks = selectedBooks.filter(
      (book) => !currentPageBooks.some((b) => b.sku === book.sku)
    );
    set({ selectedBooks: remainingBooks });
  },

  selectAllBooks: () => set({ selectedBooks: get().books }),

  selectCurrentPageBooks: () => {
    const { books, selectedBooks } = get();
    const newSelection = [
      ...selectedBooks,
      ...books.filter((book) => !selectedBooks.some((b) => b.sku === book.sku)),
    ];
    set({ selectedBooks: newSelection });
  },

  setItemsPerPage: (items) => {
    set({ itemsPerPage: items, currentPage: 1 });
  },

  setCurrentPage: (page) => {
    set({ currentPage: page });
  },

  setBooks: (pageData: Page<BookDTO>) => {
    const { content, totalPages, totalElements } = pageData;
    set({
      books: content,
      totalPages,
      totalElements,
    });
  },
}));
