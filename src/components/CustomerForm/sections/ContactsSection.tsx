import { Input } from "../ui/Input";
import { FormData } from "../types/FormData";

interface Props {
  contacts?: FormData["contacts"];
  addContact: () => void;
  updateContact: (
    index: number,
    updated: Partial<{ name: string; email: string; phoneNumber: string }>
  ) => void;
  removeContact: (index: number) => void;
}

export default function ContactsSection({
  contacts = [],
  addContact,
  updateContact,
  removeContact,
}: Props) {
  return (
    <div className="space-y-6">
      <h3 className="py-4 text-lg font-medium text-gray-900">
        Personas de contacto
      </h3>

      {contacts.map((c, i) => (
        <div
          key={i}
          className="border rounded-lg p-4 space-y-4 relative bg-gray-50"
        >
          <button
            type="button"
            className="absolute top-2 right-2 text-red-500"
            onClick={() => removeContact(i)}
          >
            ✕
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nombre completo
              </label>
              <Input
                value={c.name}
                onChange={(val) => updateContact(i, { name: val })}
                placeholder="Ejemplo: Juan Pérez"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Correo electrónico
              </label>
              <Input
                type="email"
                value={c.email}
                onChange={(val) => updateContact(i, { email: val })}
                placeholder="correo@ejemplo.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Teléfono
            </label>
            <Input
              value={c.phoneNumber}
              onChange={(val) => updateContact(i, { phoneNumber: val })}
              placeholder="Ejemplo: 987654321"
            />
          </div>
        </div>
      ))}

      {/* Botón para añadir contacto */}
      <div className="flex items-center space-x-2 text-blue-600">
        <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
          <span className="text-white text-xs font-bold">+</span>
        </div>
        <button
          type="button"
          className="text-sm font-medium hover:text-blue-800"
          onClick={addContact}
        >
          Añadir persona de contacto
        </button>
      </div>
    </div>
  );
}
