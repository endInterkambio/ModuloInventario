import { useExportBestStockBooks, useExportBook } from "@/hooks/useExportBooks";
import { Download, Loader2 } from "lucide-react"; // Loader2 es un spinner

const ExportMenu = () => {
  const exportMutation = useExportBook({
    fileName: `books_export_${new Date().toISOString()}.xlsx`,
  });

  const exportBestStockMutation = useExportBestStockBooks({
    fileName: `best_stock_books_export_${new Date().toISOString()}.xlsx`,
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
            <Download className="w-4 h-4 text-blue-500" />
          )}
          <span>
            {exportMutation.isPending ? "Exportando..." : "Exportar todos"}
          </span>
        </button>
        <button
          onClick={() => exportBestStockMutation.mutate()}
          className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 disabled:opacity-50"
          disabled={exportBestStockMutation.isPending}
        >
          {exportBestStockMutation.isPending ? (
            <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
          ) : (
            <Download className="w-4 h-4 text-blue-500" />
          )}
          <span>
            {exportBestStockMutation.isPending
              ? "Exportando..."
              : "Exportar mejor stock"}
          </span>
        </button>
      </div>
    </div>
  );
};

export default ExportMenu;
