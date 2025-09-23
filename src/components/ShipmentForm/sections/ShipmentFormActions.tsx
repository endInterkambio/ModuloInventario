interface Props {
  onCancel: () => void;
  resetForm: () => void;
}

export function ShipmentFormActions({ onCancel, resetForm }: Props) {
  return (
    <div className="flex justify-end gap-2 mt-6">
      <button
        type="button"
        onClick={() => {
          resetForm();
          onCancel();
        }}
        className="px-4 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50"
      >
        Cancelar
      </button>

      {/* 🚀 Este dispara el submit del formulario */}
      <button
        type="submit"
        className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
      >
        Guardar
      </button>
    </div>
  );
}
