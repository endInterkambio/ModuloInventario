interface FormTextareaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

export const FormTextarea = ({ label, value, onChange, required = false }: FormTextareaProps) => (
  <div className="space-y-1">
    <label className="block text-sm font-medium text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <textarea
      value={value}
      required={required}
      onChange={(e) => onChange(e.target.value)}
      rows={4}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-vertical"
    />
  </div>
);
