// components/ui/Tabs.tsx
import { ReactNode } from 'react';

export function Tabs({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`w-full ${className}`}>{children}</div>;
}

export function TabList({ children }: { children: ReactNode }) {
  return (
    <div className="flex gap-4 border-b border-gray-200 px-4 pt-4">
      {children}
    </div>
  );
}

export function TabTrigger({
  value,
  activeValue,
  onChange,
  children,
}: {
  value: string;
  activeValue: string;
  onChange: (value: string) => void;
  children: ReactNode;
}) {
  const isActive = value === activeValue;

  return (
    <button
      onClick={() => onChange(value)}
      className={`relative inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-t-md transition-colors ${
        isActive
          ? 'text-blue-600 bg-white border border-b-white border-gray-300'
          : 'text-gray-500 hover:text-blue-600 border-transparent'
      }`}
    >
      {children}
      {isActive && (
        <span className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-blue-600" />
      )}
    </button>
  );
}
