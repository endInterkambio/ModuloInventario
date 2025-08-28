import { Info } from "lucide-react";

export function InfoTooltip({ text }: { text: string }) {
  return (
    <div className="relative group">
      <Info className="w-4 h-4 text-gray-400 cursor-help" />
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
        {text}
      </div>
    </div>
  );
}
