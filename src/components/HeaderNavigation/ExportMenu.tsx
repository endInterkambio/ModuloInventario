import { useExportBook } from "@/hooks/useExportBooks";
import { Upload, Loader2 } from "lucide-react"; // Loader2 es un spinner
import React from "react";

const ExportMenu: React.FC = () => {
  const exportMutation = useExportBook({
    fileName: `books_export_${new Date().toISOString()}.xlsx`,
  });

  return (
    <div className="absolute right-full top-0 ml-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-20">
      <div className="py-1">
        <button
          onClick={() => exportMutation.mutate()}
          className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 disabled:opacity-50"
          disabled={exportMutation.isPending}
        >
          {exportMutation.isPending ? (
            <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
          ) : (
            <Upload className="w-4 h-4 text-blue-500" />
          )}
          <span>{exportMutation.isPending ? "Exportando..." : "Exportar"}</span>
        </button>
      </div>
    </div>
  );
};

export default ExportMenu;
