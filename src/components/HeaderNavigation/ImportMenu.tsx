interface ImportMenuProps {
  handleImport: (file: File) => void;
}

const ImportMenu: React.FC<ImportMenuProps> = ({ handleImport }) => (
  <div className="absolute right-full top-0 ml-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-20">
    <div className="py-1">
      <label
        htmlFor="import-file"
        className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 cursor-pointer"
      >
        <span>Importar libros</span>
        <input
          type="file"
          id="import-file"
          accept=".csv,.xlsx"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleImport(file);
          }}
        />
      </label>
    </div>
  </div>
);

export default ImportMenu;
