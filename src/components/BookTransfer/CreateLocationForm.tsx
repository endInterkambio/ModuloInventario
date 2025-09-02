import { CreateLocationFormProps } from "./types";
import { WarehouseSelect } from "./WarehouseSelect";

export const CreateLocationForm = ({
  newLocation,
  setNewLocation,
  handleCreateLocation,
  isCreatingLocation,
  BOOKCASE_MIN,
  BOOKCASE_MAX,
  FLOOR_MIN,
  FLOOR_MAX,
}: CreateLocationFormProps) => (
  <div className="border p-2 mb-4 rounded bg-gray-50">
    <label className="block text-sm mb-1">Almacén</label>
    <WarehouseSelect
      value={newLocation.warehouse?.id || ""}
      onChange={(id, name) => setNewLocation({ ...newLocation, warehouse: { id, name } })}
    />

    <label className="block text-sm mb-1">Estante</label>
    <input
      type="number"
      min={BOOKCASE_MIN}
      max={BOOKCASE_MAX}
      value={newLocation.bookcase || ""}
      onChange={(e) => setNewLocation({ ...newLocation, bookcase: Number(e.target.value) })}
      className="border w-full p-1 mb-2 rounded"
    />

    <label className="block text-sm mb-1">Piso</label>
    <input
      type="number"
      min={FLOOR_MIN}
      max={FLOOR_MAX}
      value={newLocation.bookcaseFloor || ""}
      onChange={(e) => setNewLocation({ ...newLocation, bookcaseFloor: Number(e.target.value) })}
      className="border w-full p-1 mb-2 rounded"
    />

    <label className="block text-sm mb-1">Tipo de ubicación</label>
    <select
      value={newLocation.locationType || "MAIN_STORAGE"}
      onChange={(e) => setNewLocation({ ...newLocation, locationType: e.target.value })}
      className="border w-full p-1 mb-2 rounded"
      disabled={newLocation.warehouse?.id !== 1} // Show all the options just for first id
    >
      <option value="MAIN_STORAGE">MAIN_STORAGE</option>
      <option value="SHOWROOM">SHOWROOM</option>
      <option value="FAIR_STORAGE">FAIR_STORAGE</option>
    </select>

    <label className="block text-sm mb-1">Condición del libro</label>
    <select
      value={newLocation.bookCondition || "U"}
      onChange={(e) => setNewLocation({ ...newLocation, bookCondition: e.target.value })}
      className="border w-full p-1 mb-2 rounded"
    >
      <option value="U">U</option>
      <option value="A">A</option>
      <option value="B">B</option>
      <option value="C">C</option>
      <option value="D">D</option>
      <option value="X">X</option>
    </select>

    <button
      onClick={handleCreateLocation}
      className="px-3 py-1 rounded bg-green-600 text-white"
      disabled={isCreatingLocation}
    >
      {isCreatingLocation ? "Creando..." : "Crear ubicación"}
    </button>
  </div>
);
