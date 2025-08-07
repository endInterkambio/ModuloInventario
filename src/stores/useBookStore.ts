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

  // Searching
  searchTerm: string;
  setSearchTerm: (term: string) => void;

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

  // Edited Books
  editedBook: Partial<BookDTO>;

  // Setters
  setItemsPerPage: (items: number) => void;
  setCurrentPage: (page: number) => void;
  setBooks: (booksPage: Page<BookDTO>) => void;
  setEditedBook: (updates: Partial<BookDTO>) => void;
  updateBookLocally: (updatedBook: BookDTO) => void;
}

export const useBookStore = create<BookStore>((set, get) => ({
  books: [],
  editedBook: {},
  currentPage: 1,
  itemsPerPage: 12,
  totalPages: 1,
  totalElements: 0,
  searchTerm: "",
  sortOrder: "stock,desc", // Sorting by stock for default
  setSortOrder: (order) => set({ sortOrder: order, currentPage: 1 }),
  setSearchTerm: (term) => set({ searchTerm: term, currentPage: 1 }),

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
  setEditedBook: (updates) =>
    set((state) => ({
      editedBook: {
        ...state.editedBook,
        ...updates,
      },
    })),
  updateBookLocally: (updatedBook: BookDTO) => {
    set((state) => ({
      books: state.books.map((book) =>
        book.id === updatedBook.id ? updatedBook : book
      ),
      editedBook: {},
    }));
  },
}));
