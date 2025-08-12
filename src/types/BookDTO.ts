import { SimpleIdNameDTO } from "./SimpleIdNameDTO";

export interface BookStockLocationDTO {
  id: number;
  bookSku: string;
  warehouse: SimpleIdNameDTO;
  bookcase: number;
  bookcaseFloor: number;
  stock: number;
  bookCondition: string;
  locationType: string;
}

export interface BookDTO {
  id: number;
  sku: string;
  title: string;
  isbn: string;
  author: string;
  publisher: string;
  description: string;
  category: string;
  subjects: string;
  format: string;
  language: string;
  imageUrl: string;
  websiteUrl: string;
  coverPrice: number;
  purchasePrice: number;
  sellingPrice: number;
  fairPrice: number;
  tag: string;
  filter: string;
  productSaleType: string;
  totalStock: number;
  locations: BookStockLocationDTO[];
  createdAt: string;
  updatedAt: string;
  createdBy: SimpleIdNameDTO | null;
  updatedBy?: SimpleIdNameDTO | null;
}
