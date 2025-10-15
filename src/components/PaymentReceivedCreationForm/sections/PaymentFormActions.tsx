interface PaymentFormActionsProps {
  onCancel: () => void;
  resetForm: () => void;
}

export function PaymentFormActions({ onCancel, resetForm }: PaymentFormActionsProps) {
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
      <button
        type="submit"
        className="px-4 py-2 rounded-md font-medium transition-colors bg-primary text-white hover:bg-green-700"
      >
        Guardar
      </button>
    </div>
  );
}
