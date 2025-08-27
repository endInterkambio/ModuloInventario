type SelectProps = {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  className?: string;
};

export function Select({ value, onChange, options, className = "" }: SelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`border border-gray-300 rounded px-3 py-2 text-sm 
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white ${className}`}
    >
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
