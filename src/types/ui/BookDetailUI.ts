export type TabId = "general" | "attributes" | "transactions" | "history";

export interface InfoRowProps {
  label: string;
  value: React.ReactNode;
  icon?: React.ReactNode;
}

export interface StatCardProps {
  title: string;
  stats: Record<string, number>;
  type: "physical" | "digital";
}
