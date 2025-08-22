interface FormInputProps<T extends string | number | string[]> {
  label: string;
  value: T;
  onChange: (value: T) => void;
  type?: string;
  required?: boolean;
  step?: string;
  min?: string;
}

export const FormInput = <T extends string | number | string[]>({
  label,
  value,
  onChange,
  type = 'text',
  required = false,
  step,
  min,
}: FormInputProps<T>) => (
  <div className="space-y-1">
    <label className="block text-sm font-medium text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      value={value}
      required={required}
      step={step}
      min={min}
      onChange={(e) => {
        if (type === 'number') onChange((parseFloat(e.target.value) || 0) as T);
        else onChange(e.target.value as T);
      }}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
    />
  </div>
);
