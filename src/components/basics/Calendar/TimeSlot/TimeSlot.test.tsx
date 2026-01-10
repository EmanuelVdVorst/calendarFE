import { describe, it, expect, vi } from 'vitest';
import { renderWithoutProvider } from '../../../../test/test-utils';
import { TimeSlot } from './TimeSlot';

describe('TimeSlot', () => {
  const defaultProps = {
    date: new Date('2024-01-15'),
    hour: 9,
    onClick: vi.fn(),
  };

  it('renders a time slot element', () => {
    const { container } = renderWithoutProvider(<TimeSlot {...defaultProps} />);

    expect(container.firstChild).toBeInTheDocument();
  });

  it('calls onClick with date and hour when clicked', async () => {
    const onClick = vi.fn();
    const date = new Date('2024-01-15');
    const { user, container } = renderWithoutProvider(
      <TimeSlot date={date} hour={10} onClick={onClick} />
    );

    await user.click(container.firstChild as Element);

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledWith(date, 10);
  });

  it('handles different hours correctly', async () => {
    const onClick = vi.fn();
    const date = new Date('2024-01-15');
    const { user, container } = renderWithoutProvider(
      <TimeSlot date={date} hour={14} onClick={onClick} />
    );

    await user.click(container.firstChild as Element);

    expect(onClick).toHaveBeenCalledWith(date, 14);
  });

  it('handles different dates correctly', async () => {
    const onClick = vi.fn();
    const date = new Date('2024-06-20');
    const { user, container } = renderWithoutProvider(
      <TimeSlot date={date} hour={8} onClick={onClick} />
    );

    await user.click(container.firstChild as Element);

    expect(onClick).toHaveBeenCalledWith(date, 8);
  });
});
