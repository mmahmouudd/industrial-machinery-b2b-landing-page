export function formatCurrency(value: number, fraction = 0) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: fraction,
    minimumFractionDigits: fraction,
  }).format(value);
}

export function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

export function leadTimeLabel(days: number) {
  if (days <= 7) return "Ships in 5–7 days";
  if (days <= 21) return `${days} day lead`;
  if (days <= 45) return `${Math.round(days / 7)} week lead`;
  return `${Math.round(days / 30)} month lead`;
}
