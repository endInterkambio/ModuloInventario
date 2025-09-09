type InputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  readonly?: boolean;
};

export function Input({
  value,
  onChange,
  placeholder,
  className = "",
  readonly,
}: InputProps) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`border border-gray-300 rounded px-3 py-2 text-sm 
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${className}`}
      readOnly={readonly}
    />
  );
}
