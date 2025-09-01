import type { LucideIcon } from 'lucide-react';
import { BookOpen, Save } from 'lucide-react';
import type { BookDTO } from '@/types/BookDTO';

// Secciones válidas
export type FormSectionId = 'basic' | 'pricing' | 'inventory';

// DTO que realmente usamos en el formulario (sin metadatos del backend)
export type BookFormData = Omit<
  BookDTO,
  'id' | 'createdAt' | 'updatedAt' | 'createdBy' | 'updatedBy'
>;

// Para tipar con seguridad los "name" de los inputs
export type InputFieldName = Exclude<keyof BookFormData, 'locations'>;

// Definición de un campo de formulario
export interface FormField {
  name: InputFieldName;
  label: string;
  type: 'text' | 'number' | 'url';
  required?: boolean;
  step?: string;
  min?: string;
}

// Mantén referencia al componente (no JSX) y tipa con LucideIcon
export const FORM_SECTIONS: ReadonlyArray<{
  id: FormSectionId;
  title: string;
  icon: LucideIcon;
}> = [
  { id: 'basic', title: 'Información Básica', icon: BookOpen },
  { id: 'pricing', title: 'Precios', icon: Save },
  // { id: 'inventory', title: 'Inventario', icon: Plus },
] as const;

// Campos por sección
export const BASIC_INFO_FIELDS: ReadonlyArray<FormField> = [
  { name: 'sku', label: 'SKU', type: 'text', required: true },
  { name: 'title', label: 'Título', type: 'text', required: true },
  { name: 'isbn', label: 'ISBN', type: 'text', required: true },
  { name: 'author', label: 'Autor', type: 'text', required: true },
  { name: 'publisher', label: 'Editorial', type: 'text', required: true },
  { name: 'language', label: 'Idioma', type: 'text', required: true },
  { name: 'categories', label: 'Categorías', type: 'text' },
  { name: 'subjects', label: 'Temas', type: 'text' },
  { name: 'formats', label: 'Formato', type: 'text' },
  { name: 'tag', label: 'Etiqueta', type: 'text' },
  { name: 'filter', label: 'Filtro', type: 'text' },
  { name: 'productSaleType', label: 'Tipo de producto', type: 'text' },
  { name: 'imageUrl', label: 'URL de Imagen', type: 'url' },
  { name: 'websiteUrl', label: 'URL del Sitio Web', type: 'url' },
] as const;

export const PRICING_FIELDS: ReadonlyArray<FormField> = [
  { name: 'coverPrice', label: 'Precio de Portada', type: 'number', step: '0.01', min: '0' },
  { name: 'purchasePrice', label: 'Precio de Compra', type: 'number', step: '0.01', min: '0' },
  { name: 'sellingPrice', label: 'Precio de Venta', type: 'number', step: '0.01', min: '0' },
  { name: 'fairPrice', label: 'Precio de Feria', type: 'number', step: '0.01', min: '0' },
] as const;
