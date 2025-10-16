import { create } from "zustand";

export interface SupplierStore {
  currentPage: number;
  itemsPerPage: number;
  sortBy: string;
  sortDirection: "asc" | "desc";
  filters: Record<string, string>; // filtros dinámicos: "search", "country", etc.
  setCurrentPage: (page: number) => void;
  setItemsPerPage: (size: number) => void;
  setSort: (sortBy: string, direction?: "asc" | "desc") => void;
  setFilter: (key: string, value: string) => void;
  resetFilters: () => void;
}

export const useSupplierStore = create<SupplierStore>((set) => ({
  currentPage: 1,
  itemsPerPage: 12,
  sortBy: "name", // campo común para ordenar proveedores
  sortDirection: "asc",
  filters: {},
  setCurrentPage: (page) => set({ currentPage: page }),
  setItemsPerPage: (size) => set({ itemsPerPage: size }),
  setSort: (sortBy, sortDirection = "asc") => set({ sortBy, sortDirection }),
  setFilter: (key, value) =>
    set((state) => ({
      filters: { ...state.filters, [key]: value },
      currentPage: 1, // reinicia la página al cambiar filtro
    })),
  resetFilters: () =>
    set({
      filters: {},
      currentPage: 1,
      sortBy: "name",
      sortDirection: "asc",
    }),
}));
