import axiosInstance from '@/api/axiosInstance'
import { endpoints } from "../endpoints";
import { BookDTO } from "@/types/BookDTO";
import { Page } from '@/types/Pagination';

export const fetchBooks = async (): Promise<Page<BookDTO>> => {
  const response = await axiosInstance.get<Page<BookDTO>>(endpoints.books);
  return response.data;
};

export const uploadBooks = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axiosInstance.post(endpoints.uploadBooks, formData);
  return response.data;
};

