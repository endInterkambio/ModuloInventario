import { create } from "zustand";

export interface PaymentReceivedStore {
  currentPage: number;
  itemsPerPage: number;
  sortBy: string;
  sortDirection: "asc" | "desc";
  filters: Record<string, string>; // filtros dinámicos, incluye "search", "method", etc.
  setCurrentPage: (page: number) => void;
  setItemsPerPage: (size: number) => void;
  setSort: (sortBy: string, direction?: "asc" | "desc") => void;
  setFilter: (key: string, value: string) => void;
  resetFilters: () => void;
}

export const usePaymentReceivedStore = create<PaymentReceivedStore>((set) => ({
  currentPage: 1,
  itemsPerPage: 12,
  sortBy: "paymentDate",
  sortDirection: "desc",
  filters: {},
  setCurrentPage: (page) => set({ currentPage: page }),
  setItemsPerPage: (size) => set({ itemsPerPage: size }),
  setSort: (sortBy, sortDirection = "desc") => set({ sortBy, sortDirection }),
  setFilter: (key, value) =>
    set((state) => ({
      filters: { ...state.filters, [key]: value },
      currentPage: 1, // reset página al cambiar filtro
    })),
  resetFilters: () =>
    set({
      filters: {},
      currentPage: 1,
      sortBy: "paymentDate",
      sortDirection: "desc",
    }),
}));