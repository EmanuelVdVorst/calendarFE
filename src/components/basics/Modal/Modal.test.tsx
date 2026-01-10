import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithoutProvider } from '../../../test/test-utils';
import { Modal } from './Modal';

describe('Modal', () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    children: <div>Modal Content</div>,
  };

  it('renders children when open', () => {
    renderWithoutProvider(<Modal {...defaultProps} />);

    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    renderWithoutProvider(<Modal {...defaultProps} isOpen={false} />);

    expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();
  });

  it('renders title when provided', () => {
    renderWithoutProvider(<Modal {...defaultProps} title="Test Title" />);

    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('does not render title when not provided', () => {
    renderWithoutProvider(<Modal {...defaultProps} />);

    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  });

  it('calls onClose when overlay is clicked', async () => {
    const onClose = vi.fn();
    const { user } = renderWithoutProvider(
      <Modal {...defaultProps} onClose={onClose} />
    );

    const overlay = screen.getByText('Modal Content').parentElement?.parentElement;
    if (overlay) {
      await user.click(overlay);
    }

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose when modal container is clicked', async () => {
    const onClose = vi.fn();
    const { user } = renderWithoutProvider(
      <Modal {...defaultProps} onClose={onClose} />
    );

    await user.click(screen.getByText('Modal Content'));

    expect(onClose).not.toHaveBeenCalled();
  });
});
