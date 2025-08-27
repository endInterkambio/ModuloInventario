import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface DropdownMenuProps {
  label: string; // Texto inicial
  options: string[]; // Opciones del menú
  onSelect?: (value: string) => void; // Callback cuando se selecciona una opción
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  label,
  options,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(label);

  const handleSelect = (option: string) => {
    setSelected(option);
    setIsOpen(false);
    onSelect?.(option);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-gray-700 hover:text-gray-900 font-medium"
      >
        <span>{selected}</span>
        <ChevronDown className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
          <div className="py-1">
            {options.map((item) => (
              <button
                key={item}
                onClick={() => handleSelect(item)}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
