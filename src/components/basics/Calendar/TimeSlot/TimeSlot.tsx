import type { ReactElement } from 'react';
import { StyledTimeSlot } from './TimeSlot.style';
import type { TimeSlotProps } from './TimeSlot.type';

export function TimeSlot({ date, hour, onClick }: TimeSlotProps): ReactElement {
  const handleClick = (): void => {
    onClick(date, hour);
  };

  return <StyledTimeSlot onClick={handleClick} data-testid="time-slot" />;
}
