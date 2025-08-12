import axiosInstance from '@/api/axiosInstance';
import { BookStockLocationDTO } from '@/types/BookDTO';
import { endpoints } from '../endpoints';

// Update location by ID (Partial update)
export const updateLocation = async (
  bookId: number,
  locationId: number,
  data: Partial<BookStockLocationDTO>
): Promise<BookStockLocationDTO> => {
  const response = await axiosInstance.patch(
    `${endpoints.books}/${bookId}/locations/${locationId}`,
    data
  );
  return response.data;
};
