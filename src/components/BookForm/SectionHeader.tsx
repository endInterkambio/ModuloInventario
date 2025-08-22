interface SectionHeaderProps {
  title: string;
  icon: JSX.Element;
}

export const SectionHeader = ({ title, icon }: SectionHeaderProps) => (
  <div className="flex items-center space-x-2 mb-6">
    {icon}
    <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
  </div>
);
