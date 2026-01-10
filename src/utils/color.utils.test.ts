import { describe, it, expect } from 'vitest';
import { darkenColor, lightenColor } from './color.utils';

describe('darkenColor', () => {
  it('darkens a color by the specified percentage', () => {
    const result = darkenColor('#FFFFFF', 50);

    expect(result).toBe('#7f7f7f');
  });

  it('returns black for 100% darkening', () => {
    const result = darkenColor('#FF6B6B', 100);

    expect(result).toBe('#000000');
  });

  it('returns original color for 0% darkening', () => {
    const result = darkenColor('#FF6B6B', 0);

    expect(result).toBe('#ff6b6b');
  });

  it('handles color without # prefix', () => {
    const result = darkenColor('FF0000', 50);

    expect(result).toBe('#7f0000');
  });

  it('darkens individual RGB channels correctly', () => {
    const result = darkenColor('#FF0000', 50); // Red

    expect(result).toBe('#7f0000');
  });
});

describe('lightenColor', () => {
  it('lightens a color by the specified percentage', () => {
    const result = lightenColor('#000000', 50);

    expect(result).toBe('#7f7f7f');
  });

  it('returns white for 100% lightening', () => {
    const result = lightenColor('#000000', 100);

    expect(result).toBe('#ffffff');
  });

  it('returns original color for 0% lightening', () => {
    const result = lightenColor('#FF6B6B', 0);

    expect(result).toBe('#ff6b6b');
  });

  it('handles color without # prefix', () => {
    const result = lightenColor('000000', 50);

    expect(result).toBe('#7f7f7f');
  });

  it('lightens a dark color correctly', () => {
    const result = lightenColor('#333333', 50);

    // Should be lighter than original
    const r = parseInt(result.substring(1, 3), 16);
    expect(r).toBeGreaterThan(0x33);
  });
});
