import styled from 'styled-components';

import { useCalendar } from '../../hooks/useCalendar';
import { getMonthName } from '../../utils/date.utils';
import { StyledH1, StyledPrimairyButton, StyledSecondaryButton, HorizontalButtonGroup} from '../basics/Styles';

const NavigationContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '16px 24px',
  borderBottom: '1px solid #E0E0E0',
  backgroundColor: '#FFFFFF',
});


function WeekNavigation(): JSX.Element {
  const { currentWeek, goToPreviousWeek, goToNextWeek, goToToday } = useCalendar();

  const monthName = getMonthName(currentWeek.startDate);
  const year = currentWeek.year;
  const weekNumber = currentWeek.weekNumber;

  return (
    <NavigationContainer>
      <StyledH1>
        Week {weekNumber}, {monthName} {year}
      </StyledH1>
      <HorizontalButtonGroup>
        <StyledSecondaryButton onClick={goToPreviousWeek}>← Prev</StyledSecondaryButton>
        <StyledPrimairyButton onClick={goToToday}>Today</StyledPrimairyButton>
        <StyledSecondaryButton onClick={goToNextWeek}>Next →</StyledSecondaryButton>
      </HorizontalButtonGroup>
    </NavigationContainer>
  );
}

export default WeekNavigation;
