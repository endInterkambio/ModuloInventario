import { useUpdateBook } from "@/hooks/useUpdateBooks";
import { useBookStore } from "@/stores/useBookStore";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const BookQuickActions = () => {
  const today = format(new Date(), "yyyy-MM-dd");
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState<string>("");

  const [discountType, setDiscountType] = useState<"%" | "S/.">("%");
  const [discountValue, setDiscountValue] = useState<string>("");
  const [calculatedOfferPrice, setCalculatedOfferPrice] = useState<
    number | null
  >(null);

  const { editedBook, setEditedBook } = useBookStore();
  const updateBookMutation = useUpdateBook();

  const originalPrice = editedBook.sellingPrice || 0;

  /** Recalcular precio de oferta en tiempo real */
  useEffect(() => {
    const value = parseFloat(discountValue);
    if (isNaN(value) || value < 0) {
      setCalculatedOfferPrice(null);
      return;
    }

    if (discountType === "%") {
      const discount = (originalPrice * value) / 100;
      setCalculatedOfferPrice(
        parseFloat((originalPrice - discount).toFixed(2))
      );
    } else {
      setCalculatedOfferPrice(parseFloat((originalPrice - value).toFixed(2)));
    }
  }, [discountValue, discountType, originalPrice]);

  /** Guardar precio de oferta */
  const handleApplyOfferPrice = async () => {
    const id = editedBook?.id;
    console.log(id);

    if (!id) {
      toast.error("No se encontró el libro actual en la store");
      return;
    }

    if (calculatedOfferPrice === null || calculatedOfferPrice < 0) {
      toast.error("El valor del descuento no es válido");
      return;
    }

    toast.promise(
      updateBookMutation.mutateAsync({
        id: editedBook.id as number,
        data: { offerPrice: calculatedOfferPrice },
      }),
      {
        loading: "Aplicando precio de oferta...",
        success: "Precio de oferta guardado correctamente",
        error: "Error al guardar el precio de oferta",
      }
    );

    setEditedBook({
      ...editedBook,
      offerPrice: calculatedOfferPrice,
    });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <h3 className="font-semibold text-gray-800 mb-3">Acciones rápidas</h3>
      <div className="space-y-2">
        {/* Toggle */}
        <label className="inline-flex items-center cursor-pointer">
          <input type="checkbox" value="" className="sr-only peer" />
          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          <span className="ms-3 text-sm font-medium text-gray-900">
            Activar precio de oferta
          </span>
        </label>

        {/* Fechas */}
        <div>
          <p className="ms-3 text-sm font-medium">Vigencia de la oferta</p>
          <div className="mt-1 grid grid-cols-2 gap-2">
            <input
              type="date"
              className="border border-gray-300 rounded-md px-2 py-1 text-sm w-full"
              value={startDate}
              onChange={(e) => {
                const newStart = e.target.value;
                setStartDate(newStart);
                if (endDate && endDate < newStart) setEndDate(newStart);
              }}
              min={today}
            />
            <input
              type="date"
              className="border border-gray-300 rounded-md px-2 py-1 text-sm w-full"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              min={startDate || today}
            />
          </div>
        </div>

        {/* Precio de oferta */}
        <div>
          <p className="ms-3 text-sm font-medium">Monto de descuento</p>
          <div className="mt-1">
            <div className="relative">
              <input
                type="number"
                className="border border-gray-300 rounded-md px-2 py-1 text-sm w-full ps-7 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                placeholder={
                  discountType === "%"
                    ? "Porcentaje de descuento"
                    : "Monto de descuento"
                }
                min="0"
                value={discountValue}
                onChange={(e) => setDiscountValue(e.target.value)}
              />
              <select
                value={discountType}
                onChange={(e) => setDiscountType(e.target.value as "%" | "S/.")}
                className="absolute top-1/2 -translate-y-1/2 end-1 bg-transparent border-none text-gray-500 text-sm pe-2 focus:outline-none"
              >
                <option value="%">%.</option>
                <option value="S/.">S/.</option>
              </select>
            </div>

            <div className="text-sm text-gray-500 mt-2">
              Precio original:{" "}
              <span className="line-through">
                S/. {originalPrice.toFixed(2)}
              </span>
            </div>

            {calculatedOfferPrice !== null && (
              <div className="text-sm text-green-600 font-medium mt-1">
                Nuevo precio: S/. {calculatedOfferPrice.toFixed(2)}
              </div>
            )}

            <div className="mt-3 flex justify-end">
              <button
                onClick={handleApplyOfferPrice}
                className="w-52 bg-green-600 text-white text-sm py-1 rounded-md hover:bg-green-700 transition"
              >
                Aplicar precio de oferta
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookQuickActions;
