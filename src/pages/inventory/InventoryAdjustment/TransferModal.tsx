import { useEffect, useState } from "react";
import { useCreateInventoryTransaction } from "@/hooks/useCreateInventoryTransaction";
import toast from "react-hot-toast";
import { BookDTO } from "@/types/BookDTO";
import { useCreateBookLocation } from "@/hooks/useCreateBookLocation";
import { useBookStore } from "@/stores/useBookStore";
import { useWarehouses } from "@/hooks/useWarehouses";
import { BookStockLocationDTO } from "@/types/BookStockLocationDTO";
import Select from "react-select";

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
  const BOOKCASE_MIN = 1;
  const BOOKCASE_MAX = 20;
  const FLOOR_MIN = 1;
  const FLOOR_MAX = 5;

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
      // 1️⃣ Ubicación origen
      const fromLocation = book.locations.find(
        (loc) => loc.id === fromLocationId
      );
      if (!fromLocation) {
        toast.error("Ubicación origen inválida");
        return;
      }

      if (
        !newLocation.bookcase ||
        newLocation.bookcase < BOOKCASE_MIN ||
        newLocation.bookcase > BOOKCASE_MAX
      ) {
        toast.error(
          `El estante debe estar entre ${BOOKCASE_MIN} y ${BOOKCASE_MAX}`
        );
        return;
      }
      if (
        !newLocation.bookcaseFloor ||
        newLocation.bookcaseFloor < FLOOR_MIN ||
        newLocation.bookcaseFloor > FLOOR_MAX
      ) {
        toast.error(`El piso debe estar entre ${FLOOR_MIN} y ${FLOOR_MAX}`);
        return;
      }

      // 2️⃣ Preparamos la nueva ubicación
      const locationToCreate: Partial<BookStockLocationDTO> = {
        ...newLocation,
        bookSku: book.sku,
        stock: 0,
        bookCondition: fromLocation.bookCondition, // heredamos la condición
      };

      // 3️⃣ Llamamos al backend
      const created = await createLocation(locationToCreate);

      if (!created) {
        toast.error("No se pudo crear la ubicación");
        return;
      }

      // 4️⃣ Aseguramos lastUpdatedAt
      const createdWithTimestamp: BookStockLocationDTO = {
        ...created,
        lastUpdatedAt: created.lastUpdatedAt || new Date().toISOString(),
        warehouse: {
          id:
            created.warehouse?.id ??
            (newLocation.warehouse as { id: number }).id,
          name:
            created.warehouse?.name ??
            (newLocation.warehouse as { name: string }).name,
        },
      };

      // 5️⃣ Actualizamos la store y el estado local del libro
      useBookStore.getState().addBookLocation(book.id, createdWithTimestamp);

      // 5.1️⃣ Agrega la ubicación a la copia local del modal para que el SELECT la vea
      book.locations = [createdWithTimestamp, ...(book.locations || [])];

      // 6️⃣ Actualizamos selectores / UI
      setToLocationId(created.id);
      setShowCreateLocation(false);

      toast.success("Ubicación creada con éxito");
    } catch (err) {
      console.error(err);
      toast.error("Error al crear ubicación");
    }
  };

  if (!isOpen) return null;

  // Opciones para react-select
  const locationOptions =
    book.locations
      ?.filter((loc) => loc.id !== fromLocationId)
      .map((loc) => ({
        value: loc.id,
        label: `${loc.warehouse?.name} - ${loc.locationType} - E. ${loc.bookcase} - P. ${loc.bookcaseFloor} - Stock(${loc.stock}) - Cond. ${loc.bookCondition}`,
      })) || [];

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg w-full max-w-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Transferir libro</h2>

        <label className="block mb-2 text-sm">Ubicación destino</label>
        <Select
          options={locationOptions}
          value={
            locationOptions.find((opt) => opt.value === toLocationId) || null
          }
          onChange={(selected) =>
            setToLocationId(selected ? selected.value : null)
          }
          placeholder="Selecciona ubicación"
          isClearable
          className="mb-2"
          styles={{
            control: (base) => ({
              ...base,
              minHeight: "48px",
              borderRadius: "0.375rem",
              borderColor: "#d1d5db",
              boxShadow: "none",
            }),
            menu: (base) => ({
              ...base,
              zIndex: 9999,
            }),
          }}
        />

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
            <WarehouseSelect
              value={newLocation.warehouse?.id || ""}
              onChange={(id, name) =>
                setNewLocation((prev) => ({
                  ...prev,
                  warehouse: { id, name },
                }))
              }
            />

            <label className="block text-sm mb-1">Estante</label>
            <input
              type="number"
              min={BOOKCASE_MIN}
              max={BOOKCASE_MAX}
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
              min={FLOOR_MIN}
              max={FLOOR_MAX}
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

const WarehouseSelect = ({
  value,
  onChange,
}: {
  value: number | "";
  onChange: (id: number, name: string) => void;
}) => {
  const { data: warehouses, isLoading } = useWarehouses();

  if (isLoading) return <div>Cargando almacenes...</div>;

  return (
    <select
      value={value}
      onChange={(e) => {
        const selected = warehouses?.find(
          (w) => w.id === Number(e.target.value)
        );
        if (selected) onChange(selected.id, selected.name);
      }}
      className="border w-full p-1 mb-2 rounded"
    >
      <option value="">Selecciona un almacén</option>
      {warehouses?.map((w) => (
        <option key={w.id} value={w.id}>
          {w.name}
        </option>
      ))}
    </select>
  );
};
