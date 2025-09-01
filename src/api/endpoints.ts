export const endpoints = {
  books: "/books",
  getBookBySku: (sku: string) => `/books/sku/${sku}`,
  uploadBooks: "/books/upload",
  users: "/users",
  roles: "/roles",
  warehouses: "/warehouses",
  locations: "/book-stock-locations",
  customers: "/customers",
  inventoryTransactions: "/inventory-transactions",
  uploadImage: "/upload/image",
  exportBooks: "books/export"
  // Se agregarán más cuando estén todas las entidad construidas y asignada a la API
};
