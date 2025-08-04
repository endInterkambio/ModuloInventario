import { TabButtonProps } from "@/types/ui/Tabs";

export const TabButton = ({ id, label, isActive, onClick }: TabButtonProps) => (
  <button
    key={id}
    onClick={onClick}
    className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
      isActive
        ? "border-blue-500 text-blue-600 bg-blue-50"
        : "border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300"
    }`}
  >
    {label}
  </button>
);