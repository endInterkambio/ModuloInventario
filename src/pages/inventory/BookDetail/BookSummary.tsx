const BookSummary = () => (
  <div className="bg-white rounded-lg border border-gray-200 p-4">
    <h3 className="font-semibold text-gray-800 mb-3">Resumen de operación</h3>
    <div className="text-center py-4">
      <div className="text-2xl font-bold text-gray-400">0</div>
      <div className="text-sm text-gray-500">Sin actividad</div>
    </div>
    <div className="grid grid-cols-2 gap-4 mt-4">
      <div className="text-center">
        <div className="text-lg font-semibold text-gray-400">0</div>
        <div className="text-xs text-gray-500">Compras</div>
      </div>
      <div className="text-center">
        <div className="text-lg font-semibold text-gray-400">0</div>
        <div className="text-xs text-gray-500">Ventas</div>
      </div>
    </div>
  </div>
);

export default BookSummary;
