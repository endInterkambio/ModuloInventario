import { create } from "zustand";

export interface CustomerStore {
  currentPage: number;
  itemsPerPage: number;
  sortBy: string;
  sortDirection: "asc" | "desc";
  filters: Record<string, string>; // filtros dinámicos, incluye "search"
  setCurrentPage: (page: number) => void;
  setItemsPerPage: (size: number) => void;
  setSort: (sortBy: string, direction?: "asc" | "desc") => void;
  setFilter: (key: string, value: string) => void;
  resetFilters: () => void;
}

export const useCustomerStore = create<CustomerStore>((set) => ({
  currentPage: 1,
  itemsPerPage: 12,
  sortBy: "name",
  sortDirection: "asc",
  filters: {},
  setCurrentPage: (page) => set({ currentPage: page }),
  setItemsPerPage: (size) => set({ itemsPerPage: size }),
  setSort: (sortBy, sortDirection = "asc") => set({ sortBy, sortDirection }),
  setFilter: (key, value) =>
    set((state) => ({
      filters: { ...state.filters, [key]: value },
      currentPage: 1, // reset página al cambiar filtro
    })),
  resetFilters: () =>
    set({ filters: {}, currentPage: 1, sortBy: "name", sortDirection: "asc" }),
}));
