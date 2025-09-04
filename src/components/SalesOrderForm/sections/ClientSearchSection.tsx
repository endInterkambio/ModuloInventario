import { useEffect, useRef, useState } from "react";
// import { Search } from "lucide-react";
import { useCustomers } from "@/hooks/useCustomers";
import { CustomerDTO } from "@/types/CustomerDTO";

type Props = {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedCustomer: CustomerDTO | null;
  onCustomerSelect: (customer: CustomerDTO | null) => void;
};

export function ClientSearchSection({
  searchTerm,
  onSearchChange,
  selectedCustomer,
  onCustomerSelect,
}: Props) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);

  // ref para contenedor
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Debounce para no llamar API en cada tecla
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedTerm(searchTerm), 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Hook para obtener clientes filtrados desde backend
  const { data: customersPage } = useCustomers(0, 10, debouncedTerm);
  const customers = customersPage?.content || [];

  const handleSelect = (customer: CustomerDTO) => {
    onCustomerSelect(customer);
    setShowDropdown(false);
    onSearchChange(""); // opcional: resetear búsqueda
  };

  const handleClear = () => {
    onCustomerSelect(null); // deselecciona
    onSearchChange(""); // limpia búsqueda
    setShowDropdown(false);
  };

  // Detectar clic fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;

      // Si el click no está dentro del contenedor, cerrar
      if (wrapperRef.current && !wrapperRef.current.contains(target)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // 🔹 Mostrar label correcto si hay cliente seleccionado
  const inputValue = selectedCustomer
    ? selectedCustomer.customerType === "PERSON"
      ? selectedCustomer.name
      : selectedCustomer.companyName
    : searchTerm;

  return (
    <div ref={wrapperRef} className="mb-6 relative">
      <label className="text-sm text-gray-700 mb-1 block">Cliente</label>
      <div className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => {
            onSearchChange(e.target.value);
            setShowDropdown(true);
          }}
          onFocus={() => setShowDropdown(true)}
          placeholder="Seleccionar o buscar un cliente"
          className="w-full border border-gray-300 rounded px-3 py-2 pr-10 text-sm
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        {/* Botón para limpiar */}
        {selectedCustomer && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-6 top-2.5 text-red-700 hover:text-gray-600 font-bold"
          >
            X
          </button>
        )}
        {/*Mostrar simbolo de búsqueda*/}
        {/* <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" /> */}

        {showDropdown && (
          <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded mt-1 max-h-60 overflow-y-auto shadow-lg">
            {customers.length > 0 ? (
              customers.map((customer) => {
                const label =
                  customer.customerType === "PERSON"
                    ? customer.name
                    : customer.companyName;
                return (
                  <li
                    key={customer.id}
                    onClick={() => handleSelect(customer)}
                    className="px-3 py-2 hover:bg-blue-100 cursor-pointer text-sm"
                  >
                    {label}
                  </li>
                );
              })
            ) : (
              <li className="px-3 py-2 text-gray-500 text-sm italic">
                No se encontraron resultados
              </li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
