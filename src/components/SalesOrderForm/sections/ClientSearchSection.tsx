import { Search } from "lucide-react";

type Props = {
  searchTerm: string;
  onSearchChange: (value: string) => void;
};

export function ClientSearchSection({ searchTerm, onSearchChange }: Props) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-sm text-red-500">Nombre del cliente</span>
      </div>
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Seleccionar o buscar un cliente"
          className="w-full border border-gray-300 rounded px-3 py-2 pr-10 text-sm 
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
      </div>
    </div>
  );
}
