import { useState } from "react";
import { useCreateInventoryTransaction } from "@/hooks/useCreateInventoryTransaction";
import toast from "react-hot-toast";
import { BookDTO } from "@/types/BookDTO";

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
  const [reason, setReason] = useState<string>("Traslado interno");

  const userId = 1; // ⚡ tomar del auth store real

  const { createTransaction, isMutating } = useCreateInventoryTransaction();

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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg w-96 shadow">
        <h2 className="text-lg font-semibold mb-4">Transferir libro</h2>

        <label className="block mb-2 text-sm">Ubicación destino (ID)</label>
        <select
          className="border w-full p-2 mb-4 rounded"
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
          placeholder="Motivo de la transferencia"
          onChange={(e) => setReason(e.target.value)}
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
