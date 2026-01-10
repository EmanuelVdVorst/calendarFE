import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithoutProvider } from '../../../../test/test-utils';
import { DayHeaderCell } from './DayHeaderCell';

describe('DayHeaderCell', () => {
  const defaultProps = {
    dayName: 'Monday',
    dayNumber: 15,
    isToday: false,
  };

  it('renders the day name', () => {
    renderWithoutProvider(<DayHeaderCell {...defaultProps} />);

    expect(screen.getByText('Monday')).toBeInTheDocument();
  });

  it('renders the day number', () => {
    renderWithoutProvider(<DayHeaderCell {...defaultProps} />);

    expect(screen.getByText('15')).toBeInTheDocument();
  });

  it('renders correctly when it is today', () => {
    renderWithoutProvider(<DayHeaderCell {...defaultProps} isToday />);

    expect(screen.getByText('Monday')).toBeInTheDocument();
    expect(screen.getByText('15')).toBeInTheDocument();
  });

  it('renders different day names', () => {
    renderWithoutProvider(<DayHeaderCell dayName="Friday" dayNumber={20} isToday={false} />);

    expect(screen.getByText('Friday')).toBeInTheDocument();
    expect(screen.getByText('20')).toBeInTheDocument();
  });

  it('renders single digit day numbers', () => {
    renderWithoutProvider(<DayHeaderCell dayName="Sunday" dayNumber={5} isToday={false} />);

    expect(screen.getByText('5')).toBeInTheDocument();
  });
});
