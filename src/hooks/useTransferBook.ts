import { useState } from "react";
import toast from "react-hot-toast";
import { useCreateInventoryTransaction } from "@/hooks/useCreateInventoryTransaction";
import { useCreateBookLocation } from "@/hooks/useCreateBookLocation";
import { useBookStore } from "@/stores/useBookStore";
import { BookDTO } from "@/types/BookDTO";
import { BookStockLocationDTO } from "@/types/BookStockLocationDTO";
import { AxiosError } from "axios";

interface UseTransferBookParams {
  book: BookDTO;
  fromLocationId: number | undefined;
}

export const useTransferBook = ({
  book,
  fromLocationId,
}: UseTransferBookParams) => {
  const { createTransaction, isMutating } = useCreateInventoryTransaction();
  const { createLocation, isCreatingLocation } = useCreateBookLocation();

  const [toLocationId, setToLocationId] = useState<number | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  // Si el libro no tiene ubicaciones, mostrar automáticamente el formulario de creación
  const [showCreateLocation, setShowCreateLocation] = useState(
    book.locations.length === 0
  );

  const [newLocation, setNewLocation] = useState<Partial<BookStockLocationDTO>>(
    {
      warehouse: undefined,
      locationType: "MAIN_STORAGE",
      bookcase: undefined,
      bookcaseFloor: undefined,
      bookCondition: "U",
      stock: 0,
    }
  );

  const BOOKCASE_MIN = 1;
  const BOOKCASE_MAX = 20;
  const FLOOR_MIN = 1;
  const FLOOR_MAX = 5;

  const handleTransfer = async (onClose: () => void) => {
    if (!toLocationId || quantity <= 0)
      return toast.error("Debe indicar destino y cantidad válida");

    const fromLocation = book.locations.find(
      (loc) => loc.id === fromLocationId
    );
    const destination = book.locations.find((loc) => loc.id === toLocationId);

    if (!fromLocation || !destination) return toast.error("Ubicación inválida");
    if (quantity > fromLocation.stock)
      return toast.error(
        `No se puede transferir más de ${fromLocation.stock} unidades`
      );
    if (
      destination.locationType === "SHOWROOM" &&
      !["U", "X"].includes(fromLocation.bookCondition) &&
      destination.bookCondition !== fromLocation.bookCondition
    )
      return toast.error(
        "No se puede mover a Showroom: la condición del libro debe coincidir"
      );

    try {
      await createTransaction({
        transactionDate: new Date().toISOString(),
        bookSku: book.sku,
        fromLocationId,
        toLocationId,
        transactionType: "TRANSFER",
        quantity,
        reason: "Traslado interno",
        createdAt: new Date().toISOString(),
      });
      onClose(); // 🔹 cerrar modal al finalizar
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateLocation = async (onClose: () => void) => {
    try {
      // Validar solo si el libro tiene ubicaciones existentes
      if (book.locations.length > 0) {
        const fromLocation = book.locations.find(
          (loc) => loc.id === fromLocationId
        );
        if (!fromLocation) return toast.error("Ubicación origen inválida");
        // Ajustar bookCondition si no se especificó
        newLocation.bookCondition =
          newLocation.bookCondition || fromLocation.bookCondition;
      }

      if (
        !newLocation.bookcase ||
        newLocation.bookcase < BOOKCASE_MIN ||
        newLocation.bookcase > BOOKCASE_MAX
      )
        return toast.error(
          `El estante debe estar entre ${BOOKCASE_MIN} y ${BOOKCASE_MAX}`
        );
      if (
        !newLocation.bookcaseFloor ||
        newLocation.bookcaseFloor < FLOOR_MIN ||
        newLocation.bookcaseFloor > FLOOR_MAX
      )
        return toast.error(
          `El piso debe estar entre ${FLOOR_MIN} y ${FLOOR_MAX}`
        );
      if (!newLocation.warehouse)
        return toast.error("Debe seleccionar un almacén");

      const locationToCreate: Partial<BookStockLocationDTO> = {
        ...newLocation,
        bookId: book.id,
        bookSku: book.sku,
        stock: 0,
      };

      const created = await createLocation(locationToCreate);
      if (!created) return toast.error("No se pudo crear la ubicación");

      const createdWithTimestamp: BookStockLocationDTO = {
        ...created,
        lastUpdatedAt:
          created.lastUpdatedAt ||
          new Date().toLocaleString("es-PE", {
            timeZone: "UTC",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }),
        warehouse: {
          id: created.warehouse?.id ?? newLocation.warehouse.id,
          name: created.warehouse?.name ?? newLocation.warehouse.name,
        },
      };

      useBookStore.getState().addBookLocation(book.id, createdWithTimestamp);
      setToLocationId(created.id);
      setShowCreateLocation(false);
      toast.success("Ubicación creada con éxito");
      onClose();
    } catch (err: unknown) {
      let message = "Error al crear ubicación";

      if (err instanceof AxiosError) {
        // Show error by backend response
        message = err.response?.data?.message ?? err.message;
      } else if (err instanceof Error) {
        // Error by default
        message = err.message;
      }
      toast.error(message);
    }
  };

  return {
    toLocationId,
    setToLocationId,
    quantity,
    setQuantity,
    showCreateLocation,
    setShowCreateLocation,
    newLocation,
    setNewLocation,
    handleTransfer,
    handleCreateLocation,
    isMutating,
    isCreatingLocation,
    BOOKCASE_MIN,
    BOOKCASE_MAX,
    FLOOR_MIN,
    FLOOR_MAX,
  };
};
