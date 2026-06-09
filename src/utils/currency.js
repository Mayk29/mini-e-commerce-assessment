/**
 * CellWego Currency Formatter
 * Single source of truth for PHP price display across the entire app.
 */
const phpFormatter = new Intl.NumberFormat('en-PH', {
  style: 'currency',
  currency: 'PHP',
  minimumFractionDigits: 0,
});

/**
 * Format a numeric price as Philippine Peso.
 * @param {number} price
 * @returns {string}  e.g. "₱45,490"
 */
export function formatPHP(price) {
  return phpFormatter.format(price);
}
