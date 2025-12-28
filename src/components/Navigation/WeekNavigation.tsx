import styled from 'styled-components';
import { useCalendar } from '../../hooks/useCalendar';
import { getMonthName } from '../../utils/date.utils';

const NavigationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  border-bottom: 1px solid #E0E0E0;
  background-color: #FFFFFF;
`;

const WeekTitle = styled.h1`
  font-size: 22px;
  font-weight: 600;
  color: #000000;
  margin: 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const NavButton = styled.button`
  padding: 8px 16px;
  background-color: #FFFFFF;
  border: 1px solid #D1D1D6;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  color: #000000;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #F5F5F7;
  }

  &:active {
    background-color: #E8E8ED;
  }
`;

const TodayButton = styled(NavButton)`
  background-color: #007AFF;
  color: #FFFFFF;
  border-color: #007AFF;

  &:hover {
    background-color: #0051D5;
  }

  &:active {
    background-color: #004FC4;
  }
`;

function WeekNavigation(): JSX.Element {
  const { currentWeek, goToPreviousWeek, goToNextWeek, goToToday } = useCalendar();

  const monthName = getMonthName(currentWeek.startDate);
  const year = currentWeek.year;
  const weekNumber = currentWeek.weekNumber;

  return (
    <NavigationContainer>
      <WeekTitle>
        Week {weekNumber}, {monthName} {year}
      </WeekTitle>
      <ButtonGroup>
        <NavButton onClick={goToPreviousWeek}>← Prev</NavButton>
        <TodayButton onClick={goToToday}>Today</TodayButton>
        <NavButton onClick={goToNextWeek}>Next →</NavButton>
      </ButtonGroup>
    </NavigationContainer>
  );
}

export default WeekNavigation;
