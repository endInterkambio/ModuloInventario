import { InfoRowProps } from "@/types/ui/BookDetailUi";

export const InfoRow = ({ label, value, icon }: InfoRowProps) => (
  <div className="flex items-center justify-between py-2 border-b border-gray-100">
    <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
      {icon}
      {label}
    </div>
    <div className="text-sm text-gray-800 max-w-xs text-right">
      {typeof value === "string" && value.length > 50
        ? `${value.substring(0, 50)}...`
        : value}
    </div>
  </div>
);