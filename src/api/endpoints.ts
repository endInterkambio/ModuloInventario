export const endpoints = {
  books: "/books",
  customers: "/customers",
  customerContacts: "/customer-contacts",
  exportBooks: "books/export",
  getBookBySku: (sku: string) => `/books/sku/${sku}`,
  inventoryTransactions: "/inventory-transactions",
  locations: "/book-stock-locations",
  paymentReceived: "/payment-received",
  roles: "/roles",
  saleOrders: "/sale-orders",
  shipments: "/shipments",
  shipmentMethods: "/shipment-methods",
  uploadBooks: "/books/upload",
  uploadImage: "/upload/image",
  users: "/users",
  warehouses: "/warehouses",
  // Se agregarán más cuando estén todas las entidad construidas y asignada a la API
};
