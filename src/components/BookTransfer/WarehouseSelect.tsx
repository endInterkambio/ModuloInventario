import { useWarehouses } from "@/hooks/useWarehouses";

interface Props {
  value: number | "";
  onChange: (id: number, name: string) => void;
}

export const WarehouseSelect = ({ value, onChange }: Props) => {
  const { data: warehouses, isLoading } = useWarehouses();

  if (isLoading) return <div>Cargando almacenes...</div>;

  return (
    <select
      value={value}
      onChange={(e) => {
        const selected = warehouses?.find((w) => w.id === Number(e.target.value));
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
