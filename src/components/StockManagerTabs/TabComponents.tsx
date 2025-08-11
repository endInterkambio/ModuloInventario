import { ReactNode } from 'react';

export function Tabs({
  children,
}: {
  activeTab: string;
  onTabChange: (tab: string) => void;
  children: ReactNode;
}) {
  return <div>{children}</div>;
}

export function TabList({ children }: { children: ReactNode }) {
  return <div className="flex gap-2 border-b mb-4">{children}</div>;
}

export function TabTrigger({
  label,
  value,
  activeTab,
  onTabChange,
}: {
  label: string;
  value: string;
  activeTab: string;
  onTabChange: (tab: string) => void;
}) {
  const isActive = value === activeTab;
  return (
    <button
      onClick={() => onTabChange(value)}
      className={`px-4 py-2 text-sm border-b-2 transition-colors ${
        isActive
          ? 'border-blue-500 text-blue-600 font-semibold'
          : 'border-transparent text-gray-500 hover:text-blue-500'
      }`}
    >
      {label}
    </button>
  );
}
