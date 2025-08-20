import { StatCardProps } from "@/types/ui/BookDetailUI";
import { Package, Download } from "lucide-react";

const StatCard = ({ title, stats, type }: StatCardProps) => {
  const getStatLabel = (key: string): string => {
    const labels: Record<string, string> = {
      total: "Total",
      available: "Disponible",
      reserved: "Reservado",
      loaned: "Prestado",
      downloads: "Descargas",
    };
    return labels[key] || key;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
        {type === "physical" ? (
          <Package className="w-4 h-4" />
        ) : (
          <Download className="w-4 h-4" />
        )}
        {title}
      </h3>
      <div className="space-y-2">
        {Object.entries(stats).map(([key, value]) => (
          <div key={key} className="flex justify-between items-center text-sm">
            <span className="text-gray-600 capitalize">
              {getStatLabel(key)}
            </span>
            <span className="font-medium text-gray-800">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatCard;
