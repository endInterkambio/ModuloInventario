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
        className="px-4 py-2 rounded-md font-medium transition-colors border bg-secondary hover:bg-yellow-500"
      >
        Limpiar campos
      </button>

      {/* Este dispara el submit del formulario */}
      <button
        type="submit"
        className="px-4 py-2 rounded-md font-medium transition-colors bg-[--color-button] text-white hover:bg-green-700"
      >
        Guardar
      </button>
    </div>
  );
}
