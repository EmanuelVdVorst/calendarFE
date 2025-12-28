import styled from 'styled-components';
import { useCalendar } from '../../hooks/useCalendar';
import { formatDayHeader } from '../../utils/date.utils';
import { formatEventTime } from '../../utils/event.utils';

const UpcomingEventsContainer = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const Title = styled.h3`
  font-size: 14px;
  font-weight: 600;
  color: #000;
  margin: 0 0 12px 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const EventsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const EventItem = styled.div`
  padding: 10px;
  background-color: #FFFFFF;
  border-radius: 6px;
  border-left: 3px solid;
  border-left-color: ${props => props.color};
  cursor: pointer;
  transition: transform 0.1s ease, box-shadow 0.1s ease;

  &:hover {
    transform: translateX(2px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

const EventDate = styled.div`
  font-size: 11px;
  font-weight: 600;
  color: #666;
  margin-bottom: 4px;
  text-transform: uppercase;
`;

const EventTitle = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: #000;
  margin-bottom: 2px;
`;

const EventTime = styled.div`
  font-size: 11px;
  color: #666;
`;

const EmptyState = styled.div`
  padding: 20px 12px;
  text-align: center;
  color: #999;
  font-size: 13px;
`;

function UpcomingEvents(): JSX.Element {
  const { events } = useCalendar();

  // Filter events from today onward and sort by start time
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingEvents = events
    .filter(event => event.start >= today)
    .sort((a, b) => a.start.getTime() - b.start.getTime())
    .slice(0, 10); // Limit to 10 events

  return (
    <UpcomingEventsContainer>
      <Title>Upcoming Events</Title>
      {upcomingEvents.length === 0 ? (
        <EmptyState>No upcoming events</EmptyState>
      ) : (
        <EventsList>
          {upcomingEvents.map(event => (
            <EventItem key={event.id} color={event.color}>
              <EventDate>{formatDayHeader(event.start)}</EventDate>
              <EventTitle>{event.title}</EventTitle>
              <EventTime>{formatEventTime(event)}</EventTime>
            </EventItem>
          ))}
        </EventsList>
      )}
    </UpcomingEventsContainer>
  );
}

export default UpcomingEvents;
