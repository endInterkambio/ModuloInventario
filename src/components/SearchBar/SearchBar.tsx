import { useBookStore } from "@/stores/useBookStore";
import { IoMdClose } from "react-icons/io";

interface SearchBarProps {
  searchTerm?: string;
  setSearchTerm?: (term: string) => void;
}

export function SearchBar({
  searchTerm: propTerm,
  setSearchTerm: propSet,
}: SearchBarProps) {
  const { searchTerm: storeTerm, setSearchTerm: storeSet } = useBookStore();

  const term = propTerm ?? storeTerm;
  const setTerm = propSet ?? storeSet;

  return (
    <form
      className="max-w-md w-full mx-auto"
      onSubmit={(e) => e.preventDefault()}
    >
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Buscar por título, autor, ISBN..."
          required
        />
        {term && (
          <button
            type="button"
            onClick={() => setTerm("")}
            className="absolute inset-y-0 end-0 flex items-center pe-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
            aria-label="Limpiar búsqueda"
          >
            <IoMdClose className="w-5 h-5" />
          </button>
        )}
      </div>
    </form>
  );
}
