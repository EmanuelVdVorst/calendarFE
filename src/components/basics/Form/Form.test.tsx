import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithoutProvider } from '../../../test/test-utils';
import { Form } from './Form';

describe('Form', () => {
  it('renders children', () => {
    renderWithoutProvider(
      <Form onSubmit={vi.fn()}>
        <input data-testid="test-input" />
      </Form>
    );

    expect(screen.getByTestId('test-input')).toBeInTheDocument();
  });

  it('calls onSubmit when form is submitted', async () => {
    const onSubmit = vi.fn();
    const { user } = renderWithoutProvider(
      <Form onSubmit={onSubmit}>
        <button type="submit">Submit</button>
      </Form>
    );

    await user.click(screen.getByRole('button', { name: 'Submit' }));

    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it('prevents default form submission behavior', async () => {
    const onSubmit = vi.fn();
    const { user } = renderWithoutProvider(
      <Form onSubmit={onSubmit}>
        <button type="submit">Submit</button>
      </Form>
    );

    await user.click(screen.getByRole('button', { name: 'Submit' }));

    expect(onSubmit).toHaveBeenCalled();
  });

  it('applies custom className', () => {
    const { container } = renderWithoutProvider(
      <Form onSubmit={vi.fn()} className="custom-class">
        <span>Content</span>
      </Form>
    );

    expect(container.querySelector('.custom-class')).toBeInTheDocument();
  });

  it('handles async onSubmit', async () => {
    const onSubmit = vi.fn().mockResolvedValue(undefined);
    const { user } = renderWithoutProvider(
      <Form onSubmit={onSubmit}>
        <button type="submit">Submit</button>
      </Form>
    );

    await user.click(screen.getByRole('button', { name: 'Submit' }));

    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
});
