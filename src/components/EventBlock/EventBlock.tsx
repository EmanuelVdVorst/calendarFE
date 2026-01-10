import type { ReactElement, MouseEvent } from 'react';
import type { EventBlockProps } from './EventBlock.type';
import { formatEventTime } from '../../utils/event.utils';
import { darkenColor } from '../../utils/color.utils';
import { BlockContainer, EventTitle, EventTime } from './EventBlock.style';

export function EventBlock({ event, top, height, column, onClick }: EventBlockProps): ReactElement {
  const timeString = formatEventTime(event);
  const borderColor = darkenColor(event.color, 20);

  const handleClick = (e: MouseEvent): void => {
    e.stopPropagation();
    onClick(event);
  };

  return (
    <BlockContainer
      $top={top}
      $height={height}
      $column={column}
      $color={event.color}
      $borderColor={borderColor}
      onClick={handleClick}
      data-testid="event-block"
    >
      <EventTitle>{event.title}</EventTitle>
      {height > 30 && <EventTime>{timeString}</EventTime>}
    </BlockContainer>
  );
}
