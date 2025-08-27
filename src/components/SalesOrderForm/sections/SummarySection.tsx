type Props = {
  subtotal: number;
  shippingCost: number | "";
  chargeDiscountCost: number | "";
  total: number;
  onShippingCostChange: (value: number | "") => void;
  onChargeDiscountChange: (value: number | "") => void;
};

export function SummarySection({
  subtotal,
  shippingCost,
  chargeDiscountCost,
  total,
  onShippingCostChange,
  onChargeDiscountChange,
}: Props) {
  return (
    <div className="flex justify-end mb-6">
      <div className="w-80 space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm">Subtotal</span>
          <span className="text-sm font-medium">{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm">Cargo de envío</span>
          <div className="w-20">
            <input
              type="number"
              value={shippingCost}
              onChange={(e) => {
                const val = e.target.value;
                onShippingCostChange(val === "" ? "" : parseFloat(val));
              }}
              className="border border-gray-300 rounded px-2 py-1 text-sm text-right"
            />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm">Cargo adicional / Descuento</span>
          <div className="w-20">
            <input
              type="number"
              value={chargeDiscountCost}
              onChange={(e) => {
                const val = e.target.value;
                onChargeDiscountChange(val === "" ? "" : parseFloat(val));
              }}
              className="border border-gray-300 rounded px-2 py-1 text-sm text-right"
            />
          </div>
        </div>
        <div className="border-t pt-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Total (S/.)</span>
            <span className="text-lg font-bold">{total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
