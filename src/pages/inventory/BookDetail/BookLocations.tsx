import { useEffect } from "react";
import { InfoRow } from "./InfoRow";
import { BookDTO } from "@/types/BookDTO";
import { useBookStore } from "@/stores/useBookStore";

interface Props {
  book: BookDTO;
}

// Función para agrupar ubicaciones por almacén y tipo de almacenamiento
const groupLocations = (locations: BookDTO["locations"]) => {
  if (!locations) return {};

  return locations.reduce((acc, loc) => {
    const warehouseName = loc.warehouse?.name ?? "Sin almacén";
    const storageType = loc.locationType ?? "Sin tipo";

    if (!acc[warehouseName]) acc[warehouseName] = {};
    if (!acc[warehouseName][storageType]) acc[warehouseName][storageType] = [];

    acc[warehouseName][storageType].push(loc);
    return acc;
  }, {} as Record<string, Record<string, typeof locations>>);
};

const BookAttributes = ({ book }: Props) => {
  const { editedBook, setEditedBook } = useBookStore();

  useEffect(() => {
    setEditedBook(book);
  }, [book, setEditedBook]);

  const groupedLocations = groupLocations(editedBook.locations ?? []);
  const className =
    "flex items-center justify-between py-2 border-b border-gray-100 group";

  return (
    <div className="space-y-4">
      {Object.keys(groupedLocations).length === 0 && (
        <p>No hay ubicaciones registradas</p>
      )}

      {Object.entries(groupedLocations).map(([warehouseName, storageTypes]) => (
        <div key={warehouseName} className="">
          <h3 className="text-lg font-semibold mb-2">{warehouseName}</h3>

          {Object.entries(storageTypes).map(([storageType, locations]) => (
            <div
              key={storageType}
              className="mb-4 p-3 bg-gray-50 rounded-md border border-gray-200"
            >
              <h4 className="font-medium mb-2">{storageType}</h4>

              {locations.map((location) => (
                <div
                  key={location.id}
                  className="mb-3 last:mb-0 border-b border-gray-300 pb-2"
                >
                  <InfoRow
                    className={className}
                    label="Condición"
                    value={location.bookCondition ?? "Sin condición"}
                  />
                  <InfoRow
                    className={className}
                    label="Estante"
                    value={location.bookcase ?? 0}
                  />
                  <InfoRow
                    className={className}
                    label="Piso"
                    value={location.bookcaseFloor ?? 0}
                  />
                  <InfoRow
                    className={className}
                    label="Stock"
                    value={location.stock ?? 0}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default BookAttributes;
