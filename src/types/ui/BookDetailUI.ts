export type TabId = "general" | "locations" | "transactions" | "history";

export interface InfoRowProps {
  label: string;
  value: string | number | undefined | string[];
  icon?: React.ReactNode;
  inputClassName?: string;
  className?: string; 
  editable?: boolean;
  isEditing?: boolean;
  onEdit?: () => void;
  onSave?: (newValue: string) => void;
}

export interface StatCardProps {
  title: string;
  stats: Record<string, number>;
  type: "physical" | "digital";
}
