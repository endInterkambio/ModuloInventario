export default function FileUploadSection() {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-sm text-gray-700 font-medium">
          Adjuntar archivo(s) a Orden de venta
        </span>
      </div>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
        <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mb-2">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          <span>Cargar archivo</span>
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
        <p className="text-xs text-gray-500">
          Puede cargar un máximo de 10 archivos, cada uno de 5 MB
        </p>
      </div>
    </div>
  );
}
