const SortMenu: React.FC = () => (
  <div className="absolute right-full top-0 ml-1 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-20">
    <div className="py-1">
      {[
        "Nombre",
        "SKU (Código de artículo)",
        "Existencias a mano",
        "Tasa",
        "Hora de creación",
        "Hora de última modificación",
      ].map((label, index) => (
        <button
          key={index}
          className={`flex items-center gap-3 w-full px-4 py-2 text-sm ${
            label === "Existencias a mano"
              ? "text-white bg-blue-500"
              : "text-gray-700 hover:bg-blue-50"
          }`}
        >
          <span>{label}</span>
        </button>
      ))}
    </div>
  </div>
);

export default SortMenu;
