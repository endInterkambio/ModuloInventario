import { BASIC_INFO_FIELDS, BookFormData } from '../formConfig';
import { FormInput } from '../inputs/FormInput';
import { FormTextarea } from '../inputs/FormTextarea';
import { SectionHeader } from '../SectionHeader';
import { BookOpen } from 'lucide-react';

interface Props {
  formData: BookFormData;
  onFieldChange: <K extends keyof BookFormData>(
    name: K,
    value: BookFormData[K]
  ) => void;
}

export const BasicInfoSection = ({ formData, onFieldChange }: Props) => (
  <div className="space-y-6">
    <SectionHeader title="Información Básica" icon={<BookOpen />} />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {BASIC_INFO_FIELDS.map((field) => (
        <FormInput
          key={field.name}
          label={field.label}
          type={field.type}
          required={field.required}
          value={formData[field.name]}
          onChange={(value) =>
            onFieldChange(field.name as keyof BookFormData, value as never)
          }
        />
      ))}
    </div>
    <FormTextarea
      label="Descripción"
      value={formData.description ?? ""}
      onChange={(value) => onFieldChange('description', value)}
    />
  </div>
);
