type FormFieldProps = {
  label: string;
  children: React.ReactNode;
  required?: boolean;
};

export function FormField({ label, children, required = false }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-gray-600 font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
    </div>
  );
}
