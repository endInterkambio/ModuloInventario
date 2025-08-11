'use client';
import { useState } from 'react';
import { Tabs, TabList, TabTrigger } from './TabComponents';
import { StockAdjustment } from './StockAdjustment';
import { LocationManagement } from './LocationManagement';
import { WarehouseManagement } from './WarehouseManagement';

export function StockManagerTabs() {
  const [activeTab, setActiveTab] = useState('stock');

  return (
    <div className="bg-white shadow-sm rounded-lg p-4">
      <Tabs activeTab={activeTab} onTabChange={setActiveTab}>
        <TabList>
          <TabTrigger label="🛠 Ajuste de Stock" value="stock" activeTab={activeTab} onTabChange={setActiveTab} />
          <TabTrigger label="📍 Gestión de Ubicaciones" value="locations" activeTab={activeTab} onTabChange={setActiveTab} />
          <TabTrigger label="🏬 Gestión de Almacenes" value="warehouses" activeTab={activeTab} onTabChange={setActiveTab} />
        </TabList>
        <div className="mt-6">
          {activeTab === 'stock' && <StockAdjustment />}
          {activeTab === 'locations' && <LocationManagement />}
          {activeTab === 'warehouses' && <WarehouseManagement />}
        </div>
      </Tabs>
    </div>
  );
}
