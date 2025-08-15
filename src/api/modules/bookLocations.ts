import axiosInstance from '@/api/axiosInstance';
import { BookStockLocationDTO } from '@/types/BookDTO';
import { endpoints } from '../endpoints';

// Actualización parcial de ubicación
export const updateLocationPartial = async (
  locationId: number,
  data: Partial<BookStockLocationDTO>
): Promise<BookStockLocationDTO> => {
  const response = await axiosInstance.patch(
    `${endpoints.locations}/${locationId}`,
    data
  );
  return response.data;
};

// Actualización total de ubicación
export const updateLocationFull = async (
  locationId: number,
  data: BookStockLocationDTO
): Promise<BookStockLocationDTO> => {
  const response = await axiosInstance.put(
    `${endpoints.locations}/${locationId}`,
    data
  );
  return response.data;
};
