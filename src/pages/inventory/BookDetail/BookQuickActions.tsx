const BookQuickActions = () => (
  <div className="bg-white rounded-lg border border-gray-200 p-4">
    <h3 className="font-semibold text-gray-800 mb-3">Acciones rápidas</h3>
    <div className="space-y-2">
      <button className="w-full text-left px-3 py-2 text-sm text-purple-600 hover:bg-purple-50 rounded-md transition-colors">
        Ver estadísticas
      </button>
      <button className="w-full text-left px-3 py-2 text-sm text-orange-600 hover:bg-orange-50 rounded-md transition-colors">
        Editar información
      </button>
    </div>
  </div>
);

export default BookQuickActions;
