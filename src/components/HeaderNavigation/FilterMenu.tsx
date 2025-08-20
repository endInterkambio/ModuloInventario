import { useBookStore } from "@/stores/useBookStore";

export default function FilterMenu() {
  const { minStock, maxStock, setMinStock, setMaxStock } = useBookStore();

  return (
    <div className="absolute right-full top-0 ml-1 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-20">
      <div className="py-2 px-3 space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Stock mínimo
          </label>
          <input
            type="number"
            value={minStock ?? ""}
            onChange={(e) =>
              setMinStock(
                e.target.value === "" ? undefined : Number(e.target.value)
              )
            }
            placeholder="Ej: 5"
            className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Stock máximo
          </label>
          <input
            type="number"
            value={maxStock ?? ""}
            onChange={(e) =>
              setMaxStock(
                e.target.value === "" ? undefined : Number(e.target.value)
              )
            }
            placeholder="Ej: 50"
            className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
}
