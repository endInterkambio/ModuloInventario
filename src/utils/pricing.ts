export function applyDiscount(
  price: number,
  discount?: { type: "PERCENT" | "AMOUNT"; value: number }
): number {
  if (!discount || !discount.value) return price;

  if (discount.type === "PERCENT") {
    return price * (1 - discount.value / 100);
  }

  if (discount.type === "AMOUNT") {
    return price - discount.value;
  }

  return price;
}
