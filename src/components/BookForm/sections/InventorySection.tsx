import { FormInput } from '../inputs/FormInput';
import { SectionHeader } from '../SectionHeader';
import { Plus } from 'lucide-react';
import { StockLocationItem } from '../StockLocationItem';
import { BookFormData } from '../formConfig';

type LocationField = keyof BookFormData["locations"][number];

interface Props {
  formData: BookFormData;
  onFieldChange: <K extends keyof BookFormData>(
    name: K,
    value: BookFormData[K]
  ) => void;
  onLocationChange: (
    index: number,
    field: LocationField,
    value: BookFormData["locations"][number][LocationField]
  ) => void;
  onRemoveLocation: (index: number) => void;
}

export const InventorySection = ({
  formData,
  onFieldChange,
  onLocationChange,
  onRemoveLocation,
}: Props) => (
  <div className="space-y-6">
    <SectionHeader title="Inventario" icon={<Plus />} />
    <FormInput
      label="Stock Total"
      type="number"
      min="0"
      value={formData.totalStock}
      onChange={(value) => onFieldChange('totalStock', value)}
    />
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-700">Ubicaciones de Stock</h3>
        <button
          type="button"
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Agregar Ubicación</span>
        </button>
      </div>
      <div className="space-y-3">
        {formData.locations.map((location, index) => (
          <StockLocationItem
            key={index}
            location={location}
            index={index}
            onChange={onLocationChange}
            onRemove={onRemoveLocation}
          />
        ))}
      </div>
    </div>
  </div>
);
