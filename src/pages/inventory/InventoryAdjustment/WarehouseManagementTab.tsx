import { Pencil, Trash2, PlusCircle } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface Warehouse {
  id: number;
  name: string;
  address: string;
  description: string;
  createdAt: string;
  totalBooks: number;
  active: boolean;
}

const initialData: Warehouse[] = [
  {
    id: 1,
    name: 'Almacén Principal',
    address: 'Edificio A, Planta Baja',
    description: 'Almacén principal para libros de mayor rotación',
    totalBooks: 1250,
    createdAt: '2024-01-14',
    active: true,
  },
  {
    id: 2,
    name: 'Almacén Secundario',
    address: 'Edificio B, Segundo Piso',
    description: 'Almacén para libros especializados y de menor rotación',
    totalBooks: 850,
    createdAt: '2024-03-09',
    active: true,
  },
];

interface Props {
  searchTerm: string; // 🔹 Recibido desde el padre
}

export function WarehouseManagementTab({ searchTerm }: Props) {
  const [warehouses, setWarehouses] = useState(initialData);

  // Filtrado según searchTerm
  const filteredWarehouses = warehouses.filter(
    (w) =>
      w.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      w.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      w.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (id: number) => {
    const current = warehouses.find(w => w.id === id);
    if (!current) return;

    const name = prompt('Nuevo nombre:', current.name);
    const address = prompt('Nueva dirección:', current.address);
    const description = prompt('Nueva descripción:', current.description);

    if (!name || !address || !description) {
      toast.error('Campos inválidos');
      return;
    }

    setWarehouses(prev =>
      prev.map(w => (w.id === id ? { ...w, name, address, description } : w))
    );
    toast.success('Almacén actualizado');
  };

  const handleDelete = (id: number) => {
    if (confirm('¿Estás seguro de eliminar este almacén?')) {
      setWarehouses(prev => prev.filter(w => w.id !== id));
      toast.success('Almacén eliminado');
    }
  };

  const handleCreate = () => {
    const name = prompt('Nombre del nuevo almacén:');
    const address = prompt('Dirección:');
    const description = prompt('Descripción:');

    if (!name || !address || !description) {
      toast.error('Campos inválidos');
      return;
    }

    const newWarehouse: Warehouse = {
      id: Date.now(),
      name,
      address,
      description,
      totalBooks: 0,
      createdAt: new Date().toLocaleDateString('es-PE'),
      active: true,
    };

    setWarehouses(prev => [...prev, newWarehouse]);
    toast.success('Almacén creado');
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

      {filteredWarehouses.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          No se encontraron resultados para "<strong>{searchTerm}</strong>"
        </div>
      ) : (
        <div className="space-y-4">
          {filteredWarehouses.map(w => (
            <div
              key={w.id}
              className="border rounded-lg p-4 shadow-sm bg-white flex flex-col gap-2"
            >
              <div className="flex justify-between items-center">
                <div className="text-blue-700 font-semibold text-md flex items-center gap-2">
                  <WarehouseIcon /> {w.name}
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">
                  {w.active ? 'Activo' : 'Inactivo'}
                </span>
              </div>
              <div className="text-sm text-gray-500">{w.address}</div>
              <div className="text-sm">{w.description}</div>
              <div className="text-sm font-bold">{w.totalBooks} libros totales</div>
              <div className="text-xs text-gray-400">{w.createdAt} - Fecha de creación</div>
              <div className="flex gap-2">
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
