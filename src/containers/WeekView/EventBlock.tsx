import styled from 'styled-components';
import type { CalendarEvent } from '../../types/calendar.types';
import { formatEventTime } from '../../utils/event.utils';

interface EventBlockProps {
  event: CalendarEvent;
  top: number;
  height: number;
  column: number;
  onClick: (event: CalendarEvent) => void;
}

interface BlockContainerProps {
  $top: number;
  $height: number;
  $column: number;
  $color: string;
}

const BlockContainer = styled.div<BlockContainerProps>((props) => ({
  position: 'absolute',
  top: `${props.$top}px`,
  height: `${Math.max(props.$height, 20)}px`,
  left: `calc((100% - 60px) / 7 * ${props.$column} + 60px + 2px)`,
  width: 'calc((100% - 60px) / 7 - 4px)',
  backgroundColor: props.$color,
  borderLeft: `3px solid ${darkenColor(props.$color, 20)}`,
  borderRadius: '4px',
  padding: '4px 8px',
  overflow: 'hidden',
  cursor: 'pointer',
  zIndex: 10,
  transition: 'transform 0.1s ease, box-shadow 0.1s ease',

  '&:hover': {
    transform: 'translateY(-1px)',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
    zIndex: 20,
  },
}));

const EventTitle = styled.div({
  fontSize: '12px',
  fontWeight: 600,
  color: '#FFFFFF',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  marginBottom: '2px',
  textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
});

const EventTime = styled.div({
  fontSize: '10px',
  color: 'rgba(255, 255, 255, 0.9)',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
});

function darkenColor(hex: string, percent: number): string {
  // Remove the # if present
  const color = hex.replace('#', '');

  // Parse RGB values
  const r = parseInt(color.substring(0, 2), 16);
  const g = parseInt(color.substring(2, 4), 16);
  const b = parseInt(color.substring(4, 6), 16);

  // Darken by percentage
  const darkenValue = (value: number): number => {
    return Math.max(0, Math.floor(value * (1 - percent / 100)));
  };

  const newR = darkenValue(r);
  const newG = darkenValue(g);
  const newB = darkenValue(b);

  // Convert back to hex
  return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
}

function EventBlock({ event, top, height, column, onClick }: EventBlockProps): JSX.Element {
  const timeString = formatEventTime(event);

  const handleClick = (e: React.MouseEvent): void => {
    e.stopPropagation();
    onClick(event);
  };

  return (
    <BlockContainer
      $top={top}
      $height={height}
      $column={column}
      $color={event.color}
      onClick={handleClick}
    >
      <EventTitle>{event.title}</EventTitle>
      {height > 30 && <EventTime>{timeString}</EventTime>}
    </BlockContainer>
  );
}

export default EventBlock;
