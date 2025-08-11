import { TabId } from "@/types/ui/BookDetailUI";
import { TabButton } from "./TabButton";

type Props = {
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;
};

const BookTabs = ({ activeTab, setActiveTab }: Props) => (
  <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
    <div className="border-b border-gray-200">
      <nav className="flex">
        <TabButton id="general" label="Información general" isActive={activeTab === "general"} onClick={() => setActiveTab("general")} />
        <TabButton id="attributes" label="Atributos" isActive={activeTab === "attributes"} onClick={() => setActiveTab("attributes")} />
        <TabButton id="transactions" label="Transacciones" isActive={activeTab === "transactions"} onClick={() => setActiveTab("transactions")} />
        <TabButton id="history" label="Historial" isActive={activeTab === "history"} onClick={() => setActiveTab("history")} />
      </nav>
    </div>
  </div>
);

export default BookTabs;
