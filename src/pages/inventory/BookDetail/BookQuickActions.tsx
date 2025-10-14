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

  const { editedBook, setEditedBook } = useBookStore();
  const isOfferActive = editedBook.isOfferActive ?? false;
  const updateBookMutation = useUpdateBook();

  const [calculatedOfferPrice, setCalculatedOfferPrice] = useState<
    number | null
  >(null);

  const originalPrice = editedBook.sellingPrice || 0;

  /** Recalcular precio de oferta en tiempo real */
  useEffect(() => {
    const value = parseFloat(discountValue);

    // Validar valores de entrada
    if (isNaN(value)) {
      setCalculatedOfferPrice(null);
      return;
    }

    if (value < 0) {
      toast.error("El descuento no puede ser negativo");
      setCalculatedOfferPrice(null);
      return;
    }

    if (!originalPrice || originalPrice <= 0) {
      toast.error("El precio original no es válido");
      setCalculatedOfferPrice(null);
      return;
    }

    let newOfferPrice = originalPrice;

    if (discountType === "%") {
      // No permitir más del 100%
      if (value > 100) {
        toast.error("El descuento no puede superar el 100%");
        setCalculatedOfferPrice(null);
        return;
      }

      const discount = (originalPrice * value) / 100;
      newOfferPrice = originalPrice - discount;
    } else {
      // No permitir que el descuento supere el precio original
      if (value > originalPrice) {
        toast.error("El descuento no puede ser mayor al precio original");
        setCalculatedOfferPrice(null);
        return;
      }

      newOfferPrice = originalPrice - value;
    }

    // Prevenir precios negativos o NaN
    if (isNaN(newOfferPrice) || newOfferPrice < 0) {
      toast.error("El precio resultante no es válido");
      setCalculatedOfferPrice(null);
      return;
    }

    // 🔹 Asignar el precio calculado con 2 decimales
    setCalculatedOfferPrice(parseFloat(newOfferPrice.toFixed(2)));
  }, [discountValue, discountType, originalPrice]);

  /** Aplicar precio de oferta */
  const handleApplyOfferPrice = async () => {
    if (!editedBook?.id) {
      toast.error("No se encontró el libro actual");
      return;
    }

    if (calculatedOfferPrice === null || calculatedOfferPrice < 0) {
      toast.error("El valor del descuento no es válido");
      return;
    }

    toast.promise(
      updateBookMutation.mutateAsync({
        id: editedBook.id,
        data: {
          offerPrice: calculatedOfferPrice,
          offerStartDate: startDate,
          offerEndDate: endDate,
          isOfferActive: true, // activar automáticamente
        },
      }),
      {
        loading: "Aplicando precio de oferta...",
        success: "Precio de oferta activado correctamente",
        error: "Error al guardar el precio de oferta",
      }
    );

    setEditedBook({
      ...editedBook,
      offerPrice: calculatedOfferPrice,
      offerStartDate: startDate,
      offerEndDate: endDate,
      isOfferActive: true,
    });
  };

  /** Activar o desactivar manualmente */
  const handleToggleOffer = async () => {
    if (!editedBook?.id) return;

    const newStatus = !isOfferActive;
    setEditedBook({ ...editedBook, isOfferActive: newStatus });

    toast.promise(
      updateBookMutation.mutateAsync({
        id: editedBook.id,
        data: { isOfferActive: newStatus },
      }),
      {
        loading: newStatus ? "Activando oferta..." : "Desactivando oferta...",
        success: newStatus ? "Oferta activada" : "Oferta desactivada",
        error: "Error al actualizar estado de la oferta",
      }
    );
  };

  /** Habilitar edición nuevamente */
  const handleEditOffer = async () => {
    if (!editedBook?.id) return;

    setEditedBook({ ...editedBook, isOfferActive: false });

    toast.promise(
      updateBookMutation.mutateAsync({
        id: editedBook.id,
        data: { isOfferActive: false },
      }),
      {
        loading: "Habilitando edición...",
        success: "Campos de oferta habilitados",
        error: "Error al habilitar la edición",
      }
    );
  };

  const hasActiveOffer =
    isOfferActive && editedBook.offerEndDate && editedBook.offerPrice;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <h3 className="font-semibold text-gray-800 mb-3">Acciones rápidas</h3>

      {/* Toggle */}
      <label className="inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={isOfferActive}
          onChange={handleToggleOffer}
        />
        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        <span className="ms-3 text-sm font-medium text-gray-900">
          Activar precio de oferta
        </span>
      </label>

      {/* Si la oferta está activa */}
      {hasActiveOffer ? (
        <div className="mt-3 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            <p className="font-bold">Oferta activa hasta:</p>
            <p>
              {editedBook.offerEndDate
                ? editedBook.offerEndDate
                    .slice(0, 10)
                    .split("-")
                    .reverse()
                    .join("/")
                : "-"}
            </p>
          </div>
          <button
            onClick={handleEditOffer}
            className="bg-primary text-white text-sm py-1 px-3 rounded-md hover:bg-green-700 transition"
          >
            Editar
          </button>
        </div>
      ) : (
        <>
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
          <div className="mt-2">
            <p className="ms-3 text-sm font-medium">Monto de descuento</p>
            <div className="mt-1">
              <div className="relative">
                <input
                  type="number"
                  className="border border-gray-300 rounded-md px-2 py-1 text-sm w-full ps-7"
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
                  onChange={(e) =>
                    setDiscountType(e.target.value as "%" | "S/.")
                  }
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

              <div className="mt-3 flex justify-end items-center gap-4">
                <div className="grid columns-2">
                  <p className="font-bold">Oferta vigente:</p>
                  <p className="font-bold">Precio:</p>
                </div>
                <div className="grid columns-2">
                  <p>
                    {editedBook.offerEndDate
                      ? editedBook.offerEndDate
                          .slice(0, 10)
                          .split("-")
                          .reverse()
                          .join("/")
                      : "-"}
                  </p>
                  <p>{editedBook.offerPrice} </p>
                </div>

                <button
                  onClick={handleApplyOfferPrice}
                  className="w-32 bg-green-600 text-white text-sm py-1 rounded-md hover:bg-green-700 transition"
                >
                  Aplicar precio de oferta
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BookQuickActions;
