import type { ReactElement } from 'react';
import { useCalendar } from '../../hooks/useCalendar';
import { formatTime } from '../../utils/date.utils';
import { calculateEventPosition } from '../../utils/event.utils';
import { weekGrid } from '../basics/Styles';
import { TimeSlot } from '../basics/Calendar';
import { EventBlock } from '../EventBlock';
import { GridWrapper, GridContainer, TimeLabel, HourRow } from './TimeGrid.style';
import type { TimeGridProps } from './TimeGrid.type';

export function TimeGrid({ onSlotClick, onEventClick }: TimeGridProps): ReactElement {
  const { currentWeek, getEventsForWeek } = useCalendar();

  // Generate hours from grid configuration
  const hours = Array.from(
    { length: weekGrid.endHour - weekGrid.startHour },
    (_, i) => weekGrid.startHour + i
  );

  // Get events for current week
  const weekEvents = getEventsForWeek(currentWeek);

  return (
    <GridWrapper>
      <GridContainer>
        {hours.map(hour => (
          <HourRow key={`hour-${hour}`}>
            <TimeLabel>{formatTime(hour)}</TimeLabel>
            {currentWeek.days.map((day) => (
              <TimeSlot
                key={`slot-${hour}-${day.toISOString()}`}
                date={day}
                hour={hour}
                onClick={onSlotClick}
              />
            ))}
          </HourRow>
        ))}
      </GridContainer>
      {/* Render events as positioned blocks */}
      {weekEvents.map(event => {
        const position = calculateEventPosition(event);
        return (
          <EventBlock
            key={event.id}
            event={event}
            top={position.top}
            height={position.height}
            column={position.column}
            onClick={onEventClick}
          />
        );
      })}
    </GridWrapper>
  );
}
