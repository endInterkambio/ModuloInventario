import { Input } from "../ui/Input";

export default function ContactsSection() {
  return (
    <div className="space-y-6">
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        {/* Header de la tabla */}
        <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
          <div className="grid grid-cols-6 gap-4 text-sm font-medium text-gray-700">
            <div>NOMBRE</div>
            <div>APELLIDO</div>
            <div>DIRECCIÓN DE CORREO ELECTRÓNICO</div>
            <div>TELÉFONO LABORAL</div>
            <div>MÓVIL</div>
          </div>
        </div>

        {/* Fila de entrada */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="grid grid-cols-6 gap-4">
            <Input value="" onChange={() => {}} placeholder="" />
            <Input value="" onChange={() => {}} placeholder="" />
            <Input type="email" value="" onChange={() => {}} placeholder="" />
            <Input value="" onChange={() => {}} placeholder="" />
            <div className="flex items-center space-x-2">
              <Input
                value=""
                onChange={() => {}}
                placeholder=""
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
