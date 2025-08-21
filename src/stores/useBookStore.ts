import { create } from "zustand";
import { BookDTO } from "@/types/BookDTO";
import { Page } from "@/types/Pagination";
import { BookStockLocationDTO } from "@/types/BookStockLocationDTO";

export interface BookFilters {
  categories?: string;
  minPrice?: string;
  maxPrice?: string;
}

interface BookStore {
  // Core data
  books: BookDTO[]; // Libros recibidos desde backend paginado
  currentPage: number; // Página actual
  itemsPerPage: number; // Items por página (opcional si backend maneja esto)
  totalPages: number; // Total de páginas
  totalElements: number;
  locations: BookStockLocationDTO[];
  filters: BookFilters;

  // Searching
  searchTerm: string;
  setSearchTerm: (term: string) => void;

  // Ordenamiento
  sortOrder: string;
  minStock?: number;
  maxStock?: number;
  setSortOrder: (order: string) => void;
  setMinStock: (value: number | undefined) => void;
  setMaxStock: (value: number | undefined) => void;

  // Filters
  setFilters: (filters: BookFilters) => void;
  clearFilters: () => void;

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
  updateBookLocationLocally: (
    bookId: number,
    locationId: number,
    updates: Partial<Omit<BookStockLocationDTO, "stock">>
  ) => void;
  removeBookLocally: (id: number) => void;
  addBookLocation: (bookId: number, location: BookStockLocationDTO) => void;
  updateLocation: (
    locationId: number,
    updates: Partial<Omit<BookStockLocationDTO, "stock">>
  ) => void;
}

export const useBookStore = create<BookStore>((set, get) => ({
  books: [],
  locations: [],
  editedBook: {},
  currentPage: 1,
  itemsPerPage: 12,
  totalPages: 1,
  totalElements: 0,
  searchTerm: "",
  sortOrder: "", // Sorting by title for default
  filters: {
    categories: "",
    minPrice: "",
    maxPrice: "",
  },
  setMinStock: (value) => set({ minStock: value }),
  setMaxStock: (value) => set({ maxStock: value }),
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

  removeBookLocally: (id: number) => {
    const { books, totalElements, totalPages, currentPage } = get();

    const newContent = books.filter((b) => b.id !== id);

    // Actualizamos directamente el estado con set()
    set({
      books: newContent,
      totalElements: totalElements - 1,
      totalPages, // opcional, si no cambia
      currentPage, // opcional, si no cambia
    });
  },

  updateBookLocationLocally: (bookId, locationId, updates) => {
    set((state) => ({
      books: state.books.map((book) =>
        book.id === bookId
          ? {
              ...book, // nueva referencia del libro
              locations: [
                ...(book.locations || []).map((loc) =>
                  loc.id === locationId ? { ...loc, ...updates } : loc
                ),
              ],
            }
          : book
      ),
    }));
  },

  addBookLocation: (bookId: number, location: BookStockLocationDTO) => {
    set((state) => ({
      books: state.books.map((book) =>
        book.id === bookId
          ? { ...book, locations: [...(book.locations || []), location] }
          : book
      ),
    }));
  },

  updateLocation: (locationId, updates) =>
    set((state) => ({
      locations: state.locations.map((loc) =>
        loc.id === locationId ? { ...loc, ...updates } : loc
      ),
    })),
  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),
  clearFilters: () =>
    set({
      filters: { categories: "", minPrice: "", maxPrice: "" },
    }),
}));
