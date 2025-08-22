import { BookFormData, PRICING_FIELDS } from "../formConfig";
import { FormInput } from "../inputs/FormInput";
import { SectionHeader } from "../SectionHeader";
import { Save } from "lucide-react";

interface Props {
  formData: BookFormData;
  onFieldChange: <K extends keyof BookFormData>(
    name: K,
    value: BookFormData[K]
  ) => void;
}

export const PricingSection = ({ formData, onFieldChange }: Props) => (
  <div className="space-y-6">
    <SectionHeader title="Precios" icon={<Save />} />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {PRICING_FIELDS.map((field) => (
        <FormInput
          key={field.name}
          label={field.label}
          type={field.type}
          step={field.step}
          min={field.min}
          value={formData[field.name] as string | number}
          onChange={(value) =>
            onFieldChange(field.name as keyof BookFormData, value)
          }
        />
      ))}
    </div>
  </div>
);
