import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./setupTests.ts'],
    include: ['**/*.{test,spec}.{js,ts,jsx,tsx}'],
    coverage: {
      reporter: ['text', 'html'],
    },
  },
}); 