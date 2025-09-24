import { Input } from "../ui/Input";

export default function ContactsSection() {
  return (
    <div className="space-y-6">
      {/* Datos de contacto */}
      <div>
          <h3 className="py-4 pb-4 text-lg font-medium text-gray-900">Datos de contacto</h3>
        </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nombre
          </label>
          <Input value="" onChange={() => {}} placeholder="Ingrese nombre" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Apellido
          </label>
          <Input value="" onChange={() => {}} placeholder="Ingrese apellido" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Dirección de correo electrónico
          </label>
          <Input
            type="email"
            value=""
            onChange={() => {}}
            placeholder="correo@ejemplo.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Teléfono laboral
          </label>
          <Input value="" onChange={() => {}} placeholder="000-000-000" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Móvil</label>
        <div className="flex items-center space-x-2">
          <Input
            value=""
            onChange={() => {}}
            placeholder="Ingrese móvil"
            className="flex-1"
          />
          <button
            type="button"
            className="text-gray-400 hover:text-gray-600"
          >
            <span className="text-lg">⋯</span>
          </button>
        </div>
      </div>

      {/* Botón para añadir persona */}
      <div className="flex items-center space-x-2 text-blue-600">
        <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
          <span className="text-white text-xs font-bold">+</span>
        </div>
        <button
          type="button"
          className="text-sm font-medium hover:text-blue-800"
          onClick={() => console.log("Añadir persona de contacto")}
        >
          Añadir persona de contacto
        </button>
      </div>
    </div>
  );
}
