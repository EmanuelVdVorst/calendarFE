/**
 * Darkens a hex color by a given percentage
 * @param hex - Hex color string (e.g., "#FF6B6B")
 * @param percent - Percentage to darken (0-100)
 * @returns Darkened hex color
 */
export function darkenColor(hex: string, percent: number): string {
  // Remove the # if present
  const color = hex.replace('#', '');

  // Parse RGB values
  const r = parseInt(color.substring(0, 2), 16);
  const g = parseInt(color.substring(2, 4), 16);
  const b = parseInt(color.substring(4, 6), 16);

  // Darken by percentage
  const darkenValue = (value: number): number => {
    return Math.max(0, Math.floor(value * (1 - percent / 100)));
  };

  const newR = darkenValue(r);
  const newG = darkenValue(g);
  const newB = darkenValue(b);

  // Convert back to hex
  return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
}

/**
 * Lightens a hex color by a given percentage
 * @param hex - Hex color string (e.g., "#FF6B6B")
 * @param percent - Percentage to lighten (0-100)
 * @returns Lightened hex color
 */
export function lightenColor(hex: string, percent: number): string {
  // Remove the # if present
  const color = hex.replace('#', '');

  // Parse RGB values
  const r = parseInt(color.substring(0, 2), 16);
  const g = parseInt(color.substring(2, 4), 16);
  const b = parseInt(color.substring(4, 6), 16);

  // Lighten by percentage
  const lightenValue = (value: number): number => {
    return Math.min(255, Math.floor(value + (255 - value) * (percent / 100)));
  };

  const newR = lightenValue(r);
  const newG = lightenValue(g);
  const newB = lightenValue(b);

  // Convert back to hex
  return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
}
