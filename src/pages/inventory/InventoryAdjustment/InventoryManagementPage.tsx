// components/InventoryManagementPage.tsx
import { useState } from 'react';
import { WarehouseManagementTab } from './WarehouseManagementTab';
import { LocationManagementTab } from './LocationManagmentTab';
import StockAdjustmentTab from './StockAdjustmentTab';

const tabs = [
  { id: 'stock', label: 'Ajuste de Stock' },
  { id: 'locations', label: 'Gestión de Ubicaciones' },
  { id: 'warehouses', label: 'Gestión de Almacenes' },
];

export default function InventoryManagementPage() {
  const [activeTab, setActiveTab] = useState('stock');

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <h1 className="text-2xl font-bold mb-4">Gestión de Inventario</h1>

      {/* Pestañas */}
      <div className="flex border-b mb-6 space-x-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`pb-2 border-b-2 text-sm font-medium ${
              activeTab === tab.id
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-blue-600'
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Contenido del Tab */}
      <div>
        {activeTab === 'stock' && <StockAdjustmentTab />}
        {activeTab === 'locations' && <LocationManagementTab />}
        {activeTab === 'warehouses' && <WarehouseManagementTab />}
      </div>
    </div>
  );
}
