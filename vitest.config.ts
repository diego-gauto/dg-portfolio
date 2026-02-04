import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'happy-dom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*'],
      exclude: [
        'node_modules/**',
        'src/app/layout.tsx',
        'src/app/page.tsx',
        'src/**/*.test.{ts,tsx}',
        'src/**/*.module.css',
        'src/types/**',
        'src/app/casos/page.tsx', // Placeholder if exists
      ],
      thresholds: {
        lines: 100,
        functions: 100,
        branches: 100,
        statements: 100,
      },
    },
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
