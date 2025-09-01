import Select from "react-select";
import { TransferModalProps } from "./types";
import { useTransferBook } from "@/hooks/useTransferBook";
import { CreateLocationForm } from "./CreateLocationForm";

export function TransferModal({
  isOpen,
  onClose,
  fromLocationId,
  book,
  userId,
}: TransferModalProps) {
  const {
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
  } = useTransferBook({ book, fromLocationId, userId });

  if (!isOpen) return null;

  const locationOptions =
    book.locations
      ?.filter((loc) => loc.id !== fromLocationId)
      .map((loc) => ({
        value: loc.id,
        label: `${loc.warehouse?.name} - ${loc.locationType} - E.${loc.bookcase} - P.${loc.bookcaseFloor} - Stock(${loc.stock}) - Cond.${loc.bookCondition}`,
      })) || [];

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg w-full max-w-lg shadow">
        <h2 className="text-lg font-semibold mb-4">
          {showCreateLocation ? "Crear ubicación" : "Transferir libro"}
        </h2>

        {showCreateLocation ? (
          // Modo creación de ubicación: solo mostrar formulario
          <CreateLocationForm
            newLocation={newLocation}
            setNewLocation={setNewLocation}
            handleCreateLocation={() => handleCreateLocation(onClose)}
            isCreatingLocation={isCreatingLocation}
            BOOKCASE_MIN={BOOKCASE_MIN}
            BOOKCASE_MAX={BOOKCASE_MAX}
            FLOOR_MIN={FLOOR_MIN}
            FLOOR_MAX={FLOOR_MAX}
          />
        ) : (
          // Modo transferencia: mostrar select y demás campos
          <>
            <Select
              options={locationOptions}
              value={
                locationOptions.find((opt) => opt.value === toLocationId) ||
                null
              }
              onChange={(selected) =>
                setToLocationId(selected ? selected.value : null)
              }
              placeholder="Selecciona ubicación"
              isClearable
              className="mb-2"
            />

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
              value="Traslado interno"
              disabled
              className="border w-full p-2 mb-4 rounded"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={onClose}
                className="px-3 py-1 rounded bg-gray-300"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleTransfer(onClose)}
                disabled={isMutating}
                className="px-3 py-1 rounded bg-blue-600 text-white"
              >
                {isMutating ? "Procesando..." : "Confirmar"}
              </button>
            </div>
          </>
        )}

        {/* Botón para alternar entre creación y selección de ubicación */}
        <button
          type="button"
          className="text-blue-600 text-sm mt-2"
          onClick={() => {
            if (book.locations.length === 0) {
              // Si no hay ubicaciones y estamos en modo creación, cerrar el modal
              onClose();
            } else {
              // Si hay ubicaciones existentes, alternar entre creación y transferencia
              setShowCreateLocation(!showCreateLocation);
            }
          }}
          disabled={isCreatingLocation}
        >
          {showCreateLocation
            ? isCreatingLocation
              ? "Creando nueva ubicación..."
              : "Cancelar creación de ubicación"
            : "No existe la ubicación? Crear nueva"}
        </button>
      </div>
    </div>
  );
}
