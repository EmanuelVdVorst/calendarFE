import styled from 'styled-components';

import { useCalendar } from '../../hooks/useCalendar';
import { EventListItem } from './EventListItem'
import { StyledH3 } from '../basics/Styles/Titles.style';

const UpcomingEventsContainer = styled.div({
  flex: 1,
  overflowY: 'auto',
});

const EventsList = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});


const EmptyState = styled.div({
  padding: '20px 12px',
  textAlign: 'center',
  color: '#999',
  fontSize: '13px',
});

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
      <StyledH3>Upcoming Events</StyledH3>
      {upcomingEvents.length === 0 ? 
        (
            <EmptyState>No upcoming events</EmptyState>
        ) 
        : 
        (
            <EventsList>
            {upcomingEvents.map(event => (
                <EventListItem key={event.id} {...event} />
            ))}
            </EventsList>
        )
      }
    </UpcomingEventsContainer>
  );
}

export default UpcomingEvents;