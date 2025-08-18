import { useEffect, useState } from "react";
import { useCreateInventoryTransaction } from "@/hooks/useCreateInventoryTransaction";
import toast from "react-hot-toast";
import { BookDTO, BookStockLocationDTO } from "@/types/BookDTO";
import { useCreateBookLocation } from "@/hooks/useCreateBookLocation";
import { useBookStore } from "@/stores/useBookStore";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  fromLocationId: number;
  book: BookDTO;
}

export function TransferModal({
  isOpen,
  onClose,
  fromLocationId,
  book,
}: Props) {
  const [toLocationId, setToLocationId] = useState<number | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [reason] = useState<string>("Traslado interno");
  const [showCreateLocation, setShowCreateLocation] = useState(false);
  const [newLocation, setNewLocation] = useState<Partial<BookStockLocationDTO>>(
    {
      warehouse: { id: 5, name: "Pruebas" },
      locationType: "MAIN_STORAGE",
      bookcase: 0,
      bookcaseFloor: 0,
      bookCondition: "U", // condición por defecto "U"
      stock: 0,
    }
  );

  const userId = 10; // ⚡ tomar del auth store real

  const { createTransaction, isMutating } = useCreateInventoryTransaction();
  const { createLocation, isCreatingLocation } = useCreateBookLocation();

  // Ajusta locationType según warehouse seleccionado
  useEffect(() => {
    if (newLocation.warehouse?.name !== "Quechuas") {
      setNewLocation((prev) => ({ ...prev, locationType: "MAIN_STORAGE" }));
    }
  }, [newLocation.warehouse]);

  const handleSubmit = () => {
    if (!toLocationId || quantity <= 0) {
      toast.error("Debe indicar destino y cantidad válida");
      return;
    }

    const fromLocation = book.locations.find(
      (loc) => loc.id === fromLocationId
    );
    const destination = book.locations.find((loc) => loc.id === toLocationId);

    if (!fromLocation || !destination) {
      toast.error("Ubicación inválida");
      return;
    }

    // Validación stock
    if (quantity > fromLocation.stock) {
      toast.error(
        `No se puede transferir más de ${fromLocation.stock} unidades actuales en stock`
      );
      return;
    }

    // Validación Showroom + bookCondition
    if (
      destination.locationType === "SHOWROOM" &&
      destination.bookCondition !== fromLocation.bookCondition
    ) {
      toast.error(
        `No se puede mover a Showroom: la condición del libro debe coincidir con la del destino`
      );
      return;
    }

    // Transferencia válida
    createTransaction({
      transactionDate: new Date().toISOString(),
      bookSku: book.sku,
      fromLocationId,
      toLocationId,
      transactionType: "TRANSFER",
      quantity,
      reason,
      userId,
      createdAt: new Date().toISOString(),
    });

    onClose();
  };

  const handleCreateLocation = async () => {
    try {
      // Clonamos la ubicación nueva y asignamos la condición del libro desde la ubicación origen
      const fromLocation = book.locations.find(
        (loc) => loc.id === fromLocationId
      );
      if (!fromLocation) {
        toast.error("Ubicación origen inválida");
        return;
      }

      const locationToCreate = {
        ...newLocation,
        bookSku: book.sku,
        stock: 0,
        bookCondition: fromLocation.bookCondition, // heredamos la condición
      };

      const created = await createLocation(locationToCreate);

      if (!created) {
        toast.error("No se pudo crear la ubicación");
        return;
      }

      // Actualizar store inmediatamente
      useBookStore.setState((state) => ({
        books: state.books.map((b) =>
          b.sku === book.sku
            ? { ...b, locations: [...(b.locations || []), created] }
            : b
        ),
      }));

      setToLocationId(created.id);
      setShowCreateLocation(false);
      toast.success("Ubicación creada con éxito");
    } catch (err) {
      console.error(err);
      toast.error("Error al crear ubicación");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg w-96 shadow">
        <h2 className="text-lg font-semibold mb-4">Transferir libro</h2>

        <label className="block mb-2 text-sm">Ubicación destino</label>
        <select
          className="border w-full p-2 mb-2 rounded"
          value={toLocationId ?? ""}
          onChange={(e) => setToLocationId(Number(e.target.value))}
        >
          <option value="" disabled>
            Selecciona ubicación
          </option>
          {book.locations
            ?.filter((loc) => loc.id !== fromLocationId)
            .map((loc) => (
              <option key={loc.id} value={loc.id}>
                {loc.warehouse?.name} - {loc.locationType} - Estante{" "}
                {loc.bookcase} - Piso {loc.bookcaseFloor}
              </option>
            ))}
        </select>

        <button
          type="button"
          className="text-blue-600 text-sm mb-4"
          onClick={() => setShowCreateLocation(!showCreateLocation)}
          disabled={isCreatingLocation}
        >
          <button
            type="button"
            className="text-blue-600 text-sm mb-4"
            onClick={() => setShowCreateLocation(!showCreateLocation)}
            disabled={isCreatingLocation}
          >
            {showCreateLocation
              ? isCreatingLocation
                ? "Creando nueva ubicación..."
                : "Ingrese datos de nueva ubicación y pulse el botón Crear"
              : "No existe la ubicación? Crear nueva"}
          </button>
        </button>

        {showCreateLocation && (
          <div className="border p-2 mb-4 rounded bg-gray-50">
            <label className="block text-sm mb-1">Almacén</label>
            <input
              type="number"
              value={newLocation.warehouse?.id || ""}
              onChange={(e) =>
                setNewLocation((prev) => ({
                  ...prev,
                  warehouse: { id: Number(e.target.value), name: "" },
                }))
              }
              className="border w-full p-1 mb-2 rounded"
            />

            <label className="block text-sm mb-1">Estante</label>
            <input
              type="number"
              value={newLocation.bookcase || ""}
              onChange={(e) =>
                setNewLocation((prev) => ({
                  ...prev,
                  bookcase: Number(e.target.value),
                }))
              }
              className="border w-full p-1 mb-2 rounded"
            />

            <label className="block text-sm mb-1">Piso</label>
            <input
              type="number"
              value={newLocation.bookcaseFloor || ""}
              onChange={(e) =>
                setNewLocation((prev) => ({
                  ...prev,
                  bookcaseFloor: Number(e.target.value),
                }))
              }
              className="border w-full p-1 mb-2 rounded"
            />

            <label className="block text-sm mb-1">Tipo de ubicación</label>
            <select
              value={newLocation.locationType || "MAIN_STORAGE"}
              onChange={(e) =>
                setNewLocation((prev) => ({
                  ...prev,
                  locationType: e.target.value,
                }))
              }
              className="border w-full p-1 mb-2 rounded"
            >
              <option value="MAIN_STORAGE">MAIN_STORAGE</option>
              <option value="SHOWROOM">SHOWROOM</option>
            </select>

            <label className="block text-sm mb-1">Condición del libro</label>
            <select
              value={newLocation.bookCondition || "A"}
              onChange={(e) =>
                setNewLocation((prev) => ({
                  ...prev,
                  bookCondition: e.target.value,
                }))
              }
              className="border w-full p-1 mb-2 rounded"
            >
              <option value="A">U</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="C">D</option>
              <option value="C">X</option>
            </select>

            <button
              onClick={handleCreateLocation}
              className="px-3 py-1 rounded bg-green-600 text-white"
              disabled={isCreatingLocation}
            >
              {isCreatingLocation ? "Creando..." : "Crear ubicación"}
            </button>
          </div>
        )}

        <label className="block mb-2 text-sm">Cantidad</label>
        <input
          type="number"
          min={1}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="border w-full p-2 mb-4 rounded"
        />

        <label className="block mb-2 text-sm">Motivo</label>
        <input
          type="text"
          value={reason}
          disabled
          className="border w-full p-2 mb-4 rounded"
        />

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-3 py-1 rounded bg-gray-300">
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="px-3 py-1 rounded bg-blue-600 text-white flex items-center gap-2"
            disabled={isMutating}
          >
            {isMutating ? "Procesando..." : "Confirmar"}
          </button>
        </div>
      </div>
    </div>
  );
}
