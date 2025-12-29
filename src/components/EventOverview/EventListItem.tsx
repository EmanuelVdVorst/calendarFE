import styled from 'styled-components';
import type { ReactElement } from 'react';

import { margins, colors, borderRadius, fonts } from '../basics/Styles';
import { StyledH4 } from '../basics/Styles/Titles.style'
import { formatDayHeader, formatEventTime } from '../../utils';


const EventItem = styled.div<{ color: string }>((props) => ({
  padding: margins.small,
  backgroundColor: colors.white,
  borderRadius: borderRadius.medium,
  borderLeft: '3px solid',
  borderLeftColor: props.color,
  cursor: 'pointer',
  transition: 'transform 0.1s ease, box-shadow 0.1s ease',

  '&:hover': {
    transform: 'translateX(2px)',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
}));

const EventDate = styled.div({
  fontSize: fonts.size.small,
  fontWeight: fonts.weight.medium,
  color: colors.secondary,
  marginBottom: margins.xxsmall,
  textTransform: 'uppercase',
});


const EventTime = styled.div({
  fontSize: fonts.size.small,
  color: colors.gray,
});

interface eventProps {
    id: string;
    title: string;
    start: Date;
    end: Date;
    color: string;
}


function EventListItem(props: eventProps): ReactElement {
  return (
            <EventItem key={props.id} color={props.color}>
              <EventDate>{formatDayHeader(props.start)}</EventDate>
              <StyledH4>{props.title}</StyledH4>
              <EventTime>{formatEventTime(props)}</EventTime>
            </EventItem>
  );
}

export {
    EventListItem
};
