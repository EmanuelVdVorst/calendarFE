import type { ReactElement } from 'react';
import { StyledDayHeader, StyledDayName, StyledDayNumber } from './DayHeaderCell.style';
import type { DayHeaderCellProps } from './DayHeaderCell.type';

export function DayHeaderCell({ dayName, dayNumber, isToday }: DayHeaderCellProps): ReactElement {
  return (
    <StyledDayHeader $isToday={isToday}>
      <StyledDayName $isToday={isToday}>{dayName}</StyledDayName>
      <StyledDayNumber $isToday={isToday}>{dayNumber}</StyledDayNumber>
    </StyledDayHeader>
  );
}
