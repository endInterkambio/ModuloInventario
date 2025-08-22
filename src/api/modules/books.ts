import axiosInstance from "@/api/axiosInstance";
import { endpoints } from "../endpoints";
import { BookDTO } from "@/types/BookDTO";
import { Page } from "@/types/Pagination";

export const fetchBooks = async (): Promise<Page<BookDTO>> => {
  const response = await axiosInstance.get<Page<BookDTO>>(endpoints.books);
  return response.data;
};

export const getBookBySku = async (sku: string): Promise<BookDTO | null> => {
  const { data } = await axiosInstance.get<BookDTO>(
    `${endpoints.getBookBySku(sku)}`
  );
  return data ?? null;
};

// Create new book
export const createBook = async (book: Omit<BookDTO, "id">): Promise<BookDTO> => {
  const response = await axiosInstance.post<BookDTO>(endpoints.books, book);
  return response.data;
};

export const uploadBooks = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axiosInstance.post(endpoints.uploadBooks, formData);
  return response.data;
};

// Delete book by ID
export const deleteBook = async (id: number): Promise<void> => {
  await axiosInstance.delete(`${endpoints.books}/${id}`);
};

// Update book by ID (Partial update)
export const updateBook = async (
  id: number,
  data: Partial<BookDTO>
): Promise<BookDTO> => {
  const response = await axiosInstance.patch(`${endpoints.books}/${id}`, data);
  return response.data;
};
