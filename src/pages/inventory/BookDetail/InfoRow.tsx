import { Pencil, Check, X } from "lucide-react";
import { InfoRowProps } from "@/types/ui/BookDetailUI";
import { useState } from "react";

export const InfoRow = ({
  label,
  value,
  className,
  inputClassName,
  icon,
  editable = false,
  onSave,
}: InfoRowProps) => {
  const stringValue = String(value ?? "");
  const [isEditing, setIsEditing] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [editedValue, setEditedValue] = useState(stringValue);

  const hasChanged = editedValue !== stringValue;
  const isLongText = stringValue.length > 30;

  const handleSave = () => {
    if (!hasChanged) {
      setIsEditing(false);
      setShowPopup(false);
      return;
    }
    onSave?.(editedValue);
    setIsEditing(false);
    setShowPopup(false);
  };

  return (
    <div
      className={`${className || ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
        {icon}
        {label}
      </div>

      <div className="flex items-center gap-2 max-w-xs text-left text-sm text-gray-800">
        {/* Modo inline normal */}
        {!isEditing ? (
          <>
            <span className="truncate">
              {isLongText ? `${stringValue.substring(0, 30)}...` : stringValue}
            </span>
            {editable && hovered && (
              <button
                onClick={() => {
                  if (isLongText) {
                    setShowPopup(true);
                  } else {
                    setIsEditing(true);
                    setEditedValue(stringValue);
                  }
                }}
                className="text-gray-400 hover:text-blue-500"
                title="Editar"
              >
                <Pencil className="w-4 h-4" />
              </button>
            )}
          </>
        ) : (
          <>
            <input
              type="text"
              className={`${inputClassName || ""}`}
              value={editedValue}
              onChange={(e) => setEditedValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSave();
                if (e.key === "Escape") {
                  setIsEditing(false);
                  setEditedValue(stringValue);
                }
              }}
              autoFocus
            />
            {hasChanged && (
              <button
                onClick={handleSave}
                className="text-green-600 hover:text-green-700"
                title="Guardar"
              >
                <Check className="w-4 h-4" />
              </button>
            )}
          </>
        )}
      </div>

      {/* Popup Modal para textos largos */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[400px] max-w-[90%]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-base font-semibold text-gray-800">
                Editar {label}
              </h2>
              <button
                onClick={() => setShowPopup(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5 hover:text-red-600" />
              </button>
            </div>

            <textarea
              className="w-full border rounded-md p-2 text-sm text-gray-800 focus:ring-2 focus:ring-green-600 focus:outline-none min-h-[120px]"
              value={editedValue}
              onChange={(e) => setEditedValue(e.target.value)}
            />

            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => {
                  setShowPopup(false);
                  setEditedValue(stringValue);
                }}
                className="px-3 py-1 text-sm rounded-md border text-gray-700 hover:bg-gray-100"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                disabled={!hasChanged}
                className={`px-3 py-1 text-sm rounded-md text-white ${
                  hasChanged
                    ? "bg-primary hover:bg-green-700"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
