// Import necessary dependencies and types
import { create } from "zustand";
import { type SingleValue } from "react-select";
import { filterBooks } from "@/utils/filterBooks";
import { BookDTO } from "@/types/BookDTO";

type StringOption = { value: string; label: string };
type NumberOption = { value: number; label: string };

// Interface defining the book store state and actions
interface BookStore {
  // Core data
  books: BookDTO[]; // All books in the system
  filteredBooks: BookDTO[]; // Books after applying filters
  currentPage: number; // Current pagination page
  itemsPerPage: number; // Number of items per page
  totalPages: number; // Total number of pages

  // Selectors
  getPaginatedBooks: () => BookDTO[]; // Get books for current page

  // Filter state
  searchTerm: string; // Search term for book titles
  sortOrder: string; // Sort order for books (e.g., 'asc', 'desc')
  selectedPrice: SingleValue<StringOption>; // Selected price filter
  selectedStock: SingleValue<StringOption>; // Selected stock filter
  selectedShelf: SingleValue<NumberOption>; // Selected shelf filter
  selectedFloor: SingleValue<NumberOption>; // Selected floor filter

  // Book selection state
  selectedBooks: BookDTO[]; // Currently selected books
  toggleBook: (book: BookDTO) => void; // Toggle selection of a single book
  selectAllBooks: () => void; // Select all books
  selectCurrentPageBooks: () => void; // Select all books on current page
  resetSelection: () => void; // Clear all book selections
  resetCurrentPageSelection: () => void; // Clear selections on current page

  // Filter setter methods
  setSearchTerm: (term: string) => void; // Set search term
  setSortOrder: (value: string) => void; // Set sort order
  setSelectedPrice: (value: SingleValue<StringOption>) => void; // Set price filter
  setSelectedStock: (value: SingleValue<StringOption>) => void; // Set stock filter
  setSelectedShelf: (value: SingleValue<NumberOption>) => void; // Set shelf filter
  setSelectedFloor: (value: SingleValue<NumberOption>) => void; // Set floor filter
  setItemsPerPage: (items: number) => void; // Set items per page
  setCurrentPage: (page: number) => void; // Set current page

  // Core actions
  applyFilters: () => void; // Apply all filters to books
  setBooks: (books: BookDTO[]) => void;
}

// Create the book store using Zustand
export const useBookStore = create<BookStore>((set, get) => ({
  books: [], // Initialize with all books from data source
  filteredBooks: [], // Initially show all books
  currentPage: 1, // Start on first page
  itemsPerPage: 12, // Default items per page
  totalPages: 1,

  // Selectors
  getPaginatedBooks: () => {
    const { filteredBooks, currentPage, itemsPerPage } = get();
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredBooks.slice(start, end);
  },

  // Filter state
  searchTerm: "", // Search term for book titles
  sortOrder: "", // Sort order for books (e.g., 'asc', 'desc')
  selectedPrice: null, // Selected price filter
  selectedStock: null, // Selected stock filter
  selectedShelf: null, // Selected shelf filter
  selectedFloor: null, // Selected floor filter

  // Book selection state
  selectedBooks: [], // Currently selected books
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
    const { filteredBooks, currentPage, selectedBooks } = get();
    const ITEMS_PER_PAGE = get().itemsPerPage;
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;

    const currentPageBooks = filteredBooks.slice(start, end);
    const remainingBooks = selectedBooks.filter(
      (book) => !currentPageBooks.some((b) => b.sku === book.sku)
    );

    set({ selectedBooks: remainingBooks });
  },
  selectAllBooks: () => set({ selectedBooks: get().filteredBooks }),
  selectCurrentPageBooks: () => {
    const { filteredBooks, currentPage, selectedBooks } = get();
    const ITEMS_PER_PAGE = get().itemsPerPage;

    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const currentPageBooks = filteredBooks.slice(start, end);

    // Evita duplicados usando el sku como identificador
    const newSelection = [
      ...selectedBooks,
      ...currentPageBooks.filter(
        (book) => !selectedBooks.some((b) => b.sku === book.sku)
      ),
    ];

    set({ selectedBooks: newSelection });
  },

  // Filter setter methods with reactive filter application
  setSearchTerm: (term) => {
    set({ searchTerm: term });
    get().applyFilters();
  },
  setSortOrder: (value) => {
    set({ sortOrder: value });
    get().applyFilters();
  },
  setSelectedPrice: (value) => {
    set({ selectedPrice: value });
    get().applyFilters();
  },
  setSelectedStock: (value) => {
    set({ selectedStock: value });
    get().applyFilters();
  },
  setSelectedShelf: (value) => {
    set({ selectedShelf: value });
    get().applyFilters();
  },
  setSelectedFloor: (value) => {
    set({ selectedFloor: value });
    get().applyFilters();
  },
 setItemsPerPage: (items) => {
  const { filteredBooks } = get();
  const total = Math.ceil(filteredBooks.length / items) || 1;
  set({
    itemsPerPage: items,
    currentPage: 1, // Reset page to begin when changed page
    totalPages: total,
  });
},

  setCurrentPage: (page) => {
    set({ currentPage: page });
  },

  setBooks: (books) => {
    set({
      books,
      filteredBooks: books,
      currentPage: 1,
      totalPages: Math.ceil(books.length / get().itemsPerPage) || 1,
    });
  },

  // Core functionality
  applyFilters: () => {
    const {
      books,
      searchTerm,
      sortOrder,
      selectedPrice,
      selectedStock,
      selectedShelf,
      selectedFloor,
    } = get();

    const filtered = filterBooks({
      data: books,
      sortOrder,
      selectedPrice,
      selectedStock,
      selectedShelf,
      selectedFloor,
      searchTerm,
    });

    // Update filtered books and reset to first page
    set({
      filteredBooks: filtered,
      currentPage: 1,
      totalPages: Math.ceil(filtered.length / get().itemsPerPage) || 1,
    });
  },
}));
