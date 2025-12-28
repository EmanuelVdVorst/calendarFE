import styled from 'styled-components';
import type { CalendarEvent } from '../../types/calendar.types';
import { formatEventTime } from '../../utils/event.utils';

interface EventBlockProps {
  event: CalendarEvent;
  top: number;
  height: number;
  column: number;
}

interface BlockContainerProps {
  $top: number;
  $height: number;
  $column: number;
  $color: string;
}

const BlockContainer = styled.div<BlockContainerProps>`
  position: absolute;
  top: ${props => props.$top}px;
  height: ${props => Math.max(props.$height, 20)}px;
  left: calc((100% - 60px) / 7 * ${props => props.$column} + 60px + 2px);
  width: calc((100% - 60px) / 7 - 4px);
  background-color: ${props => props.$color};
  border-left: 3px solid ${props => darkenColor(props.$color, 20)};
  border-radius: 4px;
  padding: 4px 8px;
  overflow: hidden;
  cursor: pointer;
  z-index: 10;
  transition: transform 0.1s ease, box-shadow 0.1s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    z-index: 20;
  }
`;

const EventTitle = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: #FFFFFF;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 2px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
`;

const EventTime = styled.div`
  font-size: 10px;
  color: rgba(255, 255, 255, 0.9);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
`;

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

function EventBlock({ event, top, height, column }: EventBlockProps): JSX.Element {
  const timeString = formatEventTime(event);

  return (
    <BlockContainer
      $top={top}
      $height={height}
      $column={column}
      $color={event.color}
    >
      <EventTitle>{event.title}</EventTitle>
      {height > 30 && <EventTime>{timeString}</EventTime>}
    </BlockContainer>
  );
}

export default EventBlock;
