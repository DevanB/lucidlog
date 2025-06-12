import { render } from '@testing-library/react';

const AllProviders = ({ children }: { children: React.ReactNode }) => children;

const customRender = (ui: React.ReactElement, options = {}) =>
  render(ui, { wrapper: AllProviders, ...options });

export * from '@testing-library/react';
export { customRender as render }; 