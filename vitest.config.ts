import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
    exclude: ['node_modules', 'dist', 'e2e'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/**/*.test.{ts,tsx}',
        'src/**/*.type.ts',
        'src/**/*.style.ts',
        'src/vite-env.d.ts',
        'src/main.tsx',
        'src/api/schema.d.ts',
      ],
      thresholds: {
        // Minimum coverage thresholds - increase these as coverage improves
        statements: 30,
        branches: 25,
        functions: 35,
        lines: 30,
      },
    },
  },
});
