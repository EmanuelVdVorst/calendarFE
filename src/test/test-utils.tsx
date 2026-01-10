/* eslint-disable react-refresh/only-export-components */
import { render, type RenderOptions, type RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ReactElement, ReactNode } from 'react';
import { CalendarProvider } from '../context/CalendarContext';

interface WrapperProps {
  children: ReactNode;
}

function AllProviders({ children }: WrapperProps): ReactElement {
  return (
    <CalendarProvider>
      {children}
    </CalendarProvider>
  );
}

interface CustomRenderResult extends RenderResult {
  user: ReturnType<typeof userEvent.setup>;
}

function customRender(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
): CustomRenderResult {
  const user = userEvent.setup();
  return {
    user,
    ...render(ui, { wrapper: AllProviders, ...options }),
  };
}

function renderWithoutProvider(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
): CustomRenderResult {
  const user = userEvent.setup();
  return {
    user,
    ...render(ui, options),
  };
}

export * from '@testing-library/react';
export { customRender as render, renderWithoutProvider };
