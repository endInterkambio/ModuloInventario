import { BookDTO } from "@/types/BookDTO";
import { BookStockLocationDTO } from "@/types/BookStockLocationDTO";

export type TransferModalProps = {
  isOpen: boolean;
  onClose: () => void;
  fromLocationId: number;
  book: BookDTO;
};

export type CreateLocationFormProps = {
  newLocation: Partial<BookStockLocationDTO>;
  setNewLocation: (loc: Partial<BookStockLocationDTO>) => void;
  handleCreateLocation: () => void;
  isCreatingLocation: boolean;
  BOOKCASE_MIN: number;
  BOOKCASE_MAX: number;
  FLOOR_MIN: number;
  FLOOR_MAX: number;
};
