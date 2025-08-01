import { ChevronDown } from "lucide-react";

interface SubmenuItemProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onHover: () => void;
}

const SubmenuItem: React.FC<SubmenuItemProps> = ({
  icon,
  label,
  onHover,
}) => (
  <button
    className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
    onMouseEnter={onHover}
  >
    {icon}
    <span>{label}</span>
    <ChevronDown className="w-4 h-4 ml-auto" />
  </button>
);

export default SubmenuItem;
