import { BookStockLocationDTO } from "./BookStockLocationDTO";
import { SimpleIdNameDTO } from "./SimpleIdNameDTO";

export interface BookDTO {
  id: number;
  sku: string;
  title: string;
  isbn: string;
  author: string;
  publisher: string;
  description: string;
  categories: string[];
  subjects: string;
  formats: string[];
  language: string;
  imageUrl: string;
  websiteUrl: string;
  coverPrice: number;
  purchasePrice: number;
  sellingPrice: number;
  fairPrice: number;
  offerPrice: number;
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
