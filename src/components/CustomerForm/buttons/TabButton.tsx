export function TabButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 text-sm font-medium border-b-2 transition-colors ${
        active
          ? "text-primary border-secondary font-bold"
          : "text-gray-500 border-transparent hover:text-gray-700"
      }`}
    >
      {label}
    </button>
  );
}