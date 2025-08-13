import { useState, useEffect } from "react";
import { Pencil, Trash2, PlusCircle } from "lucide-react";
import toast from "react-hot-toast";
import { WarehouseDTO } from "@/types/WarehouseDTO";
import {
  getWarehouses,
  updateWarehouse,
  createWarehouse,
  deleteWarehouse,
} from "@/api/modules/warehouses";

export function WarehouseManagementTab() {
  const [warehouses, setWarehouses] = useState<WarehouseDTO[]>([]);
  const [loading, setLoading] = useState(false);

  // 🔹 FETCH real desde la API
  useEffect(() => {
    const fetchWarehouses = async () => {
      setLoading(true);
      try {
        const data = await getWarehouses();
        setWarehouses(data);
      } catch (error) {
        console.error(error);
        toast.error("Error al cargar almacenes");
      } finally {
        setLoading(false);
      }
    };
    fetchWarehouses();
  }, []);

  // 🔹 UPDATE parcial
  const handleEdit = async (id: number) => {
    const current = warehouses.find((w) => w.id === id);
    if (!current) return;

    const name = prompt("Nuevo nombre:", current.name);
    const location = prompt("Nueva ubicación:", current.location);
    const description = prompt("Nueva descripción:", current.description);

    if (!name && !location && !description) {
      toast.error("No se modificó ningún campo");
      return;
    }

    const updatedData: Partial<WarehouseDTO> = {};
    if (name) updatedData.name = name;
    if (location) updatedData.location = location;
    if (description) updatedData.description = description;

    try {
      const updated = await updateWarehouse(id, updatedData);
      setWarehouses((prev) =>
        prev.map((w) => (w.id === id ? updated : w))
      );
      toast.success("Almacén actualizado");
    } catch (error) {
      console.error(error);
      toast.error("Error al actualizar el almacén");
    }
  };

  // 🔹 DELETE
  const handleDelete = async (id: number) => {
    if (!confirm("¿Estás seguro de eliminar este almacén?")) return;

    try {
      await deleteWarehouse(id);
      setWarehouses((prev) => prev.filter((w) => w.id !== id));
      toast.success("Almacén eliminado");
    } catch (error) {
      console.error(error);
      toast.error("Error al eliminar el almacén");
    }
  };

  // 🔹 CREATE
  const handleCreate = async () => {
    const name = prompt("Nombre del nuevo almacén:");
    const location = prompt("Ubicación:");
    const description = prompt("Descripción:");

    if (!name || !location || !description) {
      toast.error("Campos inválidos");
      return;
    }

    try {
      const newWarehouse = await createWarehouse({ name, location, description });
      setWarehouses((prev) => [...prev, newWarehouse]);
      toast.success("Almacén creado");
    } catch (error) {
      console.error(error);
      toast.error("Error al crear el almacén");
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-4">Gestión de Almacenes</h2>

      <button
        onClick={handleCreate}
        className="flex items-center gap-2 bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700 mb-4"
      >
        <PlusCircle className="w-4 h-4" /> Nuevo Almacén
      </button>

      {loading ? (
        <div className="text-center text-gray-500 py-10">Cargando...</div>
      ) : warehouses.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          No se encontraron resultados"
        </div>
      ) : (
        <div className="space-y-4 columns-3xl">
          {warehouses.map((w) => (
            <div
              key={w.id}
              className="border rounded-lg p-4 shadow-sm bg-white flex flex-col gap-2"
            >
              <div className="flex justify-between items-center">
                <div className="text-blue-700 font-semibold text-md flex items-center gap-2">
                  <WarehouseIcon /> {w.name}
                </div>
              </div>
              <div className="text-sm text-gray-500">{w.location}</div>
              <div className="text-sm">{w.description}</div>
              <div className="text-sm font-bold"><span>Libros totales: </span>{w.totalBooks}</div>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleEdit(w.id)}
                  className="text-sm px-3 py-1 border border-blue-500 text-blue-600 rounded hover:bg-blue-50"
                >
                  <Pencil className="w-4 h-4 inline mr-1" /> Editar
                </button>
                <button
                  onClick={() => handleDelete(w.id)}
                  className="text-sm px-3 py-1 border border-red-500 text-red-600 rounded hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4 inline mr-1" /> Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function WarehouseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4 text-blue-600"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 10l9-6 9 6v10a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4H9v4a1 1 0 01-1 1H4a1 1 0 01-1-1V10z"
      />
    </svg>
  );
}
