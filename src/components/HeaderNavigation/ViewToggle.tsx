import { List, Grid3X3 } from "lucide-react";

const ViewToggle: React.FC = () => (
  <div className="flex items-center border border-gray-300 rounded-md">
    <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-l-md">
      <List className="w-4 h-4" />
    </button>
    <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-r-md border-l border-gray-300">
      <Grid3X3 className="w-4 h-4" />
    </button>
  </div>
);

export default ViewToggle;
