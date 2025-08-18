import axiosInstance from '@/api/axiosInstance';
import { BookStockLocationDTO } from '@/types/BookDTO';
import { endpoints } from '../endpoints';

// Crear nueva ubicación con stock inicial = 0
export const createBookStockLocation = async (
  data: Partial<BookStockLocationDTO>
): Promise<BookStockLocationDTO> => {
  const response = await axiosInstance.post<BookStockLocationDTO>(
    endpoints.locations,
    data
  );
  return response.data;
};

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
