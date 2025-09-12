interface PaymentFormActionsProps {
  onSubmit: () => void;
  onCancel: () => void;
}

export function PaymentFormActions({ onSubmit, onCancel }: PaymentFormActionsProps) {
  return (
    <div className="flex justify-end gap-2 mt-6">
      <button
        type="button"
        onClick={onCancel}
        className="px-4 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50"
      >
        Cancelar
      </button>
      <button
        type="button"
        onClick={onSubmit}
        className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
      >
        Guardar
      </button>
    </div>
  );
}
