import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    poolOptions: {
      forks: {
        singleFork: true,
      },
    },
    sequence: {
      concurrent: false,
    },
    environment: 'jsdom',
    globals: true,
    globalSetup: './vitest.globalSetup.ts',
    setupFiles: ['./vitest.setupTests.ts'],
    include: ['**/*.{test,spec}.{js,ts,jsx,tsx}'],
    coverage: {
      reporter: ['text', 'html'],
    },
  },
}); 