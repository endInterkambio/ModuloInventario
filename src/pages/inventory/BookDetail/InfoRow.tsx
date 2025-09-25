import { Pencil, Check } from "lucide-react";
import { useState } from "react";
// import { toast } from "react-hot-toast";
import { InfoRowProps } from "@/types/ui/BookDetailUI";

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
  const [hovered, setHovered] = useState(false);
  const [editedValue, setEditedValue] = useState(stringValue);

  const hasChanged = editedValue !== stringValue;

  const handleSave = () => {
    if (!hasChanged) {
      setIsEditing(false);
      return;
    }

    if (onSave) {
      onSave(editedValue);
    }

    setIsEditing(false);
    // toast.success("Cambios guardados");
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
        {isEditing ? (
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
        ) : (
          <>
            <span>
              {stringValue.length > 30 ? `${stringValue.substring(0, 30)}...` : stringValue}
            </span>
            {editable && hovered && (
              <button
                onClick={() => {
                  setIsEditing(true);
                  setEditedValue(stringValue);
                }}
                className="text-gray-400 hover:text-blue-500"
                title="Editar"
              >
                <Pencil className="w-4 h-4" />
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};
